//import { timeStamp } from "console";
import Sheets from "node-sheets";
import { NamedMeal, WeeklyMealPlan } from "./types";
const fs = require("fs");
const SHEET_ID =
  "1C6q4Y5ewclcuAkEmX-Df8kpMYBEUAAGq2wSHcdaV7oQ";
const keys = JSON.parse(fs.readFileSync("./secrets.json"));

async function main() {
  //setting up auth
  const gs = new Sheets(SHEET_ID);
  const email = keys.client_email;
  const key = keys.private_key;
  await gs.authorizeJWT(keys);
  const meals = await getAllMeals(gs);
  mealsByPossibleTiming(meals);
}

//gets all the meals from the database, stores them in a list
async function getAllMeals(gs): Promise<NamedMeal[]> {
  //gets all the table entries
  const table = await gs.tables("meal-db");
  //console.log(table.rows[0]); //what an obj out the db looks like
  const meals = table.rows.map((meal) => ({
    type: "named",
    name: meal.name.value,
    times: meal.timings.value
      .split(",")
      .map((x) => x.trim()),
    recipe: {
      ingredients: meal.Ingredients?.value,
      instructions: [],
    },
  }));
  console.log("===meals==");
  console.log(meals);
  return meals;
}
//give all the meals, returns 3 arrays of meals
//each array contains all the possible meals for a given timing
//ex. all possible dinners, all lunches, bfasts
//this way, we can take those lists and pull 7 meals of each type to construct a plan
function mealsByPossibleTiming(
  meals: NamedMeal[]
): NamedMeal[][] {
  const dinners = [];
  const lunches = [];
  const breakfasts = [];

  meals.map((meal) => {
    meal.times.map((PossibleTiming) => {
      switch (PossibleTiming) {
        case "breakfast":
          breakfasts.push(meal);
          break;
        case "lunch":
          lunches.push(meal);
          break;
        case "dinner":
          dinners.push(meal);
          break;
      }
    });
  });

  return [breakfasts, lunches, dinners];
}

//given a list of all possible breafasts, lunches, dinners
//gives back an array of daily meal plans (ex. each elem is a day's meal plan: 1 din, lunch, bfast)
function weeklyMealPlan(
  mealsByTiming: NamedMeal[][]
): WeeklyMealPlan {
  mealsByTiming.map((x) => shuffle(x));
  return [];
}
//from github
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

main();
