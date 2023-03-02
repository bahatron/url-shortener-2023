import { $axios } from "../../services/axios";
import { $env } from "../../services/env";

describe("GET /ping", () => {
    it("responds with http 200", async () => {
        let res = await $axios.get(`${$env.TEST_URL}/ping`);
        expect(res?.status).toBe(200);
    });
});
