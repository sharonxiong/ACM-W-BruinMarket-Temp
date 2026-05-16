import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { displaySeller, prettyPickup } from "../lib/listings";
import "./ListingDetailsPage.css";

const DEFAULT_LISTING_IMAGE = "/no-photo.svg";

type Listing = {
  _id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  pickupLocation: string;
  description: string;
  seller: string;
  image?: string | null;
  createdAt?: string;
};

const titleCase = (s: string) =>
  s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    fetch(`/api/listings/${id}`)
      .then(async (r) => {
        if (!r.ok) {
          const { error } = await r.json().catch(() => ({ error: `HTTP ${r.status}` }));
          throw new Error(error);
        }
        return r.json();
      })
      .then((data: Listing) => { if (!cancelled) setListing(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  return (
    <main className="listing-detail">
      <div className="listing-detail__header">
        <Link to="/marketplace" className="listing-detail__back">
          ← Back to marketplace
        </Link>
      </div>

      {loading && <p className="listing-detail__loading">Loading…</p>}

      {loadError && (
        <p className="listing-detail__error">
          Couldn't load this listing ({loadError}).
        </p>
      )}

      {!loading && !loadError && !listing && (
        <p className="listing-detail__missing">This listing no longer exists.</p>
      )}

      {listing && (
        <div className="listing-detail__body">
          <div className="listing-detail__image-wrap">
            <img
              className="listing-detail__image"
              src={listing.image || DEFAULT_LISTING_IMAGE}
              alt={listing.title}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_LISTING_IMAGE;
              }}
            />
          </div>

          <div className="listing-detail__info">
            <span className="listing-detail__pill">{titleCase(listing.category)}</span>
            <h1 className="listing-detail__title">{listing.title}</h1>
            <p className="listing-detail__price">
              {listing.price === 0 ? "Free" : `$${listing.price}`}
            </p>

            <div className="listing-detail__facts">
              <div className="listing-detail__fact">
                <span className="listing-detail__fact-label">Condition</span>
                <span className="listing-detail__fact-value">{titleCase(listing.condition)}</span>
              </div>
              <div className="listing-detail__fact">
                <span className="listing-detail__fact-label">Pickup</span>
                <span className="listing-detail__fact-value">{prettyPickup(listing.pickupLocation)}</span>
              </div>
              <div className="listing-detail__fact">
                <span className="listing-detail__fact-label">Seller</span>
                <span className="listing-detail__fact-value">{displaySeller(listing)}</span>
              </div>
              {listing.createdAt && (
                <div className="listing-detail__fact">
                  <span className="listing-detail__fact-label">Listed</span>
                  <span className="listing-detail__fact-value">
                    {new Date(listing.createdAt).toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            <section className="listing-detail__section">
              <span className="listing-detail__section-label">Description</span>
              <p className="listing-detail__description">{listing.description}</p>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
