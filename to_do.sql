CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(150)  NOT NULL,
	"description" VARCHAR(300)  NOT NULL,
	"completed" BOOLEAN
);


INSERT INTO "todo"("task", "description", "completed") VALUES('take out the garbage', 'its stinky', 'true');
INSERT INTO "todo"("task", "description", "completed") VALUES('finish my homework', 'break this up into smaller tasks', 'false');