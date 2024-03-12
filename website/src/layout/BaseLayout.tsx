import React from 'react';
import { Header } from './Header.js';
import { Footer } from './Footer.js';

type Props = {
    readonly children: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = (props) => {
    return (
        <>
            <Header />
            <div className="container mx-auto p-8">
                <article className="mt-16 prose lg:prose-xl prose-headings:font-display prose-headings:font-extrabold prose-a:text-primary prose-a:font-normal prose-ul:my-1 prose-ol:my-1 prose-li:my-1">
                    {props.children}
                </article>
            </div>
            <Footer />
        </>
    );
};
