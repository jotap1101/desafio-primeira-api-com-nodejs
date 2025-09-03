import { fakerPT_BR as faker } from "@faker-js/faker";
import { db } from "./index.ts";
import { coursesTable, enrollmentsTable, usersTable } from "./schema.ts";

async function seed() {
  const usersInsert = await db
    .insert(usersTable)
    .values([
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    ])
    .returning();

  const courses = await db.select().from(coursesTable);

  const enrollmentsInsert = await db
    .insert(enrollmentsTable)
    .values([
      {
        userId: usersInsert[0].id,
        courseId: courses[0].id,
      },
      {
        userId: usersInsert[1].id,
        courseId: courses[0].id,
      },
      {
        userId: usersInsert[2].id,
        courseId: courses[1].id,
      },
      {
        userId: usersInsert[3].id,
        courseId: courses[1].id,
      },
      {
        userId: usersInsert[4].id,
        courseId: courses[2].id,
      },
      {
        userId: usersInsert[5].id,
        courseId: courses[2].id,
      },
      {
        userId: usersInsert[6].id,
        courseId: courses[3].id,
      },
      {
        userId: usersInsert[7].id,
        courseId: courses[3].id,
      },
      {
        userId: usersInsert[8].id,
        courseId: courses[4].id,
      },
      {
        userId: usersInsert[9].id,
        courseId: courses[4].id,
      },
    ])
    .returning();
}

seed();
