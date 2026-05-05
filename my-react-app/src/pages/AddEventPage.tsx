import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SellPage.css";

const TAG_OPTIONS = [
  "Flea Market",
  "Pop-up",
  "Farmers Market",
  "Books & Media",
  "Workshop",
  "Meetup",
  "Performance",
  "Concert",
  "Festival",
  "Other",
];

export default function AddEventPage() {
  const navigate = useNavigate();
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [locationLabel, setLocationLabel] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "err"; msg: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag, title, description, date, time, locationLabel }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(error);
      }
      setStatus({ kind: "ok", msg: "Event added! Redirecting…" });
      setTimeout(() => navigate("/events"), 800);
    } catch (err) {
      setStatus({ kind: "err", msg: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="sell-page">
      <div className="sell-page__header">
        <h1 className="sell-page__title">Add Event</h1>
        <p className="sell-page__subtitle">
          Events disappear automatically the day after they end.
        </p>
      </div>

      <form className="sell-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label" htmlFor="tag">
            Type <span className="required">*</span>
          </label>
          <select
            id="tag"
            className="form-input"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          >
            <option value="">Select a type</option>
            {TAG_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="e.g., Spring Flea Market"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            className="form-input form-textarea"
            placeholder="What's happening?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="date">
              Date <span className="required">*</span>
            </label>
            <input
              id="date"
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="time">
              Time
            </label>
            <input
              id="time"
              type="text"
              className="form-input"
              placeholder="e.g., 3:00 PM – 5:00 PM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="locationLabel">
            Location <span className="required">*</span>
          </label>
          <input
            id="locationLabel"
            type="text"
            className="form-input"
            placeholder="e.g., Bruin Plaza"
            value={locationLabel}
            onChange={(e) => setLocationLabel(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? "Adding…" : "Add Event"}
          </button>
          <button
            type="button"
            className="btn btn--secondary"
            onClick={() => navigate("/events")}
            disabled={submitting}
          >
            Cancel
          </button>
        </div>

        {status && (
          <p style={{ marginTop: 12, color: status.kind === "ok" ? "green" : "crimson" }}>
            {status.msg}
          </p>
        )}
      </form>
    </main>
  );
}
