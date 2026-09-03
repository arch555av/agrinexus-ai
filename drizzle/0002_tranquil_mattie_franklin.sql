CREATE TABLE `crops` (
	`id` varchar(40) NOT NULL,
	`userId` int NOT NULL,
	`farmId` varchar(40) NOT NULL,
	`name` varchar(80) NOT NULL,
	`variety` varchar(120),
	`season` varchar(40),
	`plantedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `crops_id` PRIMARY KEY(`id`)
);
