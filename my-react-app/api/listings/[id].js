import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db.js";

export default async function handler(req, res) {
  let _id;
  try {
    _id = new ObjectId(req.query.id);
  } catch {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const db = await getDb();
    const listings = db.collection("listings");

    if (req.method === "GET") {
      const doc = await listings.findOne({ _id });
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(doc);
    }

    if (req.method === "DELETE") {
      const result = await listings.deleteOne({ _id });
      if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
      return res.status(204).end();
    }

    res.setHeader("Allow", "GET, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("listing [id] handler failed:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
