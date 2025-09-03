import { uniqueIndex } from "drizzle-orm/pg-core";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const coursesTable = pgTable("courses", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull().unique(),
  description: text(),
});

export const enrollmentsTable = pgTable(
  "enrollments",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    courseId: uuid()
      .notNull()
      .references(() => coursesTable.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex().on(table.userId, table.courseId)]
);
