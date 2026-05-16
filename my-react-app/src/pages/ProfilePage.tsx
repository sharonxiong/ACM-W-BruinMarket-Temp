import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfileName, setProfileName } from "../lib/listings";
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

type Tab = "listings" | "saved";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("listings");
  const [name, setName] = useState<string>(getProfileName);
  const [editingName, setEditingName] = useState(false);
  const navigate = useNavigate();

  const saveName = () => {
    const trimmed = name.trim();
    if (trimmed) setProfileName(trimmed);
    else setName(getProfileName());
    setEditingName(false);
  };

  return (
    <main className="profile-page">

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar" />
        </div>

        <div className="profile-body">
          <div className="profile-header-row">
            <div>
              {editingName ? (
                <input
                  className="profile-name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  onBlur={saveName}
                  onKeyDown={(e) => { if (e.key === "Enter") saveName(); }}
                />
              ) : (
                <h2 className="profile-name">{name}</h2>
              )}
              <p className="profile-email">sarah.chen@ucla.edu</p>
              <p className="profile-since">Member since September 2025</p>
            </div>
            <div className="profile-actions">
              <button
                className="btn-edit"
                type="button"
                onClick={() => setEditingName((v) => !v)}
              >
                {editingName ? "Done" : "Edit Profile"}
              </button>
              <button className="btn-signout" type="button">Sign Out</button>
            </div>
          </div>

          <div className="profile-stats">
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
          My Listings
          <span className="tab-count">{mockListings.length}</span>
        </button>
        <button
          className={`profile-tab${activeTab === "saved" ? " profile-tab--active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved Items
          <span className="tab-count">{mockSaved.length}</span>
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


    </main>
  );
}
