import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const progressCtx = useContext(UserProgressContext);
  const totalItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleShowCart() {
    progressCtx.showCart(true);
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Fancy food plate" />
        <h1>FoodApp</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          <span>🛒 Cart ({totalItems})</span>
        </Button>
      </nav>
    </header>
  );
}
