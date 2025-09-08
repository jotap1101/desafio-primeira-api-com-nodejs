import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db/index.ts";
import { coursesTable } from "../db/schema.ts";
import { getAuthenticatedUserFromRequest } from "../get-authenticated-user-from-request.ts";
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      preHandler: [checkRequestJWT],
      schema: {
        tags: ["Courses"],
        summary: "Get a course by ID",
        description: "This route retrieves a course by its ID.",
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          200: z
            .object({
              course: z.object({
                id: z.uuid(),
                title: z.string().min(5).max(100),
                description: z.string().nullable(),
              }),
            })
            .describe("Course details"),
          404: z
            .object({
              message: z.string().describe("Not found message"),
            })
            .describe("Course not found"),
        },
      },
    },
    async (request, reply) => {
      const user = getAuthenticatedUserFromRequest(request);
      const courseId = request.params.id;
      const result = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.id, courseId));

      if (result.length === 0) {
        return reply.status(404).send({ message: "Course not found" });
      }

      return reply.status(200).send({ course: result[0] });
    }
  );
};
