import type { Itinerary } from "@/data/mockItinerary";

export interface SavedItinerary {
  id: string;
  itinerary: Itinerary;
  createdAt: string;
  isFavorite: boolean;
}

const STORAGE_KEY = "travel_itineraries";

function getAll(): SavedItinerary[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(items: SavedItinerary[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function saveItinerary(itinerary: Itinerary): string {
  const items = getAll();
  const id = crypto.randomUUID();
  items.unshift({
    id,
    itinerary,
    createdAt: new Date().toISOString(),
    isFavorite: false,
  });
  // Keep max 50
  saveAll(items.slice(0, 50));
  return id;
}

export function getAllItineraries(): SavedItinerary[] {
  return getAll();
}

export function getFavorites(): SavedItinerary[] {
  return getAll().filter((i) => i.isFavorite);
}

export function toggleFavorite(id: string): boolean {
  const items = getAll();
  const item = items.find((i) => i.id === id);
  if (!item) return false;
  item.isFavorite = !item.isFavorite;
  saveAll(items);
  return item.isFavorite;
}

export function isFavorite(id: string): boolean {
  return getAll().find((i) => i.id === id)?.isFavorite ?? false;
}

export function getItineraryById(id: string): SavedItinerary | undefined {
  return getAll().find((i) => i.id === id);
}

export function deleteItinerary(id: string) {
  saveAll(getAll().filter((i) => i.id !== id));
}
