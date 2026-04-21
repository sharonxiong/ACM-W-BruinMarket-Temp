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

const MAX_PRICE = 500;

const mockItems = [
  { id: 1,  title: "Modern Desk Lamp",           price: 25,  category: "Dorm Supplies",     seller: "Sarah C."  },
  { id: 2,  title: "Calculus Textbook (8th Ed.)", price: 40,  category: "Textbooks",          seller: "James L."  },
  { id: 3,  title: "Vintage Backpack",            price: 30,  category: "Clothing",           seller: "Mia T."    },
  { id: 4,  title: "Standing Desk",               price: 120, category: "Furniture",          seller: "Kevin R."  },
  { id: 5,  title: "MacBook Pro Charger",         price: 35,  category: "Electronics",        seller: "Priya S."  },
  { id: 6,  title: "Trek Mountain Bike",          price: 280, category: "Bikes & Scooters",   seller: "Daniel W." },
  { id: 7,  title: "IKEA Desk Chair",             price: 55,  category: "Furniture",          seller: "Anna K."   },
  { id: 8,  title: "Free Moving Boxes",           price: 0,   category: "Free Stuff",         seller: "Chris M."  },
  { id: 9,  title: "Python Programming Book",     price: 20,  category: "Textbooks",          seller: "Lily H."   },
  { id: 10, title: "Noise-Cancelling Headphones", price: 90,  category: "Electronics",        seller: "Omar N."   },
  { id: 11, title: "Mini Fridge",                 price: 75,  category: "Dorm Supplies",      seller: "Jen B."    },
  { id: 12, title: "UCLA Hoodie (M)",             price: 18,  category: "Clothing",           seller: "Tyler S."  },
];

export default function Marketplace() {
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [starred, setStarred]       = useState<Set<number>>(new Set());

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Only search filters the grid — price and category are visual only for now
  const filtered = useMemo(() => {
    if (!search.trim()) return mockItems;
    const q = search.toLowerCase();
    return mockItems.filter(
      (i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <main className="marketplace-page">
      {/* Search bar */}
      <div className="marketplace-topbar">
        <input
          className="marketplace-search"
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="marketplace-body">
        {/* Sidebar filters */}
        <aside className="marketplace-sidebar">
          <div className="filter-section">
            <h3 className="filter-heading">Filters</h3>

            {/* Category dropdown */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="category-select">Category</label>
              <select
                id="category-select"
                className="filter-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price range */}
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
          </div>
        </aside>

        {/* Items grid */}
        <section className="marketplace-content">
          <p className="results-count">
            {filtered.length} {filtered.length === 1 ? "item" : "items"}
          </p>

          <div className="items-grid">
            {filtered.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-placeholder">
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
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}