import { useState, createContext } from "react";
const initialUserInputValues = {
  cartVal: "",
  deliveryDistance: "",
  noOfItems: "",
};
// After optimzation
const calcCartVal = (cartVal, deliveryPrice, deliveryDistance, noOfItems) => {
  const MIN_CART_VALUE = 10;
  const DISTANCE_THRESHOLD = 1000;
  const DISTANCE_STEP = 500;
  const EXTRA_ITEM_CHARGE = 0.5;

  // Calculate Surcharge value
  let surchargeVal = 0;
  if (cartVal < MIN_CART_VALUE) {
    surchargeVal = MIN_CART_VALUE - cartVal;
    console.log("Surcharge Value", surchargeVal);
  }

  // Calculate Delivery Distance
  let additionalDistanceCost = 0;
  if (deliveryDistance > DISTANCE_THRESHOLD) {
    const extraDistance = deliveryDistance - DISTANCE_THRESHOLD;
    const result = extraDistance / DISTANCE_STEP;
    additionalDistanceCost = Math.ceil(result);
    console.log("Additional distance Cost", additionalDistanceCost);
  }

  // Calculate No.of items
  let additionalItemCost = 0;

  if (noOfItems > 4) {
    additionalItemCost = (noOfItems - 4) * EXTRA_ITEM_CHARGE;
    console.log("No. of items", additionalItemCost);
  }

  // Calculate Additional Bulk fee
  let additionalBulkFee = 0;
  if (noOfItems > 12) {
    additionalBulkFee = 1.2;
  }

  // Calculate delivery price when Cart value is 0
  if (cartVal >= 200) {
    deliveryPrice = 0;
    surchargeVal = 0;
    additionalDistanceCost = 0;
    additionalItemCost = 0;
    additionalBulkFee = 0;
  }
  // Delivery fee validation
  if (deliveryPrice > 15) {
    deliveryPrice = 0;
  }
  // Calculate Delivery price
  deliveryPrice +=
    surchargeVal +
    additionalDistanceCost +
    additionalItemCost +
    additionalBulkFee;

  const currentDate = new Date();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = dayNames[currentDate.getDay()];
  console.log(day);
  const hours = currentDate.getHours();

  if (day === "Wednesday" && hours >= "15" && hours <= "19") {
    deliveryPrice = deliveryPrice * 1.2;
  }

  console.log("Delivery Price", deliveryPrice);

  return { cartVal, deliveryPrice, deliveryDistance, noOfItems };
};

export const CartContext = createContext({
  cartVal: 0,
  takeCartVal: () => {},
});

export const ContextProvider = ({ children }) => {
  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [userInputValues, setUserInputValues] = useState(
    initialUserInputValues
  );
  const takeCartVal = () => {
    const result = calcCartVal(
      userInputValues.cartVal,
      deliveryPrice,
      userInputValues.deliveryDistance,
      userInputValues.noOfItems
    );
    const updatedCartVal = result.cartVal;
    const updatedDeliveryPrice = result.deliveryPrice;
    const updatedDeliveryDistance = result.deliveryDistance;
    const updatedNoOfItems = result.noOfItems;
    setDeliveryPrice(updatedDeliveryPrice);

    // Holds the values of the form inputs
    setUserInputValues({
      cartVal: updatedCartVal,
      deliveryDistance: updatedDeliveryDistance,
      noOfItems: updatedNoOfItems,
    });
  };

  const value = {
    setUserInputValues,
    takeCartVal,
    deliveryPrice,
    userInputValues,
  };
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
