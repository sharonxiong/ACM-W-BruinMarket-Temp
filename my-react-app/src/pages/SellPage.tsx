import React, { useState } from "react";
import "./SellPage.css";

export default function SellPage() {
  // variables used by useState to give the current value and function to update it
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    setTitle("");
    setCategory("");
    setCondition("");
    setPrice("");
    setPickupLocation("");
    setDescription("");
  };

  return (
    <main className="sell-page">
      <div className="sell-page__header">
        <h1 className="sell-page__title">List an Item</h1>
        <p className="sell-page__subtitle">Share your item with the UCLA community</p>
      </div>

      <form className="sell-form" onSubmit={handleSubmit}>
        {/* Photos */}
        <div className="form-field">
          <label className="form-label">Photos</label>
          <p className="form-hint">Add up to 5 photos</p>
          <div className="photo-grid">
            <div className="photo-upload">
              <span className="photo-upload__icon">↑</span>
              <span className="photo-upload__text">Upload Photo</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="form-field">
          <label className="form-label" htmlFor="title">
            Title <span className="required">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="e.g., Mini Fridge - Perfect for Dorms"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="form-field">
          <label className="form-label" htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="furniture">Furniture</option>
            <option value="books">Books</option>
            <option value="electronics">Electronics</option>
            <option value="dorm-essentials">Dorm Essentials</option>
            <option value="clothing">Clothing</option>
            <option value="appliances">Appliances</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Condition and Price — side by side */}
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="condition">
              Condition <span className="required">*</span>
            </label>
            <select
              id="condition"
              className="form-input"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="">Select condition</option>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="price">
              Price (USD) <span className="required">*</span>
            </label>
            <div className="price-input-wrapper">
              <span className="price-prefix">$</span>
              <input
                id="price"
                type="text"
                className="form-input price-input"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="form-field">
          <label className="form-label" htmlFor="pickup">
            Pickup Location <span className="required">*</span>
          </label>
          <p className="form-hint">Choose a convenient campus meetup spot</p>
          <select
            id="pickup"
            className="form-input"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          >
            <option value="">Select a campus location</option>
            <option value="powell">Powell Library</option>
            <option value="yrl">Young Research Library</option>
            <option value="ackerman">Ackerman Union</option>
            <option value="bruin-plaza">Bruin Plaza</option>
            <option value="hedrick">Hedrick Hall</option>
            <option value="de-neve">De Neve Plaza</option>
            <option value="sunset-rec">Sunset Rec</option>
            <option value="wooden">Wooden Center</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-field">
          <label className="form-label" htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <p className="form-hint">
            Provide details about the item, its condition, and why you're selling
          </p>
          <textarea
            id="description"
            className="form-input form-textarea"
            placeholder="Tell buyers about your item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>

        {/* Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            List Item
          </button>
          <button type="button" className="btn btn--secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}