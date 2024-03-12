import React from 'react';
import { Header } from '~/layout/Header.js';
import { Roadmap } from './Roadmap.js';

export const Page: React.FC = () => {
    return (
        <>
            <Header fixed={false} />
            <Roadmap />
        </>
    );
};
