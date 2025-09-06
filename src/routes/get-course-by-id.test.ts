import { randomUUID } from "node:crypto";
import request from "supertest";
import { expect, test } from "vitest";
import { server } from "../app.ts";
import { makeCourse } from "../tests/factories/make-course.ts";

test("get course by id", async () => {
  await server.ready();

  const course = await makeCourse();
  const response = await request(server.server).get(`/courses/${course.id}`);

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    course: {
      id: expect.any(String),
      title: expect.any(String),
      description: expect.anything(), // string or null
    },
  });
});

test("get course by id - not found", async () => {
  await server.ready();

  const response = await request(server.server).get(`/courses/${randomUUID()}`);

  expect(response.status).toBe(404);
  expect(response.body).toEqual({
    message: "Course not found",
  });
});
