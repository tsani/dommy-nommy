import React, { useState } from "react";
import { Accordion, Button, Card } from "semantic-ui-react";
import { Meal } from "../types";
import { mealIngredients } from "../meal-util";

const mealName = (meal: Meal): string => {
  switch (meal.type) {
    case "anonymous":
      return "anonymous";
    case "named":
      return meal.name;
  }
};

export default function MealCard({ meal }: { meal: Meal }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={"meal-card"}>
      <div className={"meal-name"}>
        <Button className={"expand-meal"} size={"mini"} onClick={handleClick}>
          +
        </Button>
        <span className={"meal-title"}>{mealName(meal)}</span>
      </div>
      {isOpen && <div>{mealIngredients(meal)}</div>}
    </div>
  );
}
