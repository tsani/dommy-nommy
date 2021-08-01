##--```json
##{
#  Monday :
#    [
#       {
#          name : chicken,
#          ingredients : [...]
#        },
#        { ... },
#        { ... },
#    ],
#  Tuesday :
#    [
#      {
#```

interface MealTicket {
    anonymous: boolean;
    breakfasty: boolean;
    name: string;
}

type breakfastability = "exculsively" | "possibly" | "never";
type mealTime = "Breakfast" | "Lunch" | "Dinner";

interface Recipe {
    name: string;
    ingredients: string[];
    instrutions: string[];
    breakfastable: breakfastability;
}

interface RecipesByTiming {
    recipes: Recipe[];
    mealsTime: mealTime;
}

interface RecipesByTiming{
    dailyRecipes: Recipes[];
}



