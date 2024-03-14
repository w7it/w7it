import { useEffect } from "react";

export const useScrollPosition = (callback: () => void) => {
    useEffect(() => {
        window.addEventListener("scroll", callback);
        callback();
        return () => window.removeEventListener("scroll", callback);
    }, [callback]);
};
