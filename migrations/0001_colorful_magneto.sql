ALTER TABLE "compilations" DROP CONSTRAINT "compilations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tours" ADD COLUMN "compilation_id" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "compilations" ADD CONSTRAINT "compilations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tours" ADD CONSTRAINT "tours_compilation_id_compilations_id_fk" FOREIGN KEY ("compilation_id") REFERENCES "compilations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
