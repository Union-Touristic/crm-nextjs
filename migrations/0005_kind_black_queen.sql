CREATE TABLE IF NOT EXISTS "tours_order" (
	"id" serial PRIMARY KEY NOT NULL,
	"compilation_id" varchar NOT NULL,
	"sort_order" json NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tours_order" ADD CONSTRAINT "tours_order_compilation_id_compilations_id_fk" FOREIGN KEY ("compilation_id") REFERENCES "compilations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
