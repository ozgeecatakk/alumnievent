import type { FoodItem } from "./types";

type Fixture = { mealName: string; items: FoodItem[] };

export const FIXTURES: Fixture[] = [
  {
    mealName: "Grilled Chicken Salad",
    items: [
      { name: "Grilled chicken breast", portion: "140 g", calories: 231, protein: 43.4, carbs: 0, fat: 5, confidence: 0.94 },
      { name: "Mixed greens", portion: "80 g", calories: 18, protein: 1.4, carbs: 3.2, fat: 0.2, confidence: 0.88 },
      { name: "Cherry tomatoes", portion: "60 g", calories: 11, protein: 0.5, carbs: 2.3, fat: 0.1, confidence: 0.91 },
      { name: "Olive oil dressing", portion: "1 tbsp", calories: 119, protein: 0, carbs: 0, fat: 13.5, confidence: 0.72 },
    ],
  },
  {
    mealName: "Pasta Bolognese",
    items: [
      { name: "Spaghetti", portion: "180 g cooked", calories: 279, protein: 10.3, carbs: 56.2, fat: 1.6, confidence: 0.96 },
      { name: "Bolognese sauce", portion: "150 g", calories: 196, protein: 12.8, carbs: 9.4, fat: 11.7, confidence: 0.85 },
      { name: "Parmesan", portion: "15 g", calories: 59, protein: 5.3, carbs: 0.5, fat: 3.9, confidence: 0.79 },
    ],
  },
  {
    mealName: "Breakfast Plate",
    items: [
      { name: "Scrambled eggs", portion: "2 eggs", calories: 182, protein: 12.6, carbs: 1.6, fat: 13.8, confidence: 0.93 },
      { name: "Sourdough toast", portion: "1 slice", calories: 120, protein: 4.1, carbs: 22.8, fat: 1.1, confidence: 0.9 },
      { name: "Avocado", portion: "half", calories: 161, protein: 2, carbs: 8.6, fat: 14.7, confidence: 0.87 },
      { name: "Black coffee", portion: "240 ml", calories: 2, protein: 0.3, carbs: 0, fat: 0, confidence: 0.68 },
    ],
  },
  {
    mealName: "Burger and Fries",
    items: [
      { name: "Beef burger", portion: "1 burger", calories: 540, protein: 29.4, carbs: 40.1, fat: 28.6, confidence: 0.95 },
      { name: "French fries", portion: "120 g", calories: 378, protein: 4.4, carbs: 49.3, fat: 18.2, confidence: 0.92 },
      { name: "Ketchup", portion: "2 tbsp", calories: 34, protein: 0.4, carbs: 8.2, fat: 0, confidence: 0.64 },
    ],
  },
  {
    mealName: "Salmon and Vegetables",
    items: [
      { name: "Baked salmon fillet", portion: "150 g", calories: 312, protein: 34.2, carbs: 0, fat: 18.8, confidence: 0.91 },
      { name: "Roasted broccoli", portion: "100 g", calories: 55, protein: 3.7, carbs: 6.6, fat: 2.1, confidence: 0.89 },
      { name: "Quinoa", portion: "120 g cooked", calories: 143, protein: 5.3, carbs: 24.9, fat: 2.3, confidence: 0.76 },
    ],
  },
  {
    mealName: "Yogurt Bowl",
    items: [
      { name: "Greek yogurt", portion: "200 g", calories: 118, protein: 20.4, carbs: 7.2, fat: 0.8, confidence: 0.9 },
      { name: "Granola", portion: "40 g", calories: 190, protein: 4.6, carbs: 27.1, fat: 7.3, confidence: 0.83 },
      { name: "Blueberries", portion: "60 g", calories: 34, protein: 0.4, carbs: 8.7, fat: 0.2, confidence: 0.86 },
      { name: "Honey", portion: "1 tsp", calories: 21, protein: 0, carbs: 5.8, fat: 0, confidence: 0.61 },
    ],
  },
];

export function getMockAnalysis(seed: number): Fixture {
  return FIXTURES[Math.abs(seed) % FIXTURES.length];
}
