import { verify } from "argon2";
import { eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../db/index.ts";
import { usersTable } from "../db/schema.ts";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/sessions",
    {
      schema: {
        tags: ["Auth"],
        summary: "User login",
        description: "This route allows a user to log in.",
        body: z.object({
          email: z.email({ message: "Invalid email address" }),
          password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(100, {
              message: "Password must be at most 100 characters long",
            }),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (result.length === 0) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      const user = result[0];
      const isPasswordValid = await verify(user.password, password);

      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      return reply.status(201).send({ message: "User logged in" });
    }
  );
};
