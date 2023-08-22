import React, { useEffect, useState } from "react";
import * as itemsAPI from "../../utilities/apiRoutes/games-api";
import * as ordersAPI from "../../utilities/apiRoutes/orders-api";
import { Link, useNavigate } from "react-router-dom";
import NavModal from "../../NavBar/NavModal";

function NewOrderPage() {
  const [dataItems, setDataItems] = useState([]);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(function () {
    async function getItems() {
      const items = await itemsAPI.findAllGames();
      setDataItems(items);
    }
    getItems();

    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  async function handleAddToOrder(gameId) {
    await ordersAPI.addItemToCart(gameId);
    setCart(updatedCart);
    console.log("item added to cart");
  }
  async function handleChangeQty(gameId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(gameId, newQty);
    setCart(updatedCart);
  }
  async function handleCheckOut() {
    await ordersAPI.checkout();
    navigate("/orders");
  }

  return (
    <>
      <OneGame
        handleAddToOrder={handleAddToOrder}
        dataItems={[dataItems]}
        onSearch={() => {}}
        orders={cart}
        handleChangeQty={handleChangeQty}
      />
      <NavModal
        orders={cart}
        handleChangeQty={handleChangeQty}
        handleCheckOut={handleCheckOut}
      />
    </>
  );
}

export default NewOrderPage;
