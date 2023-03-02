import { Static, Type } from "@sinclair/typebox";

export type SessionToken = Static<typeof SessionTokenSchema>;
export const SessionTokenSchema = Type.Object(
    {
        user_id: Type.String({ format: "uuid" }),
    },
    {
        additionalProperties: true,
    },
);
