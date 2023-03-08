import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductList from "./products";
import ProductPage from "./productpage";
import Basket from "./basket";
import AddListing from "./addListing";

export default function Main() {
  const [product, setProduct] = useState();
  const [cartItems, setCartItems] = useState([]);

  // REACT_APP
  const URL = process.env.REACT_APP_BACKEND_URL;

  const getProduct = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setProduct(data);
  };

  const addProduct = async (pr) => {
    console.log(pr, URL);
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pr),
    });
    getProduct();
  };

  const addCart = async () => {
    const response = await fetch(URL + "/cart/items");
    const data = await response.json();
    setCartItems(data);
    console.log("response :" + response);
  };

  const onAdd = async (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: (exist.qty += 1) } : x
        )
      );
      const response = await fetch(URL + "/cart/" + exist._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exist),
      });
      console.log(response);
    } else {
      setCartItems([...cartItems, { ...product, qty: (product.qty = 1) }]);
      const response = await fetch(URL + "/cart", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      console.log("response =" + response);
    }
    // addCart();
  };
  const onRemove = async (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
      await fetch(URL + "/cart/" + exist._id, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exist),
      });
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
      const response = await fetch(URL + "/cart/" + exist._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exist),
      });
    }
  };

  useEffect(() => {
    getProduct();
    addCart();
  }, []);

  return (
    <div>
      <AddListing products={product} addProduct={addProduct} />
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              products={product}
              onAdd={onAdd}
              onRemove={onRemove}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductPage
              products={product}
              onAdd={onAdd}
              onRemove={onRemove}
              cartItems={cartItems}
            />
          }
        />
      </Routes>
      <Basket
        products={product}
        onAdd={onAdd}
        onRemove={onRemove}
        cartItems={cartItems}
      />
    </div>
  );
}
