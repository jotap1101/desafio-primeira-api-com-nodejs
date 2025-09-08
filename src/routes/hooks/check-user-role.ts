import type { FastifyReply, FastifyRequest } from "fastify";
import { getAuthenticatedUserFromRequest } from "../../get-authenticated-user-from-request.ts";

export function checkUserRole(role: "student" | "manager") {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = getAuthenticatedUserFromRequest(request);

    if (user.role !== role) {
      return reply.status(403).send({ message: "Forbidden" });
    }
  };
}
