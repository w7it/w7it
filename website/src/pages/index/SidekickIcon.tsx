import React from 'react';

type Props = {
    readonly className?: string;
    readonly color?: string;
    readonly size?: number;
    readonly children?: React.ReactNode;
};

export const SidekickIcon = React.memo(function SidekickIcon(props: Props) {
    const { color = 'currentColor', size = 24, children, ...rest } = props;
    return (
        <svg {...rest} width={size} height={size} fill={color} viewBox="0 0 44 44">
            <path d="M22.0055 11.5024L28.9998 15.0049V8L22.0055 11.5024Z" fill="#FFB038" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.9998 15.0046L22.0055 18.4973V11.5022L28.9998 15.0046Z"
                fill="#F86141"
            />
            <path d="M15 22.0002L22.0057 25.5027V18.4978L15 22.0002Z" fill="#F58E78" />
            <path d="M15 15.0046L22.0057 18.4973V11.5022L15 15.0046Z" fill="#4F2F8D" />
            <path d="M22.0057 18.497L15 21.9995V15.0044L22.0057 18.497Z" fill="#DF1722" />
            <path d="M22.0055 25.5024L28.9998 29.0049V22L22.0055 25.5024Z" fill="#BB1714" />
            <path d="M28.9998 29.0046L22.0055 32.5071V25.5022L28.9998 29.0046Z" fill="#ED3330" />
            <path d="M28.9998 22.0002L22.0055 25.5027V18.4978L28.9998 22.0002Z" fill="#ED3330" />
            <path d="M15 29.0046L22.0057 32.5071V25.5022L15 29.0046Z" fill="#9B85C5" />
            <path d="M22.0057 32.5079L15 36.0006V29.0055L22.0057 32.5079Z" fill="#4F2F8D" />
        </svg>
    );
});
