import { WeeklyMealPlan, ShoppingList, ShoppingListItem } from "./types";
import { MEAL_ORDER } from "./constants";
import { mealIngredients } from "./meal-util";

const key = ({ name }: ShoppingListItem): string => name;

// chicken: [4 breasts], vinegar: [1 tbsp]
// chicken: [3 breasts]
// UNION of these two lists gives
// chicken: [4 breasts, 3 breasts], vinegar: [1 tbsp]

// Joins two shopping lists by concatenating the lists associated to common
// keys.
const unionShoppingList = (
  s1: ShoppingList,
  s2: ShoppingList
): ShoppingList => {
  const s = new Map<string, ShoppingListItem[]>(
    Array.from(s1).map(([k, v]) => [k, Array.from(v)] as const)
  );
  for (const [k, v] of s2) {
    const x = s.get(k);
    s.set(k, x?.concat(v) ?? Array.from(v));
  }
  return s;
};

export const weeklyPlanToShoppingList = (
  weeksMeals: WeeklyMealPlan
): ShoppingList =>
  weeksMeals.reduce(
    (acc, day): ShoppingList =>
      MEAL_ORDER.reduce((acc, time): ShoppingList => {
        let ingredients: ShoppingList;
        const meal = day[time];
        switch (meal.type) {
          case "anonymous":
            ingredients = new Map();
            break;

          case "named":
            const mealIngredients = meal.recipe.ingredients;
            ingredients = new Map(mealIngredients);
        }
        return unionShoppingList(acc, ingredients);
      }, acc),
    new Map<string, ShoppingListItem[]>()
  );

/*
export default function ShoppingList({ shoppingList }: ShoppingListProps) {
  return (
    <Table basic={"very"} celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Item name</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
          <Table.HeaderCell>Recipe</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from(shoppingList.values()).map((meals) => (
          <Table.Row>
            <Table.Cell>{meals[0].name}</Table.Cell>
            <Table.Cell>
              {meals.map(({ quantity }) => quantity).join(", ")}
            </Table.Cell>
            <Table.Cell>
              {meals.map(({ targetRecipe }) => targetRecipe).join(", ")}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
*/
