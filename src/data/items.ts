// Types
import type { ItemOffset, ClothingItem, PersonConfig } from "../types";

// Constants
const ASSETS_BASE_PATH = "/assets";

// Person configuration
export const personConfig: PersonConfig = {
  imageUrl: `${ASSETS_BASE_PATH}/model.png`,
  baseScale: 1.0,
};

// Clothing items data
export const tops: ClothingItem[] = [
  {
    id: "top_1",
    name: "Top 1",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top1.png`,
    offset: {
      x: 0,
      y: -20,
      scale: 1.0,
      zIndex: 10,
    },
  },
  {
    id: "top_2",
    name: "Top 2",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top2.png`,
    offset: {
      x: 0,
      y: -15,
      scale: 1.0,
      zIndex: 10,
    },
  },
  {
    id: "top_3",
    name: "Top 3",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top3.png`,
    offset: {
      x: 0,
      y: -20,
      scale: 1.0,
      zIndex: 10,
    },
  },
  {
    id: "top_4",
    name: "Top 4",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top4.png`,
    offset: {
      x: 0,
      y: -18,
      scale: 1.0,
      zIndex: 10,
    },
  },
  {
    id: "top_5",
    name: "Top 5",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top5.png`,
    offset: {
      x: 0,
      y: -22,
      scale: 1.0,
      zIndex: 10,
    },
  },
  {
    id: "top_6",
    name: "Top 6",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top6.png`,
    offset: {
      x: 0,
      y: -16,
      scale: 1.0,
      zIndex: 10,
    },
  },
  {
    id: "top_7",
    name: "Top 7",
    imageUrl: `${ASSETS_BASE_PATH}/tops/top7.png`,
    offset: {
      x: 0,
      y: -19,
      scale: 1.0,
      zIndex: 10,
    },
  },
];

export const bottoms: ClothingItem[] = [
  {
    id: "bottom_1",
    name: "Bottom 1",
    imageUrl: `${ASSETS_BASE_PATH}/bottoms/bottom1.png`,
    offset: {
      x: 0,
      y: 50,
      scale: 1.0,
      zIndex: 9,
    },
  },
  {
    id: "bottom_2",
    name: "Bottom 2",
    imageUrl: `${ASSETS_BASE_PATH}/bottoms/bottom2.png`,
    offset: {
      x: 0,
      y: 45,
      scale: 1.0,
      zIndex: 9,
    },
  },
  {
    id: "bottom_3",
    name: "Bottom 3",
    imageUrl: `${ASSETS_BASE_PATH}/bottoms/bottom3.png`,
    offset: {
      x: 0,
      y: 48,
      scale: 1.0,
      zIndex: 9,
    },
  },
  {
    id: "bottom_4",
    name: "Bottom 4",
    imageUrl: `${ASSETS_BASE_PATH}/bottoms/bottom4.png`,
    offset: {
      x: 0,
      y: 52,
      scale: 1.0,
      zIndex: 9,
    },
  },
  {
    id: "bottom_5",
    name: "Bottom 5",
    imageUrl: `${ASSETS_BASE_PATH}/bottoms/bottom5.png`,
    offset: {
      x: 0,
      y: 47,
      scale: 1.0,
      zIndex: 9,
    },
  },
];

// Helper functions
export function getTopOffset(item: ClothingItem): ItemOffset {
  return {
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 10,
    ...item.offset,
  };
}

export function getBottomOffset(item: ClothingItem): ItemOffset {
  return {
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 9,
    ...item.offset,
  };
}

// Validation functions
export function isValidClothingItem(item: unknown): item is ClothingItem {
  return (
    typeof item === "object" &&
    item !== null &&
    typeof (item as Record<string, unknown>).id === "string" &&
    typeof (item as Record<string, unknown>).name === "string" &&
    typeof (item as Record<string, unknown>).imageUrl === "string"
  );
}

export function getClothingItemById(
  id: string,
  items: ClothingItem[]
): ClothingItem | undefined {
  return items.find((item) => item.id === id);
}
