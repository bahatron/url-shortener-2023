docker_compose(["./docker-compose.tilt.yml"])

docker_build(
    "local/server",
    ".",
    dockerfile="Dockerfile",
    target="src",
    live_update=[
        fall_back_on("./package.json"),
        sync(".", "/app"),
    ],
    ignore=[
        "knex_migrations/",
        "src/interfaces/*",
        "node_modules/",
        "jest-stare/",
        "migrations/",
        "postgres/",
        "dist/",
    ]
)