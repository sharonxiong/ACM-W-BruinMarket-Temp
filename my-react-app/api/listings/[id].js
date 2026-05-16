import { ObjectId } from "mongodb";
import { getDb } from "../../lib/db.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", "DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let _id;
    try {
      _id = new ObjectId(req.query.id);
    } catch {
      return res.status(400).json({ error: "Invalid id" });
    }

    const db = await getDb();
    const result = await db.collection("listings").deleteOne({ _id });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Not found" });
    return res.status(204).end();
  } catch (err) {
    console.error("delete listing failed:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
