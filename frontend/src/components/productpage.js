import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function ProductPage({ products, onAdd }) {
  const { id } = useParams();
  const productObj = products.find((item) => item._id == id);
  console.log(products);
  return (
    <div className="productEntry">
      {products.map((product) => {
        if (product._id == id) {
          return (
            <div key={product._id}>
              <h1 className="productName fw-bolder">
                Product Name: {product.name}
              </h1>
              <img
                src={product.image}
                alt="no image"
                width={400}
                height={400}
              />
              <h2>Price: RM{product.price}</h2>
              <h3>Stock: {product.count}</h3>
              <h4>Listed By: {product.seller}</h4>
              <br />
              <h5 className="fs-5">Description</h5>
              <p className="fs-4">{product.description}</p>
            </div>
          );
        }
      })}
      <Link to={"/"}>
        <button type="button" className="btn btn-success">
          Back
        </button>
      </Link>
      <br />
      <br />
      <button
        onClick={() => onAdd(productObj)}
        type="button"
        className="btn btn-success"
      >
        Add to Cart
      </button>
    </div>
  );
}
