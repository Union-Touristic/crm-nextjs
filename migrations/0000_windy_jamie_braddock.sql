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
	"user_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tours" (
	"id" serial PRIMARY KEY NOT NULL,
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
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"email" varchar(100),
	"password" varchar(255),
	"phone_number" varchar(30),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "compilations" ADD CONSTRAINT "compilations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
