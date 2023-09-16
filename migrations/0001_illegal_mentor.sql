CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100),
	`last_name` varchar(100),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP DATABASE `crm`;
