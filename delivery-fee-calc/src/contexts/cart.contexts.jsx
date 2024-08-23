import { createContext, useState } from "react";

const calcCartVal = (cartVal, deliveryPrice) => {
  if (cartVal < 10) {
    console.log("value is less than 10");
    const surChargeVal = 10 - cartVal;
    console.log("Surcharge value", surChargeVal);
    deliveryPrice = deliveryPrice + surChargeVal;
    console.log("Delivery price", deliveryPrice);
  } else {
    console.log("value is more than 10");
  }
  return { cartVal, deliveryPrice };
};

export const CartContext = createContext({
  cartVal: 0,
  takeCartVal: () => {},
  deliveryPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [cartVal, setCartVal] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const takeCartVal = (cartVal) => {
    const result = calcCartVal(cartVal, deliveryPrice);
    const updatedCartVal = result.cartVal;
    const updatedDeliveryPrice = result.deliveryPrice;
    setCartVal(updatedCartVal);
    setDeliveryPrice(updatedDeliveryPrice);
  };

  const value = { cartVal, takeCartVal, deliveryPrice };
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
