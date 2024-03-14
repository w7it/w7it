import type React from "react";

type Props = { is404: boolean };

export const Page: React.FC<Props> = (props) => {
    if (props.is404) {
        return (
            <>
                <h1>404 Page Not Found</h1>
                <p>This page could not be found.</p>
            </>
        );
    }

    return (
        <>
            <h1>500 Internal Server Error</h1>
            <p>Something went wrong.</p>
        </>
    );
};
