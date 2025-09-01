import { and, asc, ilike, SQL } from "drizzle-orm";
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
        querystring: z.object({
          search: z
            .string()
            .optional()
            .describe("Search term for course titles"),
          orderBy: z.enum(["title"]).optional().default("title"),
          page: z.coerce.number().optional().default(1),
        }),
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
              total: z.number().min(0),
            })
            .describe("List of courses"),
        },
      },
    },
    async (request, reply) => {
      const { search, orderBy, page } = request.query;
      const conditions: SQL[] = [];

      if (search) {
        conditions.push(ilike(coursesTable.title, `%${search}%`));
      }

      const [result, total] = await Promise.all([
        db
          .select()
          .from(coursesTable)
          .orderBy(asc(coursesTable[orderBy]))
          .limit(5)
          .offset((page - 1) * 5)
          .where(and(...conditions)),
        db.$count(coursesTable, and(...conditions)),
      ]);

      return reply.status(200).send({ courses: result, total });
    }
  );
};
