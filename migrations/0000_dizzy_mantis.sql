CREATE TABLE `client_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`phone_number` varchar(30),
	`is_active` boolean DEFAULT true,
	`source` varchar(60),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `client_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100),
	`last_name` varchar(100),
	`email` varchar(100),
	`password` varchar(255),
	`phone_number` varchar(30),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
