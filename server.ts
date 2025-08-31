import fastify from "fastify";
import { db } from "./src/db/index.ts";
import { coursesTable } from "./src/db/schema.ts";
import { eq } from "drizzle-orm";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

server.get("/courses", async (request, reply) => {
  const result = await db.select().from(coursesTable);

  return reply.status(200).send({ courses: result });
});

server.get("/courses/:id", async (request, reply) => {
  type Params = {
    id: string;
  };

  const params = request.params as Params;
  const courseId = params.id;
  const result = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.id, courseId));

  if (result.length === 0) {
    return reply.status(404).send({ message: "Course not found" });
  }

  return reply.status(200).send({ course: result[0] });
});

server.post("/courses", async (request, reply) => {
  type Body = {
    title: string;
    description: string | null;
  };

  const body = request.body as Body;
  const courseTitle = body.title;

  if (!courseTitle) {
    return reply.status(400).send({ message: "Title is required" });
  }

  const result = await db
    .insert(coursesTable)
    .values({ title: courseTitle, description: body.description })
    .returning();

  return reply.status(201).send({
    id: result[0].id,
    title: result[0].title,
    description: result[0].description,
  });
});

server.listen({ port: 3333 }).then(() => {
  console.log("Server is listening on port 3333");
})
