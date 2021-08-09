import { WeeklyMealPlan } from "./types";
import { MEAL_ORDER } from "./constants";
import { mealIngredients } from "./meal-util";
import { List, Table } from "semantic-ui-react";

interface ShoppingListItem {
  name: string;
  quantity?: string;
  targetRecipe: string;
}

const key = ({ name }: ShoppingListItem): string => name;

type ShoppingList = Map<string, ShoppingListItem[]>;

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
            ingredients = new Map(
              mealIngredients
                ? parseIngredients(mealIngredients, meal.name)
                : []
            );
        }
        return unionShoppingList(acc, ingredients);
      }, acc),
    new Map<string, ShoppingListItem[]>()
  );

const parseIngredients = (s: string, targetRecipe: string): ShoppingList =>
  new Map(
    s.split(",").map((x) => {
      const [name, quantity] = x
        .trim()
        .split(":")
        .map((x) => x.trim());
      const item = { name, quantity, targetRecipe };
      const items: ShoppingListItem[] = [item];
      return [key(item), items] as const;
    })
  );

interface ShoppingListProps {
  shoppingList: ShoppingList;
}

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
