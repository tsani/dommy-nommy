import fp from 'fastify-plugin';
import '@fastify/view';

import { Configuration } from './config';
import { MEAL_ORDER } from './constants';
import { partitionMealsByTiming } from './meal-db';
import mealDbPlugin from './meal-db-plugin';
import { makeWeeklyMealPlan } from './meal-planner';
import { weeklyPlanToShoppingList } from './shopping-list';

const api = (config: Configuration): ReturnType<typeof fp> =>
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
