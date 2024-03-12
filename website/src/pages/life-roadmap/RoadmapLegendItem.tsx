import React, { ChangeEvent, useCallback } from 'react';
import DeleteBin7LineIcon from 'remixicon-react/DeleteBin7LineIcon.js';
import { useRoadmapContext } from './RoadmapContext.js';

type Props = {
    readonly index: number;
    readonly color: string;
    readonly label: string;
};

export const RoadmapLegendItem: React.FC<Props> = (props) => {
    const { index, color, label } = props;
    const api = useRoadmapContext();

    const handleColorChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        api.updateLegendItem(index, (item) => ({ ...item, color: value }));
    }, []);
    const handleLabelChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        api.updateLegendItem(index, (item) => ({ ...item, label: value }));
    }, []);
    const handleRemoveClicked = useCallback(() => {
        api.removeLegendItem(index);
    }, []);

    return (
        <div className="flex items-center mb-2 gap-2">
            <input
                type="color"
                className="border border-black/25 rounded-lg p-1 w-12 h-10"
                value={color}
                name="legend-color"
                title="Выберите цвет"
                onChange={handleColorChange}
            />
            <input
                type="text"
                className="grow border border-black/25 rounded-lg px-3 py-2"
                name="legend"
                value={label}
                onChange={handleLabelChange}
            />
            <button
                className="border border-black/25 rounded-lg text-danger p-2"
                onClick={handleRemoveClicked}
            >
                <DeleteBin7LineIcon />
            </button>
        </div>
    );
};
