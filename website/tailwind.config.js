import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            // https://paletton.com/#uid=33D0u0kleqTb-FxgWv4pnnet3it
            primary: {
                DEFAULT: "#375d8d",
                light: "#839fc4",
            },
            alt: {
                DEFAULT: "#D6B848",
            },
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            danger: colors.red[600],
        },
        fontFamily: {
            display: ["Montserrat", ...defaultTheme.fontFamily.sans],
            body: ["Roboto", ...defaultTheme.fontFamily.sans],
        },
        screens: {
            sm: defaultTheme.screens.sm,
            md: defaultTheme.screens.md,
            lg: defaultTheme.screens.lg,
        },
    },
    plugins: [typography],
};
