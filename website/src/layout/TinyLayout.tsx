import type React from "react";
import { Footer } from "./Footer.js";

type Props = {
    readonly children: React.ReactNode;
};

export const TinyLayout: React.FC<Props> = (props) => {
    return (
        <>
            {props.children}
            <Footer />
        </>
    );
};
