import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { RoadmapCell } from "./RoadmapCell.js";
import { RoadmapLegend } from "./RoadmapLegend.js";
import { RoadmapOwner } from "./RoadmapOwner.js";
import { RoadmapContextProvider } from "./RoadmapContext.js";
import { RoadmapApi } from "./RoadmapApi.js";

const YEARS = 90;
const WEEKS = 52;
const DEFAULT_CURRENT_WEEK = 30.5 * WEEKS;

export const Roadmap: React.FC = () => {
    const api = useMemo(() => new RoadmapApi(), []);
    const [currentWeek, setCurrentWeek] = useState(DEFAULT_CURRENT_WEEK);

    useEffect(() =>
        api.subscribeDOB((dob) => {
            if (!dob) {
                setCurrentWeek(DEFAULT_CURRENT_WEEK);
                return;
            }

            const years = new Date().getFullYear() - dob.getFullYear();
            const lastDOB = new Date(dob);
            lastDOB.setFullYear(new Date().getFullYear());

            if (lastDOB > new Date()) {
                lastDOB.setFullYear(lastDOB.getFullYear() - 1);
            }

            setCurrentWeek(
                years * WEEKS +
                    Math.ceil(
                        (Date.now() - lastDOB.getTime()) /
                            (7 * 24 * 60 * 60 * 1000),
                    ),
            );
        }),
    );

    useEffect(() => {
        const handleMove = (event: TouchEvent) => {
            if (!api.getFillMode()) return;
            event.preventDefault();
        };

        window.addEventListener("touchmove", handleMove, { passive: false });

        return () => {
            window.removeEventListener("touchmove", handleMove, false);
        };
    }, [api]);

    return (
        <RoadmapContextProvider value={api}>
            <div className="container mx-auto overflow-x-hidden mt-4 p-8">
                <h1 className="font-display text-4xl">Дорожная карта жизни</h1>
                <p className="text-xl mt-2">
                    Это веб-версия карты жизни. Тут представлены {YEARS} лет,
                    разбитые на {WEEKS} ячейки. 1 ячейка - 1 неделя. Все данные
                    хранятся локально и в самой ссылке.
                </p>

                <RoadmapOwner />
                <RoadmapLegend />

                {new Array(YEARS).fill(null).map((_, yearIdx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={yearIdx} className="flex items-center mb-2">
                        <button
                            className="flex-none w-8 h-8 text-gray-500"
                            type="button"
                            onClick={() => api.toggleYear(yearIdx)}
                        >
                            {yearIdx + 1}
                        </button>
                        <div className="flex flex-wrap">
                            {new Array(WEEKS).fill(null).map((_, weekIdx) => {
                                const weekId = yearIdx * WEEKS + weekIdx;

                                return (
                                    <RoadmapCell
                                        key={weekId}
                                        id={weekId}
                                        isMuted={weekId < currentWeek}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </RoadmapContextProvider>
    );
};
