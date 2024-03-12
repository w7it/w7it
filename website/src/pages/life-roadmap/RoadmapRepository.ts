export type LegendItem = {
    readonly color: string;
    readonly label: string;
};

type State = {
    dob?: string; // format: YYYYMMDD
    legend?: readonly LegendItem[];
    weeks?: readonly number[];
};

type Callback = () => void;

export class RoadmapRepository {
    private state: State = {};

    private subscribers = new Set<Callback>();

    public onChange(callback: Callback): () => void {
        this.subscribers.add(callback);

        return () => this.subscribers.delete(callback);
    }

    public getState(): State {
        return this.state;
    }

    public setState(updater: (prevState: State) => State): void {
        this.state = updater(this.state);
        this.subscribers.forEach((callback) => callback());
    }
}
