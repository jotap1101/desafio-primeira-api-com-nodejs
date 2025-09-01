import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db/index.ts";
import { coursesTable } from "../db/schema.ts";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses",
    {
      schema: {
        tags: ["Courses"],
        summary: "Get all courses",
        description: "This route retrieves all courses.",
        response: {
          200: z
            .object({
              courses: z.array(
                z.object({
                  id: z.uuid(),
                  title: z.string().min(5).max(100),
                  description: z.string().nullable(),
                })
              ),
            })
            .describe("List of courses"),
        },
      },
    },
    async (request, reply) => {
      const result = await db.select().from(coursesTable);

      return reply.status(200).send({ courses: result });
    }
  );
};
