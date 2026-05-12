import * as P from "effect/unstable/httpapi";
import * as Contract from "./Contract";

export class SessionStatsApi extends P.HttpApiGroup.make("session-stats")
  .add(
    P.HttpApiEndpoint.post("report", "/", {
      payload: Contract.ReportPayloadSchema,
      success: Contract.ReportSuccessSchema,
      error: Contract.ReportErrors,
    }),
  )
  .prefix("/session-stats") {}
