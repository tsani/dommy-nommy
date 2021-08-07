import fp from 'fastify-plugin';
import MealDB from './meal-db';
import { Configuration } from './config';

declare module 'fastify' {
    interface FastifyInstance {
        mealDB: MealDB;
    }
}

const mealDbPlugin = ({ secrets, sheetId }: Configuration['sheets']) =>
    fp(async (app) => {
        app.mealDB = new MealDB(secrets, sheetId);
    });

export default mealDbPlugin;
