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
  const coursesInsert = await db
    .insert(coursesTable)
    .values([
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(),
      },
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(),
      },
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(),
      },
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(),
      },
      {
        title: faker.lorem.words(4),
        description: faker.lorem.paragraph(),
      },
    ])
    .returning();
  const enrollmentsInsert = await db
    .insert(enrollmentsTable)
    .values([
      {
        userId: usersInsert[0].id,
        courseId: coursesInsert[0].id,
      },
      {
        userId: usersInsert[1].id,
        courseId: coursesInsert[0].id,
      },
      {
        userId: usersInsert[2].id,
        courseId: coursesInsert[1].id,
      },
      {
        userId: usersInsert[3].id,
        courseId: coursesInsert[1].id,
      },
      {
        userId: usersInsert[4].id,
        courseId: coursesInsert[2].id,
      },
      {
        userId: usersInsert[5].id,
        courseId: coursesInsert[2].id,
      },
      {
        userId: usersInsert[6].id,
        courseId: coursesInsert[3].id,
      },
      {
        userId: usersInsert[7].id,
        courseId: coursesInsert[3].id,
      },
      {
        userId: usersInsert[8].id,
        courseId: coursesInsert[4].id,
      },
      {
        userId: usersInsert[9].id,
        courseId: coursesInsert[4].id,
      },
    ])
    .returning();
}

seed();
