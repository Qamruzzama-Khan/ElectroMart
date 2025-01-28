import { createContext, useState, useEffect } from "react";
import { updateCart } from "../services/api/cartApi";
import { useAuthContext } from "../hooks/useAuth";
import { fetchCart } from "../services/api/cartApi";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const { user } = useAuthContext();

  const clearCart = () => {
    setCart({});
  };

  // get and set the cart
  useEffect(() => {
    const getCart = async () => {
      const response = await fetchCart(user?.accessToken);
      setCart(response.data.data);
    };
    if (user?.accessToken) {
      getCart();
    }
  }, [user]);

  const handleQuantity = async (itemId, operation) => {
    const item = cart.items.find((item) => item._id === itemId);

    if (item) {
      let newQuantity = 0;
      let itemSubTotal = Number(item.subTotal.slice(1));
      let cartTotalBill = Number(cart.totalBill.slice(1));
      const productPrice = Number(item.price.slice(1));

      if (operation === "increase") {
        newQuantity = item.quantity + 1;
        itemSubTotal = productPrice * newQuantity;
        cartTotalBill += productPrice;

        setCart((prevCart) => ({
          ...prevCart,
          items: [
            ...prevCart.items.map((item) =>
              item._id === itemId
                ? {
                    ...item,
                    quantity: newQuantity,
                    subTotal: `\u20B9${itemSubTotal}`,
                  }
                : item
            ),
          ],
          totalBill: `\u20B9${cartTotalBill}`,
        }));
      }
      if (operation === "decrease") {
        newQuantity = item.quantity - 1;
        itemSubTotal = productPrice * newQuantity;
        cartTotalBill -= productPrice;
        setCart((prevCart) => ({
          ...prevCart,
          items: [
            ...prevCart.items.map((item) =>
              item._id === itemId
                ? {
                    ...item,
                    quantity: newQuantity,
                    subTotal: `\u20B9${itemSubTotal}`,
                  }
                : item
            ),
          ],
          totalBill: `\u20B9${cartTotalBill}`,
        }));
      }
      // Update the cart on the backend
      try {
        const response = await updateCart(
          item._id,
          newQuantity,
          user?.accessToken
        );
      } catch (error) {
        console.error("Error updating cart item quantity:", error);
        setError("Failed to update quantity");
      }
    }
  };

  const removeFromCart = (itemId) => {
    const item = cart.items.find((item) => item._id === itemId);

    const removingItemSubtotal = Number(item.subTotal.slice(1));
    console.log(removingItemSubtotal);

    const cartTotalBill = Number(cart.totalBill.slice(1));

    const updatedCartTotalBill = cartTotalBill - removingItemSubtotal;

    const updatedItemsArray = cart.items.filter((item) => item._id !== itemId);
    console.log(updatedItemsArray);

    if (item) {
      setCart((prevCart) => ({
        ...prevCart,
        items: [...prevCart.items.filter((item) => item._id !== itemId)],
        totalBill: `\u20B9${updatedCartTotalBill}`,
        totalItems: updatedItemsArray.length,
      }));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
