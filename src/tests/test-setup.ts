import { $logger } from "../services/logger";

beforeAll(async () => {
    $logger.debug(`global before all`);
});

afterAll(async () => {
    $logger.debug(`global after all`);
});
