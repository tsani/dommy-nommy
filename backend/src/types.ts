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
}

interface Recipe {
  ingredients: string[];
  instrutions: string[];
}

interface AnonymousMeal extends BasicMeal {
  type: "anonymous";
  ingredients: string[];
}

type Meal = NamedMeal | AnonymousMeal;

/**
 * The array always has exactly 7 elements. The first is understood as Sunday's meals.
 */
export type WeeklyMealPlan = Array<{
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}>;

/* IDEA:
 * - we store objects of type Meal in the DB
 * - planner inputs every Meal from the DB and outputs 1 WeeklyMealPlan
 *
 * Notice that the Meal has a _list_ of potential times it could be eaten at, but that's OK in the plan,
 * since the position of the Meal in the plan tells us when we're going to be eating it this week.
 */
