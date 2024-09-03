import { useContext } from "react";
import { CartContext } from "../contexts/cart.contexts";

const CartValue = () => {
  const { takeCartVal, userInputValues, deliveryPrice, setUserInputValues } =
    useContext(CartContext);

  // This function is used to update the userInputValues state
  const changeHandler = (event) => {
    setUserInputValues({
      ...userInputValues, // Keep the existing values
      [event.target.name]: event.target.value, // Update the specific field that changed
    });
  };

  const deliveryPriceHandler = (e) => {
    e.preventDefault();
    takeCartVal();
  };

  return (
    <div>
      <form>
        <h2>Delivery Fee Calculator</h2>
        <span> Cart Value </span>
        <input
          type="text"
          onChange={changeHandler}
          name="cartVal"
          value={userInputValues.cartVal}
        />
        <span> Euro </span>
        <br />
        <br />

        <span> Delivery Distance </span>
        <input
          type="text"
          onChange={changeHandler}
          name="deliveryDistance"
          value={userInputValues.deliveryDistance}
        />
        <span> m </span>
        <br />
        <br />
        <span> Amount of items </span>
        <input
          type="text"
          onChange={changeHandler}
          name="noOfItems"
          value={userInputValues.noOfItems}
        />
        <br />
        <br />

        <button onClick={deliveryPriceHandler}>Calculate Delivery Price</button>
        <br />
        <br />
        <span>Delivery Price: {deliveryPrice} </span>
      </form>
    </div>
  );
};
export default CartValue;
