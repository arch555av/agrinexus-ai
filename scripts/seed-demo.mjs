import mysql from "mysql2/promise";
import { nanoid } from "nanoid";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is required");
const connection = await mysql.createConnection(url);
const userId = Number(process.env.SEED_USER_ID || 1);
const farmId = `farm_${nanoid(12)}`;
const fieldId = `field_${nanoid(12)}`;
const now = new Date();
await connection.execute("INSERT INTO farms (id,userId,name,latitude,longitude,areaHectares,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?)", [farmId, userId, "Nashik Demonstration Farm", 20.011, 73.79, 4.2, now, now]);
await connection.execute("INSERT INTO fields (id,userId,farmId,name,crop,areaHectares,createdAt) VALUES (?,?,?,?,?,?,?)", [fieldId, userId, farmId, "North Wheat Field", "Wheat", 2.1, now]);
await connection.execute("INSERT INTO alerts (id,userId,farmId,title,message,priority,createdAt) VALUES (?,?,?,?,?,?,?)", [`alert_${nanoid(12)}`, userId, farmId, "Field inspection suggested", "Review the north field within 24 hours and confirm observations locally.", "medium", now]);
await connection.execute("INSERT INTO nudges (id,userId,farmId,title,message,priority,status,dueAt,createdAt) VALUES (?,?,?,?,?,?,?,?,?)", [`nudge_${nanoid(12)}`, userId, farmId, "Review irrigation conditions", "Check irrigation coverage before taking treatment action.", "medium", "pending", new Date(Date.now() + 86400000), now]);
await connection.end();
console.log(`Seeded demo farm ${farmId} for user ${userId}`);
