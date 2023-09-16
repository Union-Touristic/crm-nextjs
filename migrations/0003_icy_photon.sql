CREATE TABLE `client_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`phone_number` varchar(30),
	CONSTRAINT `client_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `password` varchar(255);--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `phone_number` varchar(30);