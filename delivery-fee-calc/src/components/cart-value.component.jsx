import { useContext, useState } from "react";
import { CartContext } from "../contexts/cart.contexts";

const CartValue = () => {
  const [inputCartValue, setInputCartValue] = useState("");
  const [inputDistance, setInputDistance] = useState("");
  const [inputNoOfItems, setInputNoOfItems] = useState("");
  const { takeCartVal, deliveryPrice, deliveryDistance } =
    useContext(CartContext);

  const changeHandler = (event) => {
    setInputCartValue(event.target.value);
    console.log("Cart Value", event.target.value);
  };

  const changeHandlerDistance = (event) => {
    setInputDistance(event.target.value);
    console.log("Delivery Distance", event.target.value);
  };

  const itemsHandler = (event) => {
    setInputNoOfItems(event.target.value);
    console.log("No. Of items", event.target.value);
  };

  const deliveryPriceHandler = (e) => {
    e.preventDefault();
    takeCartVal(inputCartValue, inputDistance, inputNoOfItems);
  };
  return (
    <div>
      <form>
        <h2>Delivery Fee Calculator</h2>
        <span> Cart Value </span>
        <input type="text" onChange={changeHandler} />
        <span> Euro </span>
        <br />
        <br />

        <span> Delivery Distance </span>
        <input type="text" onChange={changeHandlerDistance} />
        <span> m </span>
        <br />
        <br />
        <span> No. of items </span>
        <input type="text" onChange={itemsHandler} />
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
