//Sunday: NO new meals that create leftovers
//Saturday: NO meals that creates 2 leftovers
import { ChosenMeal, WeeklyMealPlan } from './types';
import { randomRange, shuffle } from './util';
import { PartitionedMeals } from './meal-db';
import { Meal } from './types';

/**
 * Constructs a weekly meal plan from a database of potential meals partitioned by what times the meals can be eaten at.
 * @param breakfasts
 * @param lunches
 * @param dinners
 */
export function makeWeeklyMealPlan({
    breakfasts,
    lunches,
    dinners,
}: PartitionedMeals): WeeklyMealPlan {
    const thisWeeksMeals = [];

    [breakfasts, lunches, dinners].forEach((x) => shuffle(x));
    //we want at least 2 meals that have left overs, so we'll get those first from dinner.

    const nonLODins = [];
    const singleLODins = [];
    const doubleLODins = [];

    for (const d of dinners) {
        switch (d.recipe.serves) {
            case 1:
                nonLODins.push(d);
                break;
            case 2:
                singleLODins.push(d);
                break;
            case 3:
                doubleLODins.push(d);
                break;
            default:
                throw new Error(`unhandled number of servings: ${d.recipe.serves}`);
        }
    }

    // now all meals have been partitioned into 0xLO, 1xLO, and 2xLO.
    // 1xLO and 2xLO dins have constraints on how many can appear, so we select a random amount for each, satisfying our
    // constraints, and then drop the remaining meals.
    singleLODins.splice(Math.floor(randomRange(3, 5)));
    doubleLODins.splice(Math.floor(randomRange(1, 3)));

    const weeksBreakfasts = breakfasts.slice(0, 2);

    function chooseMeal(m: Meal, isLeftover = false): ChosenMeal {
        return {
            meal: m,
            leftover: isLeftover,
        };
    }
    const LOQ = [];
    for (let i = 0; i < 7; i++) {
        const breakfast = i > 3 ? chooseMeal(weeksBreakfasts[0]) : chooseMeal(weeksBreakfasts[1]);
        let lunch;
        if (LOQ.length === 0) {
            lunch = chooseMeal(lunches.pop());
        } else {
            const remove = LOQ.findIndex((x) => x !== thisWeeksMeals[i - 1].lunch);
            if (remove === -1) {
                lunch = chooseMeal(lunches.pop());
            } else {
                [lunch] = LOQ.splice(remove, 1).map((x) => chooseMeal(x, true));
            }
        }
        let dinner;
        if (LOQ.length !== 0 && LOQ[LOQ.length - 1] !== lunch) {
            [dinner] = LOQ.splice(LOQ.length - 1, 1);
        } else if (doubleLODins.length > 0) {
            dinner = doubleLODins.pop();
            LOQ.push(dinner);
            LOQ.push(dinner);
        }
        if (singleLODins.length > 0 && dinner === undefined) {
            dinner = singleLODins.pop();
            LOQ.push(dinner, true);
        }
        if (dinner === undefined) {
            dinner = { type: 'anonymous', ingredients: '', isLeftover: false };
        }

        thisWeeksMeals.push({
            breakfast,
            lunch,
            dinner,
        });
    }

    return thisWeeksMeals;
}
