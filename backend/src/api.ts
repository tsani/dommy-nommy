import fp from 'fastify-plugin';
import mealDbPlugin from './meal-db-plugin';
import { Configuration } from './config';
import { makeWeeklyMealPlan } from './meal-planner';
import { partitionMealsByTiming } from './meal-db';
import { weeklyPlanToShoppingList } from './shopping-list';
import { MEAL_ORDER } from './constants';

const api = (config: Configuration) =>
    fp<Configuration>(async (app) => {
        app.register(mealDbPlugin(config.sheets));

        app.get('/meal-plan', async (req, res) => {
            const allMeals = await app.mealDB.getAllMeals();
            const weeklyMealPlan = makeWeeklyMealPlan(partitionMealsByTiming(allMeals));
            res.send(weeklyMealPlan);
        });

        app.get('/', async (req, res) => {
            const allMeals = await app.mealDB.getAllMeals();
            const mealPlan = makeWeeklyMealPlan(partitionMealsByTiming(allMeals));
            return res.view('/templates/meal-plan.ejs', {
                MEAL_ORDER,
                mealPlan,
                shoppingList: weeklyPlanToShoppingList(mealPlan),
            });
        });

        console.log('did load the routes');
    });
export default api;
