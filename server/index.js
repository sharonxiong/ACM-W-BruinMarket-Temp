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
console.log(`Connected to MongoDB → ${DB_NAME}`);

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/listings", async (req, res) => {
  const docs = await listings.find().sort({ createdAt: -1 }).toArray();
  res.json(docs);
});

app.post("/api/listings", async (req, res) => {
  const { title, category, condition, price, pickupLocation, description, seller } = req.body ?? {};

  if (!title || !category || !condition || price == null || !pickupLocation || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const priceNum = Number(price);
  if (Number.isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({ error: "Price must be a non-negative number" });
  }

  const doc = {
    title: String(title).trim(),
    category: String(category),
    condition: String(condition),
    price: priceNum,
    pickupLocation: String(pickupLocation),
    description: String(description).trim(),
    seller: seller ? String(seller).trim() : "Anonymous Bruin",
    createdAt: new Date(),
  };

  const result = await listings.insertOne(doc);
  res.status(201).json({ _id: result.insertedId, ...doc });
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
