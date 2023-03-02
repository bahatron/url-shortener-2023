const LOG_OPTIONS = {
    out_file: "/dev/null",
    error_file: "/dev/null",
};

module.exports = {
    apps: [
        {
            name: "ts-api",
            script: "src/bin/api-server.ts",
            watch: ["src"],
            exec_mode: "cluster",
            instances: "3",
            ignore_watch: ["**/*.schema.ts"],
            ...LOG_OPTIONS,
        },
        {
            name: "api",
            script: "dist/bin/api-server.js",
            watch: process.env.NODE_ENV !== "production" && ["dist"],
            exec_mode: "cluster",
            instances: "3",
            ...LOG_OPTIONS,
        },
    ],
};
