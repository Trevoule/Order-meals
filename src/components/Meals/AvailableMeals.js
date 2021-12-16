import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useState, useCallback, useEffect } from "react";

const fetchUrl =
  "https://react-fetch-movies-12638-default-rtdb.firebaseio.com/meals.json";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  const asyncMealsHandler = useCallback(async () => {
    try {
      const response = await fetch(fetchUrl);

      setHttpError(false);

      if (!response.ok) {
        throw new Error("Fetch unsuccessful!");
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
    } catch (error) {
      setHttpError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    asyncMealsHandler();
  }, [asyncMealsHandler]);

  let content = <p>Found no meals.</p>;

  if (isLoading) {
    content = (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    content = (
      <section className={classes.MealsError}>
        <p className="">{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }

  return (
    <section className={classes["available-meals"]}>
      <Card>{content }</Card>
    </section>
  );
};

export default AvailableMeals;
