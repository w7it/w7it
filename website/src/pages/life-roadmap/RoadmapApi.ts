import { assert } from '~/utils/assert.js';
import { RoadmapPersistor } from './RoadmapPersistor.js';
import { LegendItem, RoadmapRepository } from './RoadmapRepository.js';

const WEEKS = 52;

export class RoadmapApi {
    private repository = new RoadmapRepository();
    private persistor = new RoadmapPersistor(this.repository);

    private fillValue: number | null = null;

    constructor() {
        this.persistor.load();
        Object.assign(globalThis, { API: this });
    }

    public getDOB(): Date | null {
        const { dob } = this.repository.getState();
        if (!dob) return null;

        const date = new Date(`${dob.slice(0, 4)}-${dob.slice(4, 6)}-${dob.slice(6, 8)}`);
        return date;
    }

    public subscribeDOB(callback: (value: Date | null) => void): () => void {
        return this.subscribeChange(callback, () => this.getDOB());
    }

    public updateDOB(value: Date | null): void {
        if (!value) {
            this.repository.setState(({ dob, ...state }) => state);
            return;
        }

        const yyyymmdd = value.toISOString().split('T')[0]?.replaceAll('-', '');
        this.repository.setState((state) => ({ ...state, dob: yyyymmdd }));
    }

    public getLegend(): readonly LegendItem[] {
        const { legend } = this.repository.getState();
        if (legend) return legend;

        return [
            { color: '#e1bc05', label: 'Учеба' },
            { color: '#006d8f', label: 'Работа' },
            { color: '#669c35', label: 'Отпуск' },
        ];
    }

    public subscribeLegend(callback: (value: readonly LegendItem[]) => void): () => void {
        return this.subscribeChange(callback, () => this.getLegend());
    }

    public updateLegendItem(index: number, updater: (item: LegendItem) => LegendItem): void {
        const legend = this.getLegend();
        const item = legend[index];
        assert(item, 'Wrong index!');

        const updatedItem = updater(item);
        const newLegend = legend.slice();
        newLegend[index] = updatedItem;

        this.repository.setState((state) => ({ ...state, legend: newLegend }));
    }

    public addLegendItem(item: LegendItem): void {
        const legend = this.getLegend();
        if (legend.length >= 36) return; // because of radix in `parseInt`
        this.repository.setState((state) => ({ ...state, legend: [...legend, item] }));
    }

    public removeLegendItem(index: number): void {
        const newLegend = this.getLegend().slice();
        newLegend.splice(index, 1);
        this.repository.setState((state) => {
            const newWeeks = (state.weeks || []).slice();
            newWeeks.forEach((value, weekIdx) => {
                if (value <= index) return;
                if (value === index + 1) {
                    delete newWeeks[weekIdx];
                } else {
                    newWeeks[weekIdx] -= 1;
                }
            });

            return { ...state, legend: newLegend, weeks: newWeeks };
        });
    }

    public getCellColor(id: number): string | null {
        const { weeks } = this.repository.getState();
        const week = weeks?.[id];
        if (!week) return null;

        const legendItem = this.getLegend()[week - 1];
        if (!legendItem) return null; // error?

        return legendItem.color;
    }

    public toggleYear(yearIdx: number): void {
        const legend = this.getLegend();
        const { weeks } = this.repository.getState();
        const slice = weeks?.slice(yearIdx * WEEKS, (yearIdx + 1) * WEEKS);

        const countByValues = slice?.reduce((acc, value) => {
            const old = acc.get(value) ?? 0;
            acc.set(value, old + 1);
            return acc;
        }, new Map<number, number>());
        const bestTuple = countByValues
            ? Array.from(countByValues.entries()).reduce((acc, [value, count]) => {
                  if (acc === null || count > acc[1]) {
                      return [value, count] as const;
                  }
                  return acc;
              }, null as readonly [number, number] | null)
            : null;

        let newValue = bestTuple?.[0] ?? 0;
        if (countByValues?.size === 1) {
            newValue += 1;
        }

        if (newValue > legend.length) {
            newValue = 0;
        }

        this.repository.setState((state) => {
            const newWeeks = (state.weeks || []).slice();

            for (let i = 0; i < WEEKS; i += 1) {
                newWeeks[yearIdx * WEEKS + i] = newValue;
            }

            return { ...state, weeks: newWeeks };
        });
    }

    public toggleCell(id: number): void {
        const legend = this.getLegend();
        this.repository.setState((state) => {
            const newWeeks = (state.weeks || []).slice();
            const oldValue = newWeeks[id] || 0;
            let newValue = oldValue + 1;
            if (newValue > legend.length) {
                newValue = 0;
            }

            newWeeks[id] = newValue;

            return { ...state, weeks: newWeeks };
        });
    }

    public enableFillMode(id: number): void {
        const { weeks } = this.repository.getState();
        this.fillValue = weeks?.[id] || 0;
    }

    public disableFillMode(): void {
        this.fillValue = null;
    }

    public getFillMode(): boolean {
        return this.fillValue != null;
    }

    public subscribeFillMode(callback: (value: boolean) => void): () => void {
        return this.subscribeChange(callback, () => this.getFillMode());
    }

    public fillCell(id: number) {
        const value = this.fillValue;
        if (value === null) return;

        this.repository.setState((state) => {
            const newWeeks = (state.weeks || []).slice();
            newWeeks[id] = value;

            return { ...state, weeks: newWeeks };
        });
    }

    public subscribeCellColor(id: number, callback: (color: string | null) => void): () => void {
        return this.subscribeChange(callback, () => this.getCellColor(id));
    }

    private subscribeChange<T>(callback: (value: T) => void, loader: () => T): () => void {
        let prevState = loader();
        callback(prevState);
        return this.repository.onChange(() => {
            const nextState = loader();
            if (prevState === nextState) return;
            callback(nextState);
            prevState = nextState;
        });
    }
}
