CREATE TABLE IF NOT EXISTS "client_orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"phone_number" varchar(30),
	"is_active" boolean DEFAULT true,
	"source" varchar(60),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "compilations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tours" (
	"id" serial PRIMARY KEY NOT NULL,
	"compilation_id" varchar,
	"from_city" varchar(50),
	"country" varchar(50),
	"region" varchar(50),
	"departure_date" varchar(30),
	"nights" integer,
	"hotel" varchar(100),
	"board_basis" varchar(30),
	"room_type" varchar(50),
	"hotel_short_description" text,
	"operator" varchar(30),
	"currency" varchar(10),
	"price" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(50),
	"email" varchar(100),
	"password" varchar(255),
	"image" varchar(255),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
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
