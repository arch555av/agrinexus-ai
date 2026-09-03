import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, double } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(), openId: varchar("openId", { length: 64 }).notNull().unique(), name: text("name"), email: varchar("email", { length: 320 }), loginMethod: varchar("loginMethod", { length: 64 }), role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(), lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect; export type InsertUser = typeof users.$inferInsert;

export const farmerProfiles = mysqlTable("farmer_profiles", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), name: varchar("name", { length: 120 }).notNull(), phone: varchar("phone", { length: 32 }), language: varchar("language", { length: 12 }).notNull(), country: varchar("country", { length: 2 }).notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const farms = mysqlTable("farms", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), name: varchar("name", { length: 120 }).notNull(), latitude: double("latitude").notNull(), longitude: double("longitude").notNull(), areaHectares: double("areaHectares").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export const crops = mysqlTable("crops", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), farmId: varchar("farmId", { length: 40 }).notNull(), name: varchar("name", { length: 80 }).notNull(), variety: varchar("variety", { length: 120 }), season: varchar("season", { length: 40 }), plantedAt: timestamp("plantedAt"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const fields = mysqlTable("fields", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), farmId: varchar("farmId", { length: 40 }).notNull(), name: varchar("name", { length: 120 }).notNull(), crop: varchar("crop", { length: 80 }).notNull(), areaHectares: double("areaHectares"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const advisories = mysqlTable("advisories", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), farmId: varchar("farmId", { length: 40 }).notNull(), crop: varchar("crop", { length: 80 }).notNull(), goal: varchar("goal", { length: 24 }).notNull(), result: text("result").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const cropAssessments = mysqlTable("crop_assessments", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), farmId: varchar("farmId", { length: 40 }), crop: varchar("crop", { length: 80 }).notNull(), imageUrl: text("imageUrl"), result: text("result").notNull(), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const alerts = mysqlTable("alerts", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), farmId: varchar("farmId", { length: 40 }), title: varchar("title", { length: 160 }).notNull(), message: text("message").notNull(), priority: mysqlEnum("priority", ["low", "medium", "high"]).notNull(), readAt: timestamp("readAt"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const nudges = mysqlTable("nudges", {
  id: varchar("id", { length: 40 }).primaryKey(), userId: int("userId").notNull(), farmId: varchar("farmId", { length: 40 }), title: varchar("title", { length: 160 }).notNull(), message: text("message").notNull(), priority: mysqlEnum("priority", ["low", "medium", "high"]).notNull(), status: mysqlEnum("status", ["pending", "completed", "dismissed"]).default("pending").notNull(), dueAt: timestamp("dueAt"), completedAt: timestamp("completedAt"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});
