import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const mockListings = [
  { id: 1, title: "Modern Desk Lamp", price: 25, status: "Active" },
  { id: 2, title: "Calculus Textbook", price: 40, status: "Sold" },
  { id: 3, title: "Mechanical Keyboard", price: 65, status: "Active" },
  { id: 4, title: "IKEA Shelf (White)", price: 20, status: "Active" },
];

const mockSaved = [
  { id: 5, title: "Vintage Backpack", price: 30, status: "Active" },
  { id: 6, title: "Coffee Maker", price: 45, status: "Active" },
  { id: 7, title: "Yoga Mat", price: 18, status: "Active" },
];

const mockReviews = [
  {
    id: 1,
    reviewer: "Alex K.",
    rating: 5,
    comment: "Great seller, item exactly as described! Packaged carefully and responded super fast.",
    date: "March 2026",
  },
  {
    id: 2,
    reviewer: "Mia L.",
    rating: 5,
    comment: "Smooth transaction and Sarah was very communicative. Would definitely buy from her again!",
    date: "February 2026",
  },
  {
    id: 3,
    reviewer: "Jordan T.",
    rating: 4,
    comment: "Good condition overall, minor wear not mentioned but totally fair for the price.",
    date: "January 2026",
  },
];

type Tab = "listings" | "saved" | "reviews";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("listings");
  const navigate = useNavigate();

  return (
    <main className="profile-page">

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-banner">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar" />
          </div>
        </div>

        <div className="profile-body">
          <div className="profile-header-row">
            <div>
              <div className="profile-name-row">
                <h2 className="profile-name">Sarah Chen</h2>
                <span className="profile-badge">✓ Verified Bruin</span>
              </div>
              <p className="profile-email">sarah.chen@ucla.edu</p>
              <p className="profile-since">Member since September 2025</p>
            </div>
            <div className="profile-actions">
              <button className="btn-edit">⚙ Edit Profile</button>
              <button className="btn-signout">↪ Sign Out</button>
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat-card">
              <span className="stat-value stat-gold">★ 4.9</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat-card">
              <span className="stat-value stat-blue">24</span>
              <span className="stat-label">Reviews</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat-card">
              <span className="stat-value stat-blue">12</span>
              <span className="stat-label">Items Sold</span>
            </div>
            <div className="profile-stat-divider" />
            <div className="profile-stat-card">
              <span className="stat-value stat-blue">18</span>
              <span className="stat-label">Purchases</span>
            </div>
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
          <span className="tab-count">{mockListings.length}</span>
        </button>
        <button
          className={`profile-tab${activeTab === "saved" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          ♡ Saved Items
          <span className="tab-count">{mockSaved.length}</span>
        </button>
        <button
          className={`profile-tab${activeTab === "reviews" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          ☆ Reviews
          <span className="tab-count">{mockReviews.length}</span>
        </button>
      </div>

      {/* Listings */}
      {activeTab === "listings" && (
        <div className="listings-grid">
          {mockListings.map((item) => (
            <div key={item.id} className="listing-card">
              <div className="listing-image-wrap">
                <div className="listing-image-placeholder" />
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
          <div className="listing-card listing-card--new" onClick={() => navigate("/sell")}>
            <div className="listing-new-icon">+</div>
            <p className="listing-new-title">List a New Item</p>
            <p className="listing-new-sub">Start selling to fellow Bruins</p>
          </div>
        </div>
      )}

      {/* Saved */}
      {activeTab === "saved" && (
        <div className="listings-grid">
          {mockSaved.map((item) => (
            <div key={item.id} className="listing-card">
              <div className="listing-image-wrap">
                <div className="listing-image-placeholder" />
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

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="reviews-list">
          <div className="reviews-summary">
            <span className="reviews-big-score">4.9</span>
            <div className="reviews-summary-right">
              <div className="reviews-stars-row">★★★★★</div>
              <p className="reviews-summary-label">Based on 24 reviews</p>
            </div>
          </div>
          {mockReviews.map((r) => (
            <div key={r.id} className="review-card">
              <div className="review-header">
                <div className="review-avatar" />
                <div className="review-meta">
                  <span className="review-reviewer">{r.reviewer}</span>
                  <span className="review-date">{r.date}</span>
                </div>
                <div className="review-stars">
                  {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </div>
              </div>
              <p className="review-comment">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}
