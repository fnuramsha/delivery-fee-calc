import { createContext } from "react";

export const CartContext = createContext({
  cartVal: 0,
});

export const CreateProvider = ({ children }) => {
  const [cartVal, setCartVal] = useState(cartVal);
  const value = { cartVal, setCartVal };
  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
