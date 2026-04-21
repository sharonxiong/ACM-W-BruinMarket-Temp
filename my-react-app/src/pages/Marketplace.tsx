import { useState, useMemo } from "react";
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

const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  Textbooks:        { icon: "📚", color: "#fff3cd" },
  Electronics:      { icon: "💻", color: "#dbeafe" },
  Furniture:        { icon: "🪑", color: "#fce8d5" },
  Clothing:         { icon: "👕", color: "#f3e8ff" },
  "Dorm Supplies":  { icon: "🛏", color: "#d1fae5" },
  "Bikes & Scooters": { icon: "🚲", color: "#cffafe" },
  "Free Stuff":     { icon: "🎁", color: "#f0fdf4" },
};

const SORT_OPTIONS = [
  { value: "recent",     label: "Most Recent" },
  { value: "price_asc",  label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const mockItems = [
  { id: 1,  title: "Modern Desk Lamp",          price: 25,  category: "Dorm Supplies",    date: "2026-04-20", seller: "Sarah C."  },
  { id: 2,  title: "Calculus Textbook (8th Ed.)",price: 40, category: "Textbooks",         date: "2026-04-19", seller: "James L."  },
  { id: 3,  title: "Vintage Backpack",           price: 30,  category: "Clothing",          date: "2026-04-18", seller: "Mia T."    },
  { id: 4,  title: "Standing Desk",              price: 120, category: "Furniture",         date: "2026-04-17", seller: "Kevin R."  },
  { id: 5,  title: "MacBook Pro Charger",        price: 35,  category: "Electronics",       date: "2026-04-16", seller: "Priya S."  },
  { id: 6,  title: "Trek Mountain Bike",         price: 280, category: "Bikes & Scooters", date: "2026-04-15", seller: "Daniel W." },
  { id: 7,  title: "IKEA Desk Chair",            price: 55,  category: "Furniture",         date: "2026-04-14", seller: "Anna K."   },
  { id: 8,  title: "Free Moving Boxes",          price: 0,   category: "Free Stuff",        date: "2026-04-13", seller: "Chris M."  },
  { id: 9,  title: "Python Programming Book",    price: 20,  category: "Textbooks",         date: "2026-04-12", seller: "Lily H."   },
  { id: 10, title: "Noise-Cancelling Headphones",price: 90,  category: "Electronics",       date: "2026-04-11", seller: "Omar N."   },
  { id: 11, title: "Mini Fridge",                price: 75,  category: "Dorm Supplies",     date: "2026-04-10", seller: "Jen B."    },
  { id: 12, title: "UCLA Hoodie (M)",            price: 18,  category: "Clothing",          date: "2026-04-09", seller: "Tyler S."  },
];

const MAX_PRICE = 500;

export default function Marketplace() {
  const [search, setSearch]           = useState("");
  const [category, setCategory]       = useState("");
  const [expanded, setExpanded]       = useState(false);
  const [sort, setSort]               = useState("recent");
  const [priceRange, setPriceRange]   = useState<[number, number]>([0, MAX_PRICE]);
  const [starred, setStarred]         = useState<Set<number>>(new Set());
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAllCategories = () => {
    if (!expanded) {
      setExpanded(true);
      setCategory("");
    } else {
      setExpanded(false);
      setCategory("");
    }
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
  };

  const filtered = useMemo(() => {
    let items = [...mockItems];

    if (showStarredOnly) items = items.filter((i) => starred.has(i.id));
    if (category)        items = items.filter((i) => i.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
      );
    }
    items = items.filter((i) => i.price >= priceRange[0] && i.price <= priceRange[1]);

    if (sort === "recent")     items.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === "price_asc")  items.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") items.sort((a, b) => b.price - a.price);

    return items;
  }, [search, category, sort, priceRange, starred, showStarredOnly]);

  return (
    <main className="marketplace-page">
      {/* Top bar */}
      <div className="marketplace-topbar">
        <div className="marketplace-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="marketplace-search"
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>
        <select
          className="marketplace-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Category bar */}
      <div className="category-bar">
        {/* All Categories — always visible */}
        <button
          className={`category-pill${!expanded ? " category-pill--active" : ""}`}
          onClick={handleAllCategories}
        >
          All Categories {expanded ? "▲" : "▼"}
        </button>

        {/* Sub-categories — animate in when expanded */}
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            className={`category-pill category-pill--sub${
              expanded ? " category-pill--visible" : ""
            }${category === cat ? " category-pill--active" : ""}`}
            style={{ animationDelay: `${i * 55}ms` }}
            onClick={() => handleCategory(cat)}
          >
            {CATEGORY_META[cat].icon} {cat}
          </button>
        ))}
      </div>

      <div className="marketplace-body">
        {/* Sidebar filters */}
        <aside className="marketplace-sidebar">
          <div className="filter-section">
            <h3 className="filter-heading">Filters</h3>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-range-display">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1] === MAX_PRICE ? `${MAX_PRICE}+` : priceRange[1]}</span>
              </div>
              <div className="range-track">
                <div
                  className="range-fill"
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
                  className="range-input range-input--low"
                />
                <input
                  type="range" min={0} max={MAX_PRICE} step={5}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (v > priceRange[0]) setPriceRange([priceRange[0], v]);
                  }}
                  className="range-input range-input--high"
                />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">Saved</label>
              <button
                className={`starred-filter-btn${showStarredOnly ? " starred-filter-btn--active" : ""}`}
                onClick={() => setShowStarredOnly((v) => !v)}
              >
                <span className="star-icon">{showStarredOnly ? "★" : "☆"}</span>
                Starred Items
                {starred.size > 0 && <span className="starred-count">{starred.size}</span>}
              </button>
            </div>

            <button
              className="filter-reset"
              onClick={() => {
                setSearch("");
                setCategory("");
                setExpanded(false);
                setSort("recent");
                setPriceRange([0, MAX_PRICE]);
                setShowStarredOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Items grid */}
        <section className="marketplace-content">
          <p className="results-count">
            {filtered.length} {filtered.length === 1 ? "item" : "items"} found
            {showStarredOnly && " · Starred only"}
            {category && ` · ${category}`}
          </p>

          {filtered.length === 0 ? (
            <div className="marketplace-empty">
              <div className="empty-icon">🔎</div>
              <p className="empty-title">No items found</p>
              <p className="empty-sub">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="items-grid">
              {filtered.map((item) => {
                const meta = CATEGORY_META[item.category];
                return (
                  <div key={item.id} className="item-card">
                    <div
                      className="item-placeholder"
                      style={{ background: meta?.color ?? "#f3f4f6" }}
                    >
                      <span className="item-placeholder-icon">{meta?.icon ?? "📦"}</span>
                      <button
                        className={`star-btn${starred.has(item.id) ? " star-btn--active" : ""}`}
                        onClick={(e) => toggleStar(item.id, e)}
                        title={starred.has(item.id) ? "Remove from starred" : "Star this item"}
                      >
                        {starred.has(item.id) ? "★" : "☆"}
                      </button>
                      <span className="item-category-tag">{item.category}</span>
                    </div>
                    <div className="item-info">
                      <p className="item-title">{item.title}</p>
                      <p className="item-price">
                        {item.price === 0
                          ? <span className="price-free">Free</span>
                          : `$${item.price}`}
                      </p>
                      <p className="item-seller">by {item.seller}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
