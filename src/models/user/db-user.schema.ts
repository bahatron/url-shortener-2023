import { Type, Static } from "@sinclair/typebox";

export type DbUser = Static<typeof DbUserSchema>;

export const DbUserSchema = Type.Object({
    id: Type.String({ format: "uuid" }),
    email: Type.String({ format: "email" }),
    phone_number: Type.Union([Type.String({}), Type.Null()]),
    display_name: Type.String(),
    password_harsh: Type.String(),
    created_at: Type.String({ format: "date-time" }),
    updated_at: Type.String({ format: "date-time" }),
});
