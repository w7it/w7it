import React from 'react';
import { Footer } from './Footer.js';

type Props = {
    readonly children: React.ReactNode;
};

export const LightLayout: React.FC<Props> = (props) => {
    return (
        <>
            {props.children}
            <Footer />
        </>
    );
};
