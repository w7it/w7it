import React from "react";

type Props = {
    readonly className?: string;
    readonly size?: number;
};

export const HuntAssessmentIcon = React.memo(function HuntAssessmentIcon(
    props: Props,
) {
    const { size = 24, className } = props;
    return (
        <svg
            className={className}
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            fill="none"
        >
            <title>Хантассессмент.ру</title>
            <g clipPath="url(#a)">
                <circle cx="512" cy="512" r="512" fill="#fff" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M986.783 320H880L708.543 692.733 580.269 512.962 720 320H600l-80.115 109.368L440 320H312l146.334 192.736L304 720.001h128l86.944-121.723L600 720.001h216L848.728 640h159.142C951.032 860.829 750.571 1024 512 1024 229.23 1024 0 794.77 0 512S229.23 0 512 0c214.872 0 398.829 132.363 474.783 320Zm-3.225 232-48.165-123.849L884.727 552h98.831Z"
                    fill="#6D128E"
                />
            </g>
            <defs>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h1024v1024H0z" />
                </clipPath>
            </defs>
        </svg>
    );
});
