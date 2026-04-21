import React from "react";
import "./CommunitiesPage.css";

type CommunityEvent = {
  id: string;
  tag: string;
  title: string;
  description: string;
  dateLabel: string;
  locationLabel: string;
  interestedCount: number;
  imageUrl?: string;
  isTrending?: boolean;
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
  const items: CommunityEvent[] = [
    {
      id: "spring-flea-market",
      tag: "Flea Market",
      title: "Spring Flea Market",
      description:
        "Browse and shop from student vendors selling clothes, accessories, art, and more!",
      dateLabel: "March 8, 2026",
      locationLabel: "Bruin Plaza",
      interestedCount: 234,
      imageUrl:
        "https://images.unsplash.com/photo-1520975682030-1fbbb4f54f5a?auto=format&fit=crop&w=1400&q=60",
      isTrending: true,
    },
    {
      id: "farmers-market",
      tag: "Farmers Market",
      title: "Westwood Farmers Market",
      description:
        "Fresh produce, baked goods, and local vendors — grab something after class.",
      dateLabel: "April 26, 2026",
      locationLabel: "Westwood Village",
      interestedCount: 412,
      imageUrl:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=60",
    },
    {
      id: "textbook-swap",
      tag: "Books & Media",
      title: "Textbook Swap",
      description:
        "Trade or sell used textbooks. Meet up, compare editions, and save money.",
      dateLabel: "May 2, 2026",
      locationLabel: "Powell Library Steps",
      interestedCount: 189,
      imageUrl:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=60",
    },
  ];

  return (
    <main className="communities">
      <div className="communities__header">
        <h1 className="communities__title">Communities</h1>
        <p className="communities__subtitle">
          Explore upcoming events and meetups hosted by communities.
        </p>
      </div>

      <section className="communities__grid" aria-label="Community events">
        {items.map((e) => (
          <article key={e.id} className="community-card">
            <div className="community-card__media">
              {e.imageUrl ? (
                <img
                  className="community-card__image"
                  src={e.imageUrl}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <div className="community-card__image community-card__image--placeholder" />
              )}
              {e.isTrending ? (
                <div className="community-card__badge" aria-label="Trending">
                  Trending
                </div>
              ) : null}
            </div>

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
                <div className="event-meta__row">
                  <EventIcon type="users" title="Interested" />
                  <span>{e.interestedCount} interested</span>
                </div>
              </div>

              <button className="community-card__cta" type="button">
                View Details
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}