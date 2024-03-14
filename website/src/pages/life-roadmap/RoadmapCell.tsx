import React, { type PointerEvent, useCallback, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRoadmapContext } from './RoadmapContext.js';
import * as styles from './RoadmapCell.module.scss';

type Props = {
    readonly id: number;
    readonly isMuted: boolean;
};

export const RoadmapCell: React.FC<Props> = (props) => {
    const { id, isMuted } = props;
    const api = useRoadmapContext();
    const [color, setColor] = useState<string | null>(null);

    useEffect(() => {
        setColor(api.getCellColor(id));
        return api.subscribeCellColor(id, (color) => setColor(color));
    }, []);

    const handleClick = useCallback(() => api.toggleCell(id), [id]);

    const handlePointerDown = useCallback(
        (event: PointerEvent<HTMLButtonElement>) => {
            event.currentTarget.releasePointerCapture(event.pointerId);
            api.enableFillMode(id);

            const unsubscribe = () => {
                window.removeEventListener('pointerup', handleUp, false);
            };

            const handleUp = () => {
                api.disableFillMode();
                unsubscribe();
            };

            window.addEventListener('pointerup', handleUp, false);

            return unsubscribe;
        },
        [id],
    );

    const handlePointerEnter = useCallback(() => {
        api.fillCell(id);
    }, [id]);

    return (
        <button
            className={clsx(
                styles.cell,
                'w-5 h-5 p-0.5 text-white border-none relative',
                'before:absolute before:inset-px before:border before:border-black/25',
                {
                    'opacity-60': isMuted,
                },
            )}
            style={{ color: color ?? undefined }}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            onPointerEnter={handlePointerEnter}
        ></button>
    );
};
