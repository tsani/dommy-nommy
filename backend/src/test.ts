import fs from 'fs';
import MealDB, { partitionMealsByTiming } from './meal-db';
import { makeWeeklyMealPlan } from './meal-planner';

async function main() {
    const mealDB = new MealDB(secrets, SHEET_ID);
    const allMeals = await mealDB.getAllMeals();
    const allMealsByTiming = partitionMealsByTiming(allMeals);
    const weekMealPlan = makeWeeklyMealPlan(allMealsByTiming);
    console.log(weekMealPlan);
}

//if the dinner has left over, the next lunch and dinner the day after
// WILL be the left overs (depending on amount leftover)
//ex meal cooked on Mon for din will be Tues's lunch and Wed's din

main().catch((e) => {
    console.error(`fatal: ${e.stack}`);
});
