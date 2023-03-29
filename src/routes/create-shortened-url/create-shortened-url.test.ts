import faker from "@faker-js/faker";
import { AxiosResponse } from "axios";
import { ShortenUrlResponseSchema } from "../../handlers/shorten-url";
import { $axios } from "../../services/axios";
import { $env } from "../../services/env";
import { $validator } from "../../services/validator";
import { CreateShortenedUrlRoute } from "./create-shortened-url.route";

describe(`${CreateShortenedUrlRoute.method.toUpperCase()} - ${
    CreateShortenedUrlRoute.route
}`, () => {
    async function callCreateShortenedRoute(url: string) {
        return $axios({
            method: CreateShortenedUrlRoute.method,
            url: `${$env.TEST_URL}${CreateShortenedUrlRoute.route}`,
            data: {
                url,
            },
        });
    }

    describe("valid request", () => {
        let response: AxiosResponse;
        let url = faker.internet.url();

        beforeAll(async () => {
            response = await callCreateShortenedRoute(url);
        });

        it("responds with http 200", async () => {
            expect(response.status).toBe(200);
        });

        it("responds with the valid schema", () => {
            expect(() =>
                $validator.json(response.data, ShortenUrlResponseSchema),
            ).not.toThrow();
        });
    });

    describe("invalid url", () => {
        it("responds with http 417", async () => {
            let call = () => callCreateShortenedRoute("not_a_valid_url");

            expect(call).rejects.toThrow("400");
        });
    });
});
