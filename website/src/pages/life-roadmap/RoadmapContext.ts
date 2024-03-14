import { createContext, useContext } from "react";
import { assert } from "#utils/assert.js";
import type { RoadmapApi } from "./RoadmapApi.js";

const RoadmapContext = createContext<RoadmapApi | null>(null);

export const RoadmapContextProvider = RoadmapContext.Provider;

export const useRoadmapContext = (): RoadmapApi => {
    const context = useContext(RoadmapContext);
    assert(context, "Forgot provide RoadmapContext?");

    return context;
};
