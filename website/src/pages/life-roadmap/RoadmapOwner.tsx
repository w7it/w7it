import React, { type ChangeEvent, useCallback, useState } from 'react';
import { useRoadmapContext } from './RoadmapContext.js';

export const RoadmapOwner: React.FC = () => {
    const api = useRoadmapContext();
    const [dob, setDOB] = useState(api.getDOB());
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.valueAsDate;
        api.updateDOB(value);
        setDOB(value);
    }, []);

    return (
        <div className="flex mt-8 mb-4 items-center gap-4">
            <label htmlFor="dob" className="text-lg">
                Дата рождения
            </label>
            <input
                type="date"
                className="flex grow border border-black/25 rounded px-3 py-2"
                id="dob"
                value={dob ? dob.toISOString().split('T')[0] : ''}
                onChange={handleChange}
            />
        </div>
    );
};
