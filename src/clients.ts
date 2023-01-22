import env from "@env";

import {AuthServiceClient} from "@proto";

export const authClient = new AuthServiceClient(
    env.config.grpcProxy
);