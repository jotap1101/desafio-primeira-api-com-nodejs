import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db/index.ts";
import { coursesTable } from "../db/schema.ts";
import { checkRequestJWT } from "./hooks/check-request-jwt.ts";
import { checkUserRole } from "./hooks/check-user-role.ts";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      preHandler: [checkRequestJWT, checkUserRole("manager")],
      schema: {
        tags: ["Courses"],
        summary: "Create a new course",
        description: "This route creates a new course.",
        body: z.object({
          title: z
            .string()
            .min(5, { message: "Title must be at least 5 characters long" })
            .max(100, { message: "Title must be at most 100 characters long" }),
          description: z
            .string()
            .max(500, {
              message: "Description must be at most 500 characters long",
            })
            .nullable(),
        }),
        response: {
          201: z
            .object({
              id: z.uuid(),
              title: z.string().min(5).max(100),
              description: z.string().max(500).nullable(),
            })
            .describe("Created course"),
        },
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title;
      const courseDescription = request.body.description;
      const result = await db
        .insert(coursesTable)
        .values({ title: courseTitle, description: courseDescription })
        .returning();

      return reply.status(201).send({
        id: result[0].id,
        title: result[0].title,
        description: result[0].description,
      });
    }
  );
};
