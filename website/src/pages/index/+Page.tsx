import type React from "react";
import { Header } from "#layout/Header.js";
import { Hero } from "./Hero.js";

export const Page: React.FC = () => {
    return (
        <>
            <Header fixed={false} />
            <Hero />
        </>
    );
};
