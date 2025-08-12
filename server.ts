import fastify from "fastify";
import crypto from "node:crypto";

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const environment = (process.env.NODE_ENV ?? "development") as keyof typeof envToLogger;

const server = fastify({
  logger: envToLogger[environment] ?? true
});

const courses = [
  {
    id: "1",
    title: "Curso de Node.js",
  },
  {
    id: "2",
    title: "Curso de React",
  },
  {
    id: "3",
    title: "Curso de React Native",
  },
];

server.get("/courses", (request, reply) => {
  return reply.status(200).send({ courses });
});

server.get("/courses/:id", (request, reply) => {
  type Params = {
    id: string;
  };

  const { id } = request.params as Params;
  const course = courses.find((course) => course.id === id);

  if (!course) {
    return reply.status(404).send({ message: "Course not found" });
  }

  return { course };
});

server.post("/courses", (request, reply) => {
  type Body = {
    title: string;
  };

  const { title } = request.body as Body;

  if (!title) {
    return reply.status(400).send({ message: "Title is required" });
  }

  const course = {
    id: crypto.randomUUID(),
    title,
  };

  courses.push(course);

  return reply.status(201).send({ course });
});

server.listen({ port: 3333 }).then(() => {
  console.log("Server is listening on port 3333");
});
