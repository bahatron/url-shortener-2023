import { Validator } from "@bahatron/utils";
import { ValidationFailed } from "@bahatron/utils/lib/error";
import { Static, TSchema } from "@sinclair/typebox";

export const $validator = {
    json: <T extends TSchema>(payload: any, schema: T): Static<T> => {
        let errors = Validator.json(payload, schema as any);

        if (errors.length) throw ValidationFailed({ errors });

        return payload;
    },
};
