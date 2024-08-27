import { useState, createContext } from "react";

const calcCartVal = (cartVal, deliveryPrice, deliveryDistance, noOfItems) => {
  if (noOfItems >= 5) {
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
        const calcNoOfItems = noOfItems - 4;
        console.log("calcNoOfItems", calcNoOfItems);
        const resultItems = calcNoOfItems * 0.5;
        console.log("No. of items", resultItems);

        deliveryPrice =
          deliveryPrice + surchargeVal + calctDeliveryDistance + resultItems;
        console.log("Delivery Price", deliveryPrice);
      } else {
        const newDeliveryDistance = deliveryDistance - 1000;
        const result = newDeliveryDistance / 500;
        console.log("result", result);
        const calctDeliveryDistance = Math.ceil(result);
        console.log("after ceil value", calctDeliveryDistance);
        const calcNoOfItems = noOfItems - 4;
        console.log("calcNoOfItems", calcNoOfItems);
        const resultItems = calcNoOfItems * 0.5;

        deliveryPrice = deliveryPrice + calctDeliveryDistance + resultItems;

        console.log("Case : 1 your value is more than 10");
      }
    }
  } else if (noOfItems < 5) {
    if (deliveryDistance <= 1000) {
      if (cartVal < 10) {
        const surchargeVal = 10 - cartVal;
        console.log("Surcharge Value", surchargeVal);
        deliveryPrice = deliveryPrice + surchargeVal;
        console.log("Delivery Price", deliveryPrice);
      } else {
        console.log("your value is more than 10");
      }
    }
  }

  return { cartVal, deliveryPrice, deliveryDistance, noOfItems };
};

export const CartContext = createContext({
  cartVal: 0,
  takeCartVal: () => {},
});

export const ContextProvider = ({ children }) => {
  const [cartVal, setCartVal] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(1000);
  const [noOfItems, setNoOfItems] = useState(0);

  const takeCartVal = (cartVal, deliveryDistance, noOfItems) => {
    const result = calcCartVal(
      cartVal,
      deliveryPrice,
      deliveryDistance,
      noOfItems
    );
    const updatedCartVal = result.cartVal;
    const updatedDeliveryPrice = result.deliveryPrice;
    const updatedDeliveryDistance = result.deliveryDistance;
    const updatedNoOfItems = result.noOfItems;
    setCartVal(updatedCartVal);
    setDeliveryPrice(updatedDeliveryPrice);
    setDeliveryDistance(updatedDeliveryDistance);
    setNoOfItems(updatedNoOfItems);
  };

  const value = {
    cartVal,
    setCartVal,
    takeCartVal,
    deliveryPrice,
    deliveryDistance,
    noOfItems,
  };
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
