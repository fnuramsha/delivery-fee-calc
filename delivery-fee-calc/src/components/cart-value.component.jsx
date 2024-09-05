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
    const requiredFields = ["cartVal", "deliveryDistance", "noOfItems"];
    requiredFields.forEach(function (field) {
      if (!userInputValues[field]?.trim()) {
        // The ! sign is used to negate the result of the condition. It checks for a "falsy" value, such as an empty string, null, or undefined.
        // The ?. is optional chaining, which safely checks if userInputValues[field] exists before calling trim(), preventing an error if the field is undefined or null.
        alert(`${field} is required`);
      } else {
        takeCartVal();
      }
    });
  };

  return (
    <div>
      <form>
        <h2>Delivery Fee Calculator</h2>
        <label>
          <span> Cart Value </span>
          <input
            type="text"
            placeholder="Enter numbers only"
            onChange={changeHandler}
            name="cartVal"
            value={userInputValues.cartVal}
          />
          <span> Euro </span>
          <br />
          <br />
        </label>
        <label>
          <span> Delivery Distance </span>
          <input
            type="text"
            placeholder="Enter numbers only"
            onChange={changeHandler}
            name="deliveryDistance"
            value={userInputValues.deliveryDistance}
          />
          <span> m </span>
        </label>

        <br />
        <br />
        <label>
          <span> Amount of items </span>
          <input
            type="text"
            placeholder="Enter numbers only"
            onChange={changeHandler}
            name="noOfItems"
            value={userInputValues.noOfItems}
          />
        </label>

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
