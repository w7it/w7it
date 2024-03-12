import React, { useCallback, useEffect, useState } from 'react';
import { useRoadmapContext } from './RoadmapContext.js';
import { RoadmapLegendItem } from './RoadmapLegendItem.js';

type Props = {};

export const RoadmapLegend: React.FC<Props> = () => {
    const api = useRoadmapContext();
    const [items, setItems] = useState(api.getLegend());
    useEffect(() => api.subscribeLegend((legend) => setItems(legend)), []);

    const handleNewClicked = useCallback(() => {
        api.addLegendItem({ color: '#626262', label: 'Какая-то деятельность' });
    }, []);

    return (
        <div className="mb-4">
            <div className="text-lg mb-2">Легенда дорожной карты жизни</div>
            {items.map((item, index) => (
                <RoadmapLegendItem {...item} key={index} index={index} />
            ))}

            <button
                className="block w-full text-center px-8 py-4 rounded-lg border border-primary/25 text-primary transition font-bold hover:bg-primary-light hover:text-white"
                onClick={handleNewClicked}
            >
                Добавить новое обозначение
            </button>
        </div>
    );
};
