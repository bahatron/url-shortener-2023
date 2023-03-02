import { $logger } from "../services/logger";

beforeAll(async () => {
    $logger.info(`global before all`);
});

afterAll(async () => {
    $logger.info(`global after all`);
});
