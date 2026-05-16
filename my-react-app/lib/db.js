import { MongoClient } from "mongodb";

// Serverless functions are reused across invocations (warm starts).
// Cache the client + db on the module scope so each cold start opens
// at most one MongoDB connection per function instance.
let cachedClient = null;
let cachedDb = null;
let setupPromise = null;

async function setup(db) {
  const events = db.collection("events");
  await events.createIndex({ date: 1 }, { expireAfterSeconds: 0 });

  if ((await events.countDocuments()) === 0) {
    const endOfDay = (iso) => new Date(`${iso}T23:59:59`);
    await events.insertMany([
      {
        tag: "Flea Market",
        title: "Spring Flea Market",
        description: "Browse and shop from student vendors selling clothes, accessories, art, and more!",
        date: endOfDay("2026-05-16"),
        time: "11:00 AM – 4:00 PM",
        locationLabel: "Bruin Plaza",
        interestedCount: 234,
        createdAt: new Date(),
      },
      {
        tag: "Farmers Market",
        title: "Westwood Farmers Market",
        description: "Fresh produce, baked goods, and local vendors — grab something after class.",
        date: endOfDay("2026-05-24"),
        time: "9:00 AM – 1:00 PM",
        locationLabel: "Westwood Village",
        interestedCount: 412,
        createdAt: new Date(),
      },
      {
        tag: "Books & Media",
        title: "Textbook Swap",
        description: "Trade or sell used textbooks. Meet up, compare editions, and save money.",
        date: endOfDay("2026-06-06"),
        time: "2:00 PM – 5:00 PM",
        locationLabel: "Powell Library Steps",
        interestedCount: 189,
        createdAt: new Date(),
      },
    ]);
  }
}

export async function getDb() {
  if (cachedDb) return cachedDb;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI env var is not set");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.DB_NAME || "marketplace");

  cachedClient = client;
  cachedDb = db;

  // Run setup once per cold start (createIndex + seed are idempotent).
  setupPromise = setupPromise ?? setup(db).catch((err) => {
    console.error("DB setup failed:", err);
  });
  await setupPromise;

  return cachedDb;
}

export const formatDateLabel = (date) =>
  date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
