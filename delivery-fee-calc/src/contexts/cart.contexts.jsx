import { createContext } from "react";
import { useState } from "react";

const calcCartVal = (cartVal) => {
  console.log(`Received cartVal: ${cartVal}`);

  if (cartVal < 10) {
    console.log("value is less than 10");
  } else {
    console.log("value is 10 or more");
  }

  return cartVal;
};

export const CartContext = createContext({
  cartVal: 0,
  takeCartVal: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartVal, setCartVal] = useState(0);

  const takeCartVal = (cartVal) => {
    const updatedCartVal = calcCartVal(cartVal);
    setCartVal(updatedCartVal);
  };

  const value = { cartVal, takeCartVal };
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
