import { createContext, useState, useEffect } from "react";
import { findOnegameById } from "./utilities/apiRoutes/games-api";
import { useParams } from "react-router-dom";
export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getProductData: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [data, setData] = useState([]);

  let { id } = useParams();
  const getOneGameOnly = async () => {
    try {
      const response = await findOnegameById(id);
      setData(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOneGameOnly();
  }, []);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function getProductData(id) {
    let productData = data.find((product) => product.id === id);
    console.log(`you are in Product Data: ${productData}`);
    if (productData === undefined) {
      console.log("Product does not exist" + id);
    } else {
      return productData;
    }
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // Add the game details to the cartProducts array
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
          //   price: gameData.price, // Add the price from gameData
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.forEach((cartItem) => {
      const productPrice = cartItem.quantity * cartItem.price;
      totalCost += productPrice;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    getProductData,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
export default CartProvider;

// import { createContext, useState, useEffect } from "react";
// import { findOnegameById } from "./utilities/apiRoutes/games-api";
// import { useParams } from "react-router-dom";
// import {
//   addItemToCart,
//   setItemQtyInCart,
//   checkout,
// } from "./utilities/apiRoutes/orders-api";

// export const CartContext = createContext({
//   items: [],
//   getProductQuantity: () => {},
//   addOneToCart: () => {},
//   removeOneFromCart: () => {},
//   deleteFromCart: () => {},
//   getTotalCost: () => {},
//   getProductData: () => {},
// });

// export function CartProvider({ children }) {
//   const [cartProducts, setCartProducts] = useState([]);
//   const [gameData, setGameData] = useState(null);

//   let { id } = useParams();
//   const getGameData = async () => {
//     try {
//       const response = await findOnegameById(id);
//       setGameData(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getGameData();
//   }, []);

//   const getProductQuantity = (id) => {
//     const cartItem = cartProducts.find((product) => product.game._id === id);
//     return cartItem ? cartItem.game.qty : 0;
//   };

//   const addOneToCart = async (id) => {
//     try {
//       await addItemToCart(id);
//       setCartProducts((prevProducts) => {
//         const existingProduct = prevProducts.find(
//           (product) => product.game._id === id
//         );

//         if (existingProduct) {
//           existingProduct.qty += 1;
//           return [...prevProducts];
//         } else {
//           return [...prevProducts, { game: gameData, qty: 1 }];
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeOneFromCart = (id) => {
//     setCartProducts((prevProducts) => {
//       const existingProduct = prevProducts.find(
//         (product) => product.game._id === id
//       );

//       if (existingProduct && existingProduct.quantity > 1) {
//         existingProduct.qty -= 1;
//         return [...prevProducts];
//       } else {
//         return prevProducts.filter((product) => product.game._id !== id);
//       }
//     });
//   };

//   const deleteFromCart = (id) => {
//     setCartProducts((prevProducts) =>
//       prevProducts.filter((product) => product.game._id !== id)
//     );
//   };

//   const getTotalCost = () => {
//     let totalCost = 0;
//     cartProducts.forEach((cartItem) => {
//       totalCost += cartItem.qty * cartItem.game.price;
//     });
//     return totalCost;
//   };
//   const contextValue = {
//     items: cartProducts,
//     getProductQuantity,
//     addOneToCart,
//     removeOneFromCart,
//     deleteFromCart,
//     getTotalCost,
//     getProductData: () => gameData,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
//   );
// }

// export default CartProvider;

// //we can also do the following
// //fetch the setItemQtyInCart component
// //import { addItemToCart, setItemQtyInCart } from "./utilities/apiRoutes/orders-api";

// // const removeOneFromCart = async (id) => {
// //   try {
// //     await setItemQtyInCart(id, -1);
// //     // Update cartProducts state as needed
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
