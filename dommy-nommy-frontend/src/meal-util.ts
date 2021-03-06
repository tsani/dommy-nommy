import { Meal } from "./types";

export const mealIngredients = (meal: Meal): string | undefined => {
  switch (meal.type) {
    case "anonymous":
      return meal.ingredients.join();
    case "named":
      return meal.recipe.ingredients;
  }
};
