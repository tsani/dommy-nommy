import React, { useEffect, useState } from "react";
import WeekMealView from "./WeekMealView";
import logo from "../logo.svg";
import "../App.css";
import { WeeklyMealPlan } from "../types";
import ShoppingList, { weeklyPlanToShoppingList } from "./ShoppingList";

function App() {
  const [meals, setMeals] = useState<null | WeeklyMealPlan>(null);
  useEffect(() => {
    getMealsFromDb();
  }, []);

  async function getMealsFromDb() {
    const x = await fetch("/meal-plan");
    setMeals(await x.json());
  }

  return (
    <div className="App">
      meal planner 1.0
      {meals === null ? (
        "loading"
      ) : (
        <>
          <WeekMealView weeksMeals={meals}></WeekMealView>
          <ShoppingList shoppingList={weeklyPlanToShoppingList(meals)} />
        </>
      )}
    </div>
  );
}

export default App;
