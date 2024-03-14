import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useRoadmapContext } from "./RoadmapContext.js";
import { RoadmapLegendItem } from "./RoadmapLegendItem.js";

export const RoadmapLegend: React.FC = () => {
    const api = useRoadmapContext();
    const [items, setItems] = useState(api.getLegend());

    useEffect(() => api.subscribeLegend((legend) => setItems(legend)), [api]);

    const handleNewClicked = useCallback(() => {
        api.addLegendItem({ color: "#626262", label: "Какая-то деятельность" });
    }, [api]);

    return (
        <div className="mb-4">
            <div className="text-lg mb-2">Легенда дорожной карты жизни</div>
            {items.map((item, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: здесь нет идентификаторов в item
                <RoadmapLegendItem {...item} key={index} index={index} />
            ))}

            <button
                className="block w-full text-center px-8 py-4 rounded-lg border border-primary/25 text-primary transition font-bold hover:bg-primary-light hover:text-white"
                type="button"
                onClick={handleNewClicked}
            >
                Добавить новое обозначение
            </button>
        </div>
    );
};
