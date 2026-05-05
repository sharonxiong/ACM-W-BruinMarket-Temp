import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventsPage.css";

type CommunityEvent = {
  _id: string;
  tag: string;
  title: string;
  description: string;
  dateLabel: string;
  locationLabel: string;
  interestedCount: number;
};

function EventIcon({
  type,
  title,
}: {
  type: "calendar" | "pin" | "users";
  title: string;
}) {
  const common = {
    className: "event-meta__icon",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    role: "img",
    "aria-label": title,
  } as const;

  if (type === "calendar") {
    return (
      <svg {...common}>
        <path
          d="M8 3v3m8-3v3M4.5 9.5h15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 5.5h11A3 3 0 0 1 20.5 8.5v10a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-10a3 3 0 0 1 3-3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === "pin") {
    return (
      <svg {...common}>
        <path
          d="M12 22s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M16.5 20v-1.2c0-1.9-1.8-3.4-4.5-3.4s-4.5 1.5-4.5 3.4V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function CommunitiesPage() {
  const [items, setItems] = useState<CommunityEvent[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: CommunityEvent[]) => { if (!cancelled) setItems(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); });
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="communities">
      <div className="communities__header">
        <h1 className="communities__title">Communities</h1>
        <p className="communities__subtitle">
          Explore upcoming events and meetups hosted by communities.
        </p>
      </div>

      {loadError && (
        <p style={{ color: "crimson", textAlign: "center" }}>
          Couldn't load events ({loadError}). Is the API server running?
        </p>
      )}

      <section className="communities__grid" aria-label="Community events">
        {items.map((e) => (
          <article key={e._id} className="community-card">
            <div className="community-card__body community-card__body--event">
              <div className="community-card__pill">{e.tag}</div>
              <h2 className="community-card__title">{e.title}</h2>
              <p className="community-card__description">{e.description}</p>

              <div className="event-meta" aria-label="Event details">
                <div className="event-meta__row">
                  <EventIcon type="calendar" title="Date" />
                  <span>{e.dateLabel}</span>
                </div>
                <div className="event-meta__row">
                  <EventIcon type="pin" title="Location" />
                  <span>{e.locationLabel}</span>
                </div>
              </div>

              <Link
                to={`/events/${e._id}`}
                className="community-card__cta"
                style={{ display: "block", textAlign: "center", textDecoration: "none" }}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}

        <Link to="/events/add" className="community-card community-card--add" aria-label="Add a new event">
          <div className="community-card--add__inner">
            <span className="community-card--add__plus">+</span>
            <p className="community-card--add__title">Add Event</p>
            <p className="community-card--add__sub">Post something happening on campus</p>
          </div>
        </Link>
      </section>
    </main>
  );
}