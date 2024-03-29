import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJWT } from "@/http/middleware/verify-jwt";
import { profile } from "./profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  /** Authenticated */
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
