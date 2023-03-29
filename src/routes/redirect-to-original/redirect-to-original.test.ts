import faker from "@faker-js/faker";
import { shortenUrl } from "../../handlers/shorten-url";
import { $axios } from "../../services/axios";
import { $env } from "../../services/env";
import { $logger } from "../../services/logger";
import { RedirectToOriginalRoute } from "./redirect-to-original.route";

describe(`${RedirectToOriginalRoute.method.toUpperCase()} - ${
    RedirectToOriginalRoute.route
}`, () => {
    async function callRedirectEndpoint(shortened: string) {
        return $axios({
            method: RedirectToOriginalRoute.method,
            url: `${$env.TEST_URL}/${shortened}`,
        });
    }

    describe("nonexistent string map", () => {
        it("responds with http 404", async () => {
            expect(() =>
                callRedirectEndpoint("not_a_valid_string"),
            ).rejects.toThrow("404");
        });
    });

    describe("valid request", () => {
        it("redirects to the original url", async () => {
            let shortened = await shortenUrl(`${$env.TEST_URL}/ping`);

            let response = await callRedirectEndpoint(shortened);

            expect(response.data).toBe("pong");
        });
    });
});
