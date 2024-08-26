import { useState, createContext } from "react";

const calcCartVal = (cartVal, deliveryPrice, deliveryDistance) => {
  if (deliveryDistance >= 1000) {
    if (cartVal < 10) {
      const surchargeVal = 10 - cartVal;
      console.log("Surcharge Value", surchargeVal);
      console.log("Delivery Distance input from user", deliveryDistance);
      const newDeliveryDistance = deliveryDistance - 1000;
      const result = newDeliveryDistance / 500;
      console.log("result", result);
      const calctDeliveryDistance = Math.ceil(result);
      console.log("after ceil value", calctDeliveryDistance);

      deliveryPrice = deliveryPrice + surchargeVal + calctDeliveryDistance;
      console.log("Delivery Price", deliveryPrice);
    } else {
      const newDeliveryDistance = deliveryDistance - 1000;
      const result = newDeliveryDistance / 500;
      console.log("result", result);
      const calctDeliveryDistance = Math.ceil(result);
      console.log("after ceil value", calctDeliveryDistance);

      deliveryPrice = deliveryPrice + calctDeliveryDistance;

      console.log("Case : 1 your value is more than 10");
    }
  } else if (deliveryDistance <= 1000) {
    if (cartVal < 10) {
      const surchargeVal = 10 - cartVal;
      console.log("Surcharge Value", surchargeVal);
      deliveryPrice = deliveryPrice + surchargeVal;
      console.log("Delivery Price", deliveryPrice);
    } else {
      console.log("your value is more than 10");
    }
  }

  return { cartVal, deliveryPrice, deliveryDistance };
};

export const CartContext = createContext({
  cartVal: 0,
  takeCartVal: () => {},
});

export const ContextProvider = ({ children }) => {
  const [cartVal, setCartVal] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(1000);

  const takeCartVal = (cartVal, deliveryDistance) => {
    const result = calcCartVal(cartVal, deliveryPrice, deliveryDistance);
    const updatedCartVal = result.cartVal;
    const updatedDeliveryPrice = result.deliveryPrice;
    const updatedDeliveryDistance = result.deliveryDistance;
    setCartVal(updatedCartVal);
    setDeliveryPrice(updatedDeliveryPrice);
    setDeliveryDistance(updatedDeliveryDistance);
    console.log(updatedDeliveryPrice);
  };

  const value = {
    cartVal,
    setCartVal,
    takeCartVal,
    deliveryPrice,
    deliveryDistance,
  };
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
