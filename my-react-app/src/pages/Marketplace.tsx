import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CATEGORIES, displaySeller, prettyCategory, prettyPickup } from "../lib/listings";
import "./Marketplace.css";

type EventCard = {
  _id: string;
  tag: string;
  title: string;
  dateLabel: string;
  locationLabel: string;
};

const MAX_PRICE = 500;

type Listing = {
  _id: string;
  title: string;
  price: number;
  category: string;
  seller: string;
  pickupLocation?: string;
  image?: string | null;
};

const DEFAULT_LISTING_IMAGE = "/no-photo.svg";

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const clearSearch = () => setSearchParams({}, { replace: true });
  const search = searchParams.get("q") ?? "";
  const [category, setCategory]     = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [starred, setStarred]       = useState<Set<string>>(new Set());
  const [items, setItems]           = useState<Listing[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventCard[]>([]);
  const [loadError, setLoadError]   = useState<string | null>(null);
  const listingsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/listings")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Listing[]) => { if (!cancelled) setItems(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); });

    fetch("/api/events")
      .then((r) => r.ok ? r.json() : [])
      .then((data: EventCard[]) => { if (!cancelled) setUpcomingEvents(data.slice(0, 3)); })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  const scrollToListings = () =>
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() =>
    items.filter((i) => {
      const q = search.toLowerCase().trim();
      const categoryLabel = prettyCategory(i.category).toLowerCase();
      const matchesSearch =
        !q ||
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        categoryLabel.includes(q);
      const matchesCategory = !category || i.category === category;
      const matchesPrice = i.price >= priceRange[0] && (priceRange[1] === MAX_PRICE || i.price <= priceRange[1]);
      return matchesSearch && matchesCategory && matchesPrice;
    }),
    [items, search, category, priceRange]
  );

  return (
    <main className="mp-page">

      {/* ── Hero ── */}
      <section className="mp-hero">
        <div className="mp-hero-left">
          <span className="mp-eyebrow">UCLA's Student Marketplace</span>
          <h1 className="mp-headline">
            Buy smart.<br />Sell fast.<br />
            <span className="mp-headline-accent">Stay Bruin.</span>
          </h1>
          <p className="mp-subtext">
            Trade textbooks, gear, furniture & more with fellow Bruins —
            no shipping, no strangers.
          </p>
          <div className="mp-ctas">
            <button className="mp-btn-primary" onClick={scrollToListings}>
              Browse listings
            </button>
            <button className="mp-btn-secondary">Start selling →</button>
          </div>
        </div>

        <div className="mp-hero-events">
          <div className="mp-hero-events-header">
            <span className="mp-hero-events-label">Upcoming Events</span>
            <Link className="mp-hero-events-link" to="/events">See all →</Link>
          </div>
          {upcomingEvents.map((ev) => (
            <div key={ev._id} className="mp-ev-card">
              <span className="mp-ev-tag">{ev.tag}</span>
              <p className="mp-ev-title">{ev.title}</p>
              <div className="mp-ev-meta">
                <span>{ev.dateLabel}</span>
                <span className="mp-ev-dot">·</span>
                <span>{ev.locationLabel}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── Category tiles ── */}
      <section className="mp-categories">
        <h2 className="mp-section-heading">Shop by Category</h2>
        <div className="mp-cat-grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              className={`mp-cat-tile${category === cat.slug ? " mp-cat-tile--active" : ""}`}
              onClick={() => { setCategory(cat.slug === category ? "" : cat.slug); scrollToListings(); }}
            >
              <span className="mp-cat-name">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Listings ── */}
      <section className="mp-listings" ref={listingsRef}>
        <div className="mp-listings-header">
          <div className="mp-listings-title-row">
            <h2 className="mp-section-heading mp-section-heading--flush">
              {category ? prettyCategory(category) : "All Listings"}
            </h2>
            <span className="mp-listing-count">
              {filtered.length} {filtered.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="mp-listings-body">
          {/* Sidebar */}
          <aside className="mp-sidebar">
            <div className="mp-filter-section">
              <p className="mp-filter-heading">Filters</p>

              <div className="mp-filter-group">
                <label className="mp-filter-label" htmlFor="cat-select">Category</label>
                <select
                  id="cat-select"
                  className="mp-filter-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="mp-filter-group">
                <label className="mp-filter-label">Price Range</label>
                <div className="mp-price-display">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1] === MAX_PRICE ? `${MAX_PRICE}+` : priceRange[1]}</span>
                </div>
                <div className="mp-range-track">
                  <div
                    className="mp-range-fill"
                    style={{
                      left: `${(priceRange[0] / MAX_PRICE) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / MAX_PRICE) * 100}%`,
                    }}
                  />
                  <input
                    type="range" min={0} max={MAX_PRICE} step={5}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v < priceRange[1]) setPriceRange([v, priceRange[1]]);
                    }}
                    className="mp-range-input mp-range-input--low"
                  />
                  <input
                    type="range" min={0} max={MAX_PRICE} step={5}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v > priceRange[0]) setPriceRange([priceRange[0], v]);
                    }}
                    className="mp-range-input mp-range-input--high"
                  />
                </div>
              </div>

              {(category || search) && (
                <button
                  className="mp-clear-btn"
                  onClick={() => { setCategory(""); clearSearch(); }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="mp-grid">
            {loadError ? (
              <div className="mp-empty">
                <p>Couldn't load listings ({loadError}). Is the API server running on port 3001?</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="mp-empty">
                <p>No items match your search.</p>
                <button className="mp-clear-btn" onClick={() => { setCategory(""); clearSearch(); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((item) => (
                <Link
                  key={item._id}
                  to={`/listings/${item._id}`}
                  className="mp-card mp-card--link"
                >
                  <img
                    className="mp-card-img"
                    src={item.image || DEFAULT_LISTING_IMAGE}
                    alt={item.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_LISTING_IMAGE;
                    }}
                  />
                  <span className="mp-card-time">recently</span>
                  <div className="mp-card-body">
                    <p className="mp-card-title">{item.title}</p>
                    <div className="mp-card-brand-row">
                      <span className="mp-card-brand">{displaySeller(item)}</span>
                      <span className="mp-card-category">{prettyCategory(item.category)}</span>
                    </div>
                    <div className="mp-card-footer">
                      <span className="mp-card-price">
                        {item.price === 0
                          ? <span className="mp-card-free">Free</span>
                          : `$${item.price}`}
                      </span>
                      <button
                        className={`mp-heart${starred.has(item._id) ? " mp-heart--on" : ""}`}
                        onClick={(e) => { e.preventDefault(); toggleStar(item._id, e); }}
                        title={starred.has(item._id) ? "Unsave" : "Save"}
                      >
                        <svg viewBox="0 0 24 24" fill={starred.has(item._id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 14 21 12 21Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <span className="mp-card-location">{prettyPickup(item.pickupLocation)}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
