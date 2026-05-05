import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./EventDetailsPage.css";

type CommunityEvent = {
  _id: string;
  tag: string;
  title: string;
  description: string;
  dateLabel: string;
  time?: string;
  locationLabel: string;
};

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<CommunityEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: CommunityEvent[]) => {
        if (cancelled) return;
        setEvent(data.find((e) => e._id === id) ?? null);
      })
      .catch((err) => { if (!cancelled) setLoadError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return (
    <main className="event-detail">
      <div className="event-detail__header">
        <Link to="/events" className="event-detail__back">
          ← Back to events
        </Link>

        {loading && <p className="event-detail__loading">Loading…</p>}

        {!loading && !event && !loadError && (
          <>
            <h1 className="event-detail__title">Event not found</h1>
            <p className="event-detail__missing">
              This event no longer exists. It may have already ended.
            </p>
          </>
        )}

        {event && (
          <>
            <span className="event-detail__pill">{event.tag}</span>
            <h1 className="event-detail__title">{event.title}</h1>
          </>
        )}
      </div>

      <div className="event-detail__body">
        {loadError && (
          <p className="event-detail__error">
            Couldn't load event ({loadError}). Is the API server running?
          </p>
        )}

        {event && (
          <>
            <div className="event-detail__facts">
              <div className="event-detail__fact">
                <span className="event-detail__fact-label">Date</span>
                <span className="event-detail__fact-value">{event.dateLabel}</span>
              </div>
              <div className="event-detail__fact">
                <span className="event-detail__fact-label">Time</span>
                {event.time ? (
                  <span className="event-detail__fact-value">{event.time}</span>
                ) : (
                  <span className="event-detail__fact-value event-detail__fact-value--muted">All day</span>
                )}
              </div>
              <div className="event-detail__fact">
                <span className="event-detail__fact-label">Location</span>
                <span className="event-detail__fact-value">{event.locationLabel}</span>
              </div>
            </div>

            <section className="event-detail__section">
              <span className="event-detail__section-label">About this event</span>
              <p className="event-detail__description">{event.description}</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
