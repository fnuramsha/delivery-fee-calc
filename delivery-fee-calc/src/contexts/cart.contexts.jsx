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
    alert("Delivery price can never be more than 15 euro");
  }

  // Calculate Delivery price
  deliveryPrice +=
    surchargeVal +
    additionalDistanceCost +
    additionalItemCost +
    additionalBulkFee;
  // Delivery fee validation
  if (deliveryPrice > 15) {
    alert("Delivery price can never be more than 15 euro");
  }

  console.log("Delivery Price", deliveryPrice);

  return { cartVal, deliveryPrice, deliveryDistance, noOfItems };
};

// Initial code
// const calcCartVal = (cartVal, deliveryPrice, deliveryDistance, noOfItems) => {
//   if (noOfItems >= 5) {
//     if (deliveryDistance >= 1000) {
//       if (cartVal < 10) {
//         const surchargeVal = 10 - cartVal;
//         console.log("Surcharge Value", surchargeVal);
//         console.log("Delivery Distance input from user", deliveryDistance);
//         const newDeliveryDistance = deliveryDistance - 1000;
//         const result = newDeliveryDistance / 500;
//         console.log("result", result);
//         const calctDeliveryDistance = Math.ceil(result);
//         console.log("after ceil value", calctDeliveryDistance);
//         const calcNoOfItems = noOfItems - 4;
//         console.log("calcNoOfItems", calcNoOfItems);
//         const resultItems = calcNoOfItems * 0.5;
//         console.log("No. of items", resultItems);

//         deliveryPrice =
//           deliveryPrice + surchargeVal + calctDeliveryDistance + resultItems;
//         console.log("Delivery Price", deliveryPrice);
//       } else {
//         const newDeliveryDistance = deliveryDistance - 1000;
//         const result = newDeliveryDistance / 500;
//         console.log("result", result);
//         const calctDeliveryDistance = Math.ceil(result);
//         console.log("after ceil value", calctDeliveryDistance);
//         const calcNoOfItems = noOfItems - 4;
//         console.log("calcNoOfItems", calcNoOfItems);
//         const resultItems = calcNoOfItems * 0.5;

//         deliveryPrice = deliveryPrice + calctDeliveryDistance + resultItems;

//         console.log("Case : 1 your value is more than 10");
//       }
//     }
//   } else {
//     if (deliveryDistance <= 1000) {
//       if (cartVal < 10) {
//         const surchargeVal = 10 - cartVal;
//         console.log("Surcharge Value", surchargeVal);
//         deliveryPrice = deliveryPrice + surchargeVal;
//         console.log("Delivery Price", deliveryPrice);
//       } else {
//         const calcNoOfItems = noOfItems - 4;
//         console.log("calcNoOfItems", calcNoOfItems);
//         const resultItems = calcNoOfItems * 0.5;

//         deliveryPrice = deliveryPrice + resultItems;

//         console.log("your value is more than 10");
//       }
//     }
//   }

//   return { cartVal, deliveryPrice, deliveryDistance, noOfItems };
// };

export const CartContext = createContext({
  cartVal: 0,
  takeCartVal: () => {},
});

export const ContextProvider = ({ children }) => {
  // const [cartVal, setCartVal] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState("");
  // const [deliveryDistance, setDeliveryDistance] = useState("");
  // const [noOfItems, setNoOfItems] = useState("");
  const [userInputValues, setUserInputValues] = useState(
    initialUserInputValues
  );

  const takeCartVal = () => {
    // const result = calcCartVal(
    //   cartVal,
    //   deliveryPrice,
    //   deliveryDistance,
    //   noOfItems
    // );
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
    // setCartVal(updatedCartVal);
    setDeliveryPrice(updatedDeliveryPrice);
    // setDeliveryDistance(updatedDeliveryDistance);
    // setNoOfItems(updatedNoOfItems);

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
