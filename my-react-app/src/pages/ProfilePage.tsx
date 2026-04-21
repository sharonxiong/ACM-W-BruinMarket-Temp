import React, { useState } from "react";
import "./ProfilePage.css";

const mockListings = [
  {
    id: 1,
    title: "Modern Desk Lamp",
    price: 25,
    status: "Active",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80",
  },
  {
    id: 2,
    title: "Calculus Textbook",
    price: 40,
    status: "Sold",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
  },
];

const mockSaved = [
  {
    id: 3,
    title: "Vintage Backpack",
    price: 30,
    status: "Active",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
  },
];

const mockReviews = [
  {
    id: 1,
    reviewer: "Alex K.",
    rating: 5,
    comment: "Great seller, item exactly as described!",
    date: "March 2026",
  },
  {
    id: 2,
    reviewer: "Mia L.",
    rating: 5,
    comment: "Fast response and smooth transaction.",
    date: "February 2026",
  },
];

type Tab = "listings" | "saved" | "reviews";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("listings");

  return (
    <main className="profile-page">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar">SC</div>
        <div className="profile-info">
          <div className="profile-name-row">
            <h2 className="profile-name">Sarah Chen</h2>
            <span className="profile-badge">✓ Verified Bruin</span>
          </div>
          <p className="profile-email">sarah.chen@ucla.edu</p>
          <p className="profile-since">Member since September 2025</p>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-value stat-gold">★ 4.9</span>
              <span className="stat-label">24 reviews</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value stat-blue">12</span>
              <span className="stat-label">Items Sold</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value stat-blue">18</span>
              <span className="stat-label">Purchases</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn-edit">⚙ Edit Profile</button>
            <button className="btn-signout">↪ Sign Out</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="profile-tabs">
        <button
          className={`profile-tab${activeTab === "listings" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("listings")}
        >
          🛍 My Listings
        </button>
        <button
          className={`profile-tab${activeTab === "saved" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          ♡ Saved Items
        </button>
        <button
          className={`profile-tab${activeTab === "reviews" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          ☆ Reviews
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "listings" && (
        <div className="listings-grid">
          {mockListings.map((item) => (
            <div key={item.id} className="listing-card">
              <div className="listing-image-wrap">
                <img src={item.image} alt={item.title} className="listing-image" />
                <span className={`listing-badge listing-badge--${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="listing-info">
                <p className="listing-title">{item.title}</p>
                <p className="listing-price">${item.price}</p>
              </div>
            </div>
          ))}
          <div className="listing-card listing-card--new">
            <div className="listing-new-icon">🛍</div>
            <p className="listing-new-title">List a New Item</p>
            <p className="listing-new-sub">Start selling to fellow Bruins</p>
          </div>
        </div>
      )}

      {activeTab === "saved" && (
        <div className="listings-grid">
          {mockSaved.map((item) => (
            <div key={item.id} className="listing-card">
              <div className="listing-image-wrap">
                <img src={item.image} alt={item.title} className="listing-image" />
                <span className={`listing-badge listing-badge--${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
              <div className="listing-info">
                <p className="listing-title">{item.title}</p>
                <p className="listing-price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="reviews-list">
          {mockReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-header">
                <span className="review-reviewer">{r.reviewer}</span>
                <span className="review-stars">{"★".repeat(r.rating)}</span>
                <span className="review-date">{r.date}</span>
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
