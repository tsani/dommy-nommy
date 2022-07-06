//gets all the meals from the database, stores them in a list
import { NamedMeal, ShoppingList, ShoppingListItem } from './types';
import { smartParseInt } from './util';

import Sheets from 'node-sheets';

export default class MealDB {
    private readonly sheets: Sheets;
    private readonly dbSheetName: string;

    constructor(secrets: unknown, sheetId: string, dbSheetName = 'meal-db') {
        this.dbSheetName = dbSheetName;
        this.sheets = new Sheets(sheetId);
        this.sheets.authorizeJWT(secrets);
    }

    /**
     * Loads all meals from the database.
     * @param gs
     */
    async getAllMeals(): Promise<NamedMeal[]> {
        const table = await this.sheets.tables(this.dbSheetName);
        return table.rows.map((meal) => ({
            type: 'named',
            name: meal.name.value,
            times: meal.timings.value.split(',').map((x) => x.trim()),
            tags: meal.tags?.value?.split(',')?.map((x) => x.trim()) ?? [],

            recipe: {
                ingredients: parseIngredients(
                    meal.ingredients?.value,
                    meal.name.value,
                ),
                instructions: meal.instructions?.value,
                serves: smartParseInt(meal.serves?.value) ?? 1,
            },
        }));
    }
}

export interface PartitionedMeals {
    breakfasts: NamedMeal[];
    lunches: NamedMeal[];
    dinners: NamedMeal[];
}

/**
 * Separates an array of meals into three, one for each meal time.
 * A meal is duplicated across categories if it can be eaten at multiple times.
 * @param meals The array of meals to separate.
 */
export function partitionMealsByTiming(meals: NamedMeal[]): PartitionedMeals {
    const dinners = [];
    const lunches = [];
    const breakfasts = [];

    for (const meal of meals) {
        for (const time of meal.times) {
            switch (time) {
                case 'breakfast':
                    breakfasts.push(meal);
                    break;
                case 'lunch':
                    lunches.push(meal);
                    break;
                case 'dinner':
                    dinners.push(meal);
                    break;
            }
        }
    }

    return { breakfasts, lunches, dinners };
}

// ingredients string looks like
// "chicken: 1 lbs, potato: 2, milk: 4 tbsp"
const parseIngredients = (s: string, targetRecipe: string): ShoppingList =>
  new Map(
    s.split(",").map((x) => {
      const [name, quantity] = x
        .trim()
        .split(":")
        .map((x) => x.trim());
      const item = { name, quantity, targetRecipe };
      const items: ShoppingListItem[] = [item];
      return [name, items] as const;
    })
  );

