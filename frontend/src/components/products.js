import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products, onAdd }) {
  return (
    <div className="productEntry row">
      {products ? (
        products.map((item) => {
          return (
            <div className="col" key={item._id}>
              <br />
              <br />
              <h2 className="productName fw-bolder"> {item.name}</h2>
              <img src={item.image} alt="no image" width={300} height={300} />
              <h2>Price: RM{item.price.toFixed(2)}</h2>
              <h2>Stock: {item.count}</h2>
              <h3>Listed by: {item.seller}</h3>
              <h4>Description: {item.description}</h4>
              <Link to={`/product/${item._id}`}>
                <button type="button" className="btn btn-success">
                  View Item
                </button>
              </Link>
              <br />
              <br />
              <button
                href="/"
                onClick={() => onAdd(item)}
                type="button"
                className="btn btn-success">
                Add to Cart
              </button>
            </div>
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
