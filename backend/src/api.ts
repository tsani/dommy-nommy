import fp from 'fastify-plugin';
import mealDbPlugin from './meal-db-plugin';
import { Configuration } from './config';
import { makeWeeklyMealPlan } from './meal-planner';
import { partitionMealsByTiming } from './meal-db';

const api = (config: Configuration) =>
    fp(async (app) => {
        app.register(mealDbPlugin(config.sheets));

        app.get('/meal-plan', async (req, res) => {
            const allMeals = await app.mealDB.getAllMeals();
            const weeklyMealPlan = makeWeeklyMealPlan(partitionMealsByTiming(allMeals));
            res.send(weeklyMealPlan);
        });
    });
export default api;
