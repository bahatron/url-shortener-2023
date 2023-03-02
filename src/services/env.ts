import { getenv } from "@bahatron/utils/lib/helpers";

export const $env = {
    // database config
    DATABASE_URL: getenv("DATABASE_URL", ""),

    // auth config
    JWT_SECRET: getenv("JWT_SECRET", ""),
    SUPER_ADMIN_EMAIL: getenv("SUPER_ADMIN_EMAIL", ""),
    SUPER_ADMIN_PASSWORD: getenv("SUPER_ADMIN_PASSWORD", ""),

    // server config
    DEV_MODE: process.env.NODE_ENV !== "production",
    PORT: process.env.PORT || 4000,
    TEST_URL: process.env.TEST_URL || `http://localhost:4000`,
    DEBUG_ENABLED: getenv("DEBUG_ENABLED", "1") === "1",
    API_URL: getenv("API_URL", ""),
    BULL_MONITOR_ENABLED: getenv("BULL_MONITOR_ENABLED", "1"),
    SWAGGER_ENABLED: Boolean(getenv("SWAGGER_ENABLED", "")),
    SWAGGER_TARGET: getenv("SWAGGER_TARGET", "/"),

    // redis
    REDIS_URL: getenv("REDIS_URL", ""),
    REDIS_TLS_ENABLED: process.env.REDIS_TLS_ENABLED === "1",
};
