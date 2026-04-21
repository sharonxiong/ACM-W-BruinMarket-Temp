import { useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./Marketplace.css";

const CATEGORIES = [
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Dorm Supplies",
  "Bikes & Scooters",
  "Free Stuff",
];


const MAX_PRICE = 500;

const mockItems = [
  { id: 1,  title: "Modern Desk Lamp",            price: 25,  category: "Dorm Supplies",    seller: "Sarah C."  },
  { id: 2,  title: "Calculus Textbook (8th Ed.)", price: 40,  category: "Textbooks",         seller: "James L."  },
  { id: 3,  title: "Vintage Backpack",             price: 30,  category: "Clothing",          seller: "Mia T."    },
  { id: 4,  title: "Standing Desk",                price: 120, category: "Furniture",         seller: "Kevin R."  },
  { id: 5,  title: "MacBook Pro Charger",          price: 35,  category: "Electronics",       seller: "Priya S."  },
  { id: 6,  title: "Trek Mountain Bike",           price: 280, category: "Bikes & Scooters",  seller: "Daniel W." },
  { id: 7,  title: "IKEA Desk Chair",              price: 55,  category: "Furniture",         seller: "Anna K."   },
  { id: 8,  title: "Free Moving Boxes",            price: 0,   category: "Free Stuff",        seller: "Chris M."  },
  { id: 9,  title: "Python Programming Book",      price: 20,  category: "Textbooks",         seller: "Lily H."   },
  { id: 10, title: "Noise-Cancelling Headphones",  price: 90,  category: "Electronics",       seller: "Omar N."   },
  { id: 11, title: "Mini Fridge",                  price: 75,  category: "Dorm Supplies",     seller: "Jen B."    },
  { id: 12, title: "UCLA Hoodie (M)",              price: 18,  category: "Clothing",          seller: "Tyler S."  },
];

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams();
  const clearSearch = () => setSearchParams({}, { replace: true });
  const search = searchParams.get("q") ?? "";
  const [category, setCategory]     = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [starred, setStarred]       = useState<Set<number>>(new Set());
  const listingsRef = useRef<HTMLElement>(null);

  const scrollToListings = () =>
    listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() =>
    mockItems.filter((i) => {
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q);
      const matchesCategory = !category || i.category === category;
      return matchesSearch && matchesCategory;
    }),
    [search, category]
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

      </section>

      {/* ── Category tiles ── */}
      <section className="mp-categories">
        <h2 className="mp-section-heading">Shop by Category</h2>
        <div className="mp-cat-grid">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`mp-cat-tile${category === cat ? " mp-cat-tile--active" : ""}`}
              onClick={() => { setCategory(cat === category ? "" : cat); scrollToListings(); }}
            >
              <span className="mp-cat-name">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Listings ── */}
      <section className="mp-listings" ref={listingsRef}>
        <div className="mp-listings-header">
          <div className="mp-listings-title-row">
            <h2 className="mp-section-heading mp-section-heading--flush">
              {category || "All Listings"}
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
                    <option key={cat} value={cat}>{cat}</option>
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
            {filtered.length === 0 ? (
              <div className="mp-empty">
                <p>No items match your search.</p>
                <button className="mp-clear-btn" onClick={() => { setCategory(""); clearSearch(); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((item) => (
                <div key={item.id} className="mp-card">
                  <div className="mp-card-img" />
                  <span className="mp-card-time">recently</span>
                  <div className="mp-card-body">
                    <p className="mp-card-title">{item.title}</p>
                    <div className="mp-card-brand-row">
                      <span className="mp-card-brand">{item.seller}</span>
                      <span className="mp-card-category">{item.category}</span>
                    </div>
                    <div className="mp-card-footer">
                      <span className="mp-card-price">
                        {item.price === 0
                          ? <span className="mp-card-free">Free</span>
                          : `$${item.price}`}
                      </span>
                      <button
                        className={`mp-heart${starred.has(item.id) ? " mp-heart--on" : ""}`}
                        onClick={(e) => toggleStar(item.id, e)}
                        title={starred.has(item.id) ? "Unsave" : "Save"}
                      >
                        <svg viewBox="0 0 24 24" fill={starred.has(item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                          <path d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 14 21 12 21Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    <span className="mp-card-location">UCLA Campus</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
