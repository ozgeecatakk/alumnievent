export type FoodItem = {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
};

export type MealAnalysis = {
  id: string;
  createdAt: string;
  photo: string;
  mealName: string;
  items: FoodItem[];
};

export function totalCalories(analysis: MealAnalysis) {
  return analysis.items.reduce((sum, item) => sum + item.calories, 0);
}

export function totalMacros(analysis: MealAnalysis) {
  return analysis.items.reduce(
    (acc, item) => ({
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { protein: 0, carbs: 0, fat: 0 },
  );
}
