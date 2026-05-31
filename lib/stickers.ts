// Maps a JSON `icon` / `sticker` key to a sticker PNG in /public/stickers.
// Keys without a dedicated asset (warning, pdf, link, ...) return undefined and
// are rendered as inline UI instead.

const KNOWN = new Set([
  "ball",
  "battery",
  "boom",
  "breed",
  "calendar",
  "clock",
  "cool_dog",
  "crazy_dog",
  "crown",
  "emo_dog",
  "food_bowl",
  "gender",
  "heart",
  "hearts",
  "helmet",
  "image",
  "lightbulb",
  "note",
  "paw_brown",
  "paw_pink",
  "shield",
  "shocked_dog",
  "sleepy_dog",
  "social_dogs",
  "stamp",
  "sunglasses",
  "weight",
]);

// A few schema keys differ from the file name.
const ALIAS: Record<string, string> = {
  food: "food_bowl",
  paw: "paw_pink",
  sleepy: "sleepy_dog",
};

export function sticker(key?: string): string | undefined {
  if (!key) return undefined;
  const resolved = ALIAS[key] ?? key;
  return KNOWN.has(resolved) ? `/stickers/${resolved}.png` : undefined;
}
