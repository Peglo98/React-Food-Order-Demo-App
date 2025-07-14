import MealItem from "./MealItem";
import useHttp, { ip } from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp((`${ip}meals`), requestConfig, []);

  if (isLoading) {
    return <p className="centered">Loading...</p>;
  }

  if (error) {
    return <Error title="Error" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
