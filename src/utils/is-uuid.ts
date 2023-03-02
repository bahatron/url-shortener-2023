import { Validator } from "@bahatron/utils";
import { Type } from "@sinclair/typebox";

const schema = Type.String({ format: "uuid" });

export function isUuid(val: string) {
    let errors = Validator.json(val, schema);

    return errors.length === 0;
}
