import { useContext, useActionState } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp, {ip} from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp((`${ip}/orders`), requestConfig);

  const totalAmount = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    //userProgressCtx.hideCart();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction, null)

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Sumbit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Order Submitted</h2>
        <p>Thank you for your order!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(totalAmount)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to sumbit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
