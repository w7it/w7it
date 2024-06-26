import type React from "react";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

type Props = {
    readonly children: React.ReactNode;
};

export const LightLayout: React.FC<Props> = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};
