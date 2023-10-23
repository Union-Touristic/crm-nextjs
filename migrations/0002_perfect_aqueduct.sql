ALTER TABLE "compilations" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "compilations" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "compilations" DROP COLUMN IF EXISTS "updated_at";