module.exports = {
    apps: [
        {
            name: "app",
            script: "./main.ts",
            interpreter: "deno",
            interpreterArgs: "run --allow-net --allow-read",
        },
    ],
};
