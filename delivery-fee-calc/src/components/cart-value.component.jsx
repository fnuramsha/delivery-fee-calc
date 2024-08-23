import { createContext, useContext } from "react";
import { useState } from "react";
import { CartContext } from "../contexts/cart.contexts";

const CartValue = () => {
  const { takeCartVal, deliveryPrice } = useContext(CartContext);
  const [input, setInput] = useState("");
  const cartValHandler = (e) => {
    e.preventDefault();
    takeCartVal(input);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    console.log("Input value", event.target.value);

    setInput(value);
  };
  return (
    <div>
      <form>
        <h2> Delivery Fee Calculator </h2>
        <label> Cart Value </label>
        <input
          type="text"
          placeholder=" "
          value={input}
          onChange={handleInputChange}
        />
        <span> Euro </span>
        <br />
        <br />
        <button type="button" onClick={cartValHandler}>
          {" "}
          Calculate Delivery price{" "}
        </button>

        <br />
        <br />
        <span> Delivery price: {deliveryPrice}</span>
      </form>
    </div>
  );
};
export default CartValue;
