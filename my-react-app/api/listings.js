import { getDb } from "../lib/db.js";

const DEFAULT_LISTING_IMAGE = "/no-photo.svg";

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const listings = db.collection("listings");

    if (req.method === "GET") {
      const docs = await listings.find().sort({ createdAt: -1 }).toArray();
      return res.status(200).json(docs);
    }

    if (req.method === "POST") {
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
      return res.status(201).json({ _id: result.insertedId, ...doc });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("listings handler failed:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
