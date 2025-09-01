import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { eq } from "drizzle-orm";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "./src/db/index.ts";
import { coursesTable } from "./src/db/schema.ts";

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
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Desafio Primeira API com Node.js",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non orci nibh. Fusce quis posuere turpis, nec imperdiet nunc. Aenean non ex sem. Ut aliquam elementum dui, consectetur euismod diam. Etiam lectus lacus, efficitur vel leo sed, venenatis posuere metus. Maecenas ut orci ullamcorper, malesuada urna eget, fermentum arcu. Morbi euismod est vitae mi tincidunt porttitor. Sed sodales vulputate ipsum, sed gravida nisl venenatis sed. Suspendisse convallis ante in leo semper ullamcorper. Donec dignissim nunc quis tortor finibus pellentesque.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3333",
        description: "Development server",
      },
    ],
    tags: [
      {
        name: "Courses",
        description: "Operations related to courses",
      },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
  },
  transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.get("/courses", async (request, reply) => {
  const result = await db.select().from(coursesTable);

  return reply.status(200).send({ courses: result });
});

server.get(
  "/courses/:id",
  {
    schema: {
      params: z.object({
        id: z.uuid(),
      }),
    },
  },
  async (request, reply) => {
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

server.post(
  "/courses",
  {
    schema: {
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

server.listen({ port: 3333 }).then(() => {
  console.log("Server is listening on port 3333");
});
