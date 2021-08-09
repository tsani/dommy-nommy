import React from "react";
import { WeeklyMealPlan } from "../types";
import { Grid } from "semantic-ui-react";
import MealCard from "./MealCard";
import { MEAL_ORDER } from "../constants";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WeekMealView({
  weeksMeals,
}: {
  weeksMeals: WeeklyMealPlan;
}) {
  return (
    <Grid className={"meal-grid"} columns={7}>
      <Grid.Row>
        {DAYS.map((day) => (
          <Grid.Column>
            <p className={"meal-time-header"}>{day}</p>
          </Grid.Column>
        ))}
      </Grid.Row>
      {MEAL_ORDER.map((time) => {
        return (
          <Grid.Row className={"meal-row"}>
            {new Array(7).fill(0).map((_, i) => (
              <Grid.Column className={"meal-column"}>
                <MealCard meal={weeksMeals[i][time]} />
              </Grid.Column>
            ))}
          </Grid.Row>
        );
      })}
    </Grid>
  );
}
