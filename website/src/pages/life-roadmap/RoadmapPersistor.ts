import * as lz from "lzutf8";
import { debounce } from "#utils/debounce.js";
import type { RoadmapRepository } from "./RoadmapRepository.js";

type DataTransferObject = {
    d?: string;
    w?: string;
    l?: readonly string[];
};

export class RoadmapPersistor {
    constructor(private repository: RoadmapRepository) {
        this.repository.onChange(debounce(() => this.save(), 200));
    }

    public load(): void {
        if (typeof window === "undefined") return;

        let str = window.location.hash.slice(1);

        if (!str) {
            str = localStorage.getItem("life-roadmap") ?? "";
        }

        if (!str) return;

        const dto: DataTransferObject = JSON.parse(
            lz.decompress(str, { inputEncoding: "Base64" }),
        );

        const dob = dto.d;
        const legend = dto.l?.map((str) => ({
            color: str.slice(0, 7),
            label: str.slice(7),
        }));
        const weeks = (dto.w ?? "")
            .split("")
            .map((char) => Number.parseInt(char, 36));

        this.repository.setState(() => ({
            dob: typeof dob === "string" && dob ? dob : undefined,
            legend: legend?.length ? legend : undefined,
            weeks: weeks.length ? weeks : undefined,
        }));
    }

    public save(): void {
        if (typeof window === "undefined") return;

        const state = this.repository.getState();
        const dto: DataTransferObject = {};

        if (state.dob) dto.d = state.dob;

        if (state.weeks) {
            const weeks = Array.from(state.weeks)
                .map((value) => (value || 0).toString(36))
                .join("")
                .replace(/0+$/, "");
            dto.w = weeks;
        }

        if (state.legend) {
            dto.l = state.legend.map(
                (legend) => `${legend.color}${legend.label}`,
            );
        }

        const result = lz.compress(JSON.stringify(dto), {
            outputEncoding: "Base64",
        });

        window.location.hash = result;
        localStorage.setItem("life-roadmap", result);
    }
}
