import { Unauthorized } from "@bahatron/utils/lib/error";
import jsonwebtoken, { SignOptions } from "jsonwebtoken";
import { $env } from "./env";

/**
 * @todo: change secret to SSH key
 */
export const $jwt = {
    sign: (payload: any, options?: SignOptions, secret = $env.JWT_SECRET) => {
        return jsonwebtoken.sign(payload, secret, options);
    },

    verify: (token: string) => {
        try {
            return jsonwebtoken.verify(token, $env.JWT_SECRET);
        } catch (err) {
            throw Unauthorized("INVALID_TOKEN");
        }
    },
};
