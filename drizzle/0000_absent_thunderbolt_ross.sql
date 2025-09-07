-- cria o enum antes de qualquer tabela que o use
CREATE TYPE "user_role" AS ENUM ('student', 'manager');
--> statement-breakpoint

CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	CONSTRAINT "courses_title_unique" UNIQUE("title")
);
--> statement-breakpoint

CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'student' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint

CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"courseId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint

ALTER TABLE "enrollments" 
  ADD CONSTRAINT "enrollments_userId_users_id_fk" 
  FOREIGN KEY ("userId") REFERENCES "public"."users"("id") 
  ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint

ALTER TABLE "enrollments" 
  ADD CONSTRAINT "enrollments_courseId_courses_id_fk" 
  FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") 
  ON DELETE cascade ON UPDATE no action;
--> statement-breakpoint

CREATE UNIQUE INDEX "enrollments_userId_courseId_index" 
  ON "enrollments" USING btree ("userId","courseId");
