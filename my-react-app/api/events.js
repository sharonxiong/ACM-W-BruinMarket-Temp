import { getDb, formatDateLabel } from "../lib/db.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();
    const events = db.collection("events");

    if (req.method === "GET") {
      const docs = await events.find().sort({ date: 1 }).toArray();
      return res.status(200).json(
        docs.map((e) => ({ ...e, dateLabel: formatDateLabel(e.date) }))
      );
    }

    if (req.method === "POST") {
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
      return res.status(201).json({
        _id: result.insertedId,
        ...doc,
        dateLabel: formatDateLabel(doc.date),
      });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("events handler failed:", err);
    return res.status(500).json({ error: err.message ?? "Internal error" });
  }
}
