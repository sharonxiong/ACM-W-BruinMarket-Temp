export type Category = { slug: string; label: string };

export const CATEGORIES: Category[] = [
  { slug: "books", label: "Textbooks" },
  { slug: "electronics", label: "Electronics" },
  { slug: "furniture", label: "Furniture" },
  { slug: "clothing", label: "Clothing" },
  { slug: "dorm-essentials", label: "Dorm Supplies" },
  { slug: "appliances", label: "Appliances" },
  { slug: "bikes", label: "Bikes & Scooters" },
  { slug: "free", label: "Free Stuff" },
  { slug: "other", label: "Other" },
];

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label])
);

export function prettyCategory(slug: string | null | undefined): string {
  if (!slug) return "Other";
  if (CATEGORY_LABELS[slug]) return CATEGORY_LABELS[slug];
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const PICKUP_LABELS: Record<string, string> = {
  powell: "Powell Library",
  yrl: "Young Research Library",
  ackerman: "Ackerman Union",
  "bruin-plaza": "Bruin Plaza",
  hedrick: "Hedrick Hall",
  "de-neve": "De Neve Plaza",
  "sunset-rec": "Sunset Rec",
  wooden: "Wooden Center",
};

export function prettyPickup(slug: string | null | undefined): string {
  if (!slug) return "UCLA Campus";
  if (PICKUP_LABELS[slug]) return PICKUP_LABELS[slug];
  return slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Stand-in seller names for older listings posted before profile names were
// attached. Picked deterministically from a listing's _id so the same listing
// always shows the same name across reloads.
const DUMMY_NAMES = [
  "Alex Nguyen",
  "Priya Shah",
  "Jordan Lee",
  "Maya Patel",
  "Diego Ramirez",
  "Olivia Park",
  "Ethan Wright",
  "Zara Khan",
  "Liam Chen",
  "Sofia Garcia",
];

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function displaySeller(listing: { _id: string; seller?: string | null }): string {
  const raw = (listing.seller ?? "").trim();
  if (raw && raw.toLowerCase() !== "anonymous bruin") return raw;
  return DUMMY_NAMES[hashString(listing._id) % DUMMY_NAMES.length];
}

const PROFILE_NAME_KEY = "profileName";
export const DEFAULT_PROFILE_NAME = "Sarah Chen";

export function getProfileName(): string {
  if (typeof window === "undefined") return DEFAULT_PROFILE_NAME;
  return localStorage.getItem(PROFILE_NAME_KEY) || DEFAULT_PROFILE_NAME;
}

export function setProfileName(name: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_NAME_KEY, name);
}
