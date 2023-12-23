import { verifyJWT } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { metrics } from "./metrics";
import { history } from "./history";

export async function checkInRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/gyms/:gymId/check-ins", create);
  app.patch("check-ins/:checkInId/validate", validate);

  app.get("/check-ins/metrics", metrics);
  app.get("/check-ins/history", history);
}
