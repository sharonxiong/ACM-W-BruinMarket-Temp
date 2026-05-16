import "dotenv/config";
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const { MONGODB_URI, DB_NAME = "bruinmarket", PORT = 3001 } = process.env;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in server/.env");
  process.exit(1);
}

const client = new MongoClient(MONGODB_URI);
await client.connect();
const db = client.db(DB_NAME);
const listings = db.collection("listings");
const events = db.collection("events");
console.log(`Connected to MongoDB → ${DB_NAME}`);

// TTL: Mongo's background sweeper (~60s) deletes any event whose `date` is in the past.
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
  console.log("Seeded events collection with 3 starter events");
}

const formatDateLabel = (date) =>
  date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/api/listings", async (req, res) => {
  const docs = await listings.find().sort({ createdAt: -1 }).toArray();
  res.json(docs);
});

app.get("/api/listings/:id", async (req, res) => {
  let _id;
  try {
    _id = new ObjectId(req.params.id);
  } catch {
    return res.status(400).json({ error: "Invalid id" });
  }
  const doc = await listings.findOne({ _id });
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

const DEFAULT_LISTING_IMAGE = "/no-photo.svg";

app.post("/api/listings", async (req, res) => {
  const { title, category, condition, price, pickupLocation, description, seller, image } = req.body ?? {};

  if (!title || !category || !condition || price == null || !pickupLocation || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const priceNum = Number(price);
  if (Number.isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({ error: "Price must be a non-negative number" });
  }

  let imageValue = DEFAULT_LISTING_IMAGE;
  if (image != null && image !== "") {
    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({ error: "Image must be a data: URL of an image" });
    }
    imageValue = image;
  }

  const doc = {
    title: String(title).trim(),
    category: String(category),
    condition: String(condition),
    price: priceNum,
    pickupLocation: String(pickupLocation),
    description: String(description).trim(),
    seller: seller ? String(seller).trim() : "Anonymous Bruin",
    image: imageValue,
    createdAt: new Date(),
  };

  const result = await listings.insertOne(doc);
  res.status(201).json({ _id: result.insertedId, ...doc });
});

app.get("/api/events", async (req, res) => {
  const docs = await events.find().sort({ date: 1 }).toArray();
  res.json(docs.map((e) => ({ ...e, dateLabel: formatDateLabel(e.date) })));
});

app.post("/api/events", async (req, res) => {
  const { tag, title, description, date, time, locationLabel } = req.body ?? {};
  if (!tag || !title || !description || !date || !locationLabel) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const eventDate = new Date(`${date}T23:59:59`);
  if (Number.isNaN(eventDate.getTime())) {
    return res.status(400).json({ error: "Invalid date" });
  }
  const doc = {
    tag: String(tag),
    title: String(title).trim(),
    description: String(description).trim(),
    date: eventDate,
    time: time ? String(time).trim() : "",
    locationLabel: String(locationLabel).trim(),
    interestedCount: 0,
    createdAt: new Date(),
  };
  const result = await events.insertOne(doc);
  res.status(201).json({ _id: result.insertedId, ...doc, dateLabel: formatDateLabel(doc.date) });
});

app.delete("/api/listings/:id", async (req, res) => {
  let id;
  try {
    id = new ObjectId(req.params.id);
  } catch {
    return res.status(400).json({ error: "Invalid id" });
  }
  const result = await listings.deleteOne({ _id: id });
  if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
  res.status(204).end();
});

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
