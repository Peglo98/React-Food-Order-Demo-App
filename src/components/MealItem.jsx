import { useContext } from "react";
import {currencyFormatter} from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import { ip } from "../hooks/useHttp";
export default function MealItem({ meal }) {

    const cartCtx = useContext(CartContext);

    function handleAddToCart() {
     cartCtx.addItem(meal);   
    }


  return (
    <li className="meal-item">
      <article>
        <img src={ip + meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
        <Button onClick={handleAddToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
