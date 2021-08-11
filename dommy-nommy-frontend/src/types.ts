type MealTime = "breakfast" | "lunch" | "dinner";

type MealType = "anonymous" | "named";

interface BasicMeal {
  /**
   * The times that this meal could be eaten at.
   */
  times: MealTime[];
}

export interface NamedMeal extends BasicMeal {
  type: "named";
  name: string;
  recipe: Recipe;
  tags: string[];
}

export interface ChosenMeal {
  meal: Meal;
  leftover: boolean;
}

interface Recipe {
  ingredients: string;
  instructions: string[];
  serves: number;
}

interface AnonymousMeal extends BasicMeal {
  type: "anonymous";
  ingredients: string[];
}

export type Meal = NamedMeal | AnonymousMeal;

/**
 * The array always has exactly 7 elements. The first is understood as Sunday's meals.
 */
export type DailyMealPlan = {
  breakfast: ChosenMeal;
  lunch: ChosenMeal;
  dinner: ChosenMeal;
};

/**
 * An array of exactly seven daily meal plans.
 * To refer to a specific day's meal plan, use the constants {@link MONDAY}, {@link TUESDAY}, {@link WEDNESDAY},
 * {@link THURSDAY}, {@link FRIDAY}, {@link SATURDAY}, {@link SUNDAY} as indices.
 */
export type WeeklyMealPlan = DailyMealPlan[];

export const MONDAY = 0;
export const TUESDAY = 1;
export const WEDNESDAY = 2;
export const THURSDAY = 3;
export const FRIDAY = 4;
export const SATURDAY = 5;
export const SUNDAY = 6;

/* IDEA:
 * - we store objects of type Meal in the DB
 * - planner inputs every Meal from the DB and outputs 1 WeeklyMealPlan
 *
 * Notice that the Meal has a _list_ of potential times it could be eaten at, but that's OK in the plan,
 * since the position of the Meal in the plan tells us when we're going to be eating it this week.
 */
