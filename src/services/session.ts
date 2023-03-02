import { AsyncContext } from "@bahatron/utils/lib/context";
import { Unauthorized } from "@bahatron/utils/lib/error";
import { DbUser } from "../models/user/db-user.schema";

const REQUEST_USER = "request_session";

export const $session = {
    setSessionUser(user: DbUser) {
        AsyncContext.set(REQUEST_USER, user);
    },

    getSessionUser(): DbUser | undefined {
        return AsyncContext.get(REQUEST_USER);
    },

    getSessionUserOrFail(): DbUser {
        let user = $session.getSessionUser();

        if (!user) throw Unauthorized();

        return user;
    },
};
