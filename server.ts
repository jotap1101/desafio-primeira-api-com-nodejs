import { fastifySwagger } from "@fastify/swagger";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createCourseRoute } from "./src/routes/create-course.ts";
import { getCourseByIdRoute } from "./src/routes/get-course-by-id.ts";
import { getCoursesRoute } from "./src/routes/get-courses.ts";
import scalarAPIReference from "@scalar/fastify-api-reference";

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
server.register(scalarAPIReference, {
  routePrefix: "/docs",
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(getCoursesRoute);
server.register(getCourseByIdRoute);
server.register(createCourseRoute);

server.listen({ port: 3333 }).then(() => {
  console.log("Server is listening on port 3333");
});
