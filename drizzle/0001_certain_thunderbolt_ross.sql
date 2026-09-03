CREATE TABLE `advisories` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`farmId` varchar(40) NOT NULL,
	`crop` varchar(80) NOT NULL,
	`goal` varchar(24) NOT NULL,
	`result` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `advisories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`farmId` varchar(40),
	`title` varchar(160) NOT NULL,
	`message` text NOT NULL,
	`priority` enum('low','medium','high') NOT NULL,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `crop_assessments` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`farmId` varchar(40),
	`crop` varchar(80) NOT NULL,
	`imageUrl` text,
	`result` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crop_assessments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `farmer_profiles` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(120) NOT NULL,
	`phone` varchar(32),
	`language` varchar(12) NOT NULL,
	`country` varchar(2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `farmer_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `farms` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(120) NOT NULL,
	`latitude` double NOT NULL,
	`longitude` double NOT NULL,
	`areaHectares` double NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `farms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fields` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`farmId` varchar(40) NOT NULL,
	`name` varchar(120) NOT NULL,
	`crop` varchar(80) NOT NULL,
	`areaHectares` double,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `fields_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nudges` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`farmId` varchar(40),
	`title` varchar(160) NOT NULL,
	`message` text NOT NULL,
	`priority` enum('low','medium','high') NOT NULL,
	`status` enum('pending','completed','dismissed') NOT NULL DEFAULT 'pending',
	`dueAt` timestamp,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `nudges_id` PRIMARY KEY(`id`)
);
