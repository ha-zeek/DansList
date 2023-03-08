import { useState } from "react";

export default function AddListing({ addProduct }) {
  const [newForm, setNewForm] = useState({
    name: "",
    image: "",
    price: 0,
    count: 0,
    description: "",
    seller: "",
  });

  const handleChange = (event) => {
    const value = { ...newForm, [event.target.name]: event.target.value };
    setNewForm(value);
    console.log(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addProduct(newForm);
    setNewForm({
      name: "",
      image: "",
      price: 0,
      count: 0,
      description: "",
      seller: "",
    });
  };

  // const myFunction = () => {
  //   var x = document.getElementById("addEntry");
  //   if (x.style.display === "none") {
  //     x.style.display = "block";
  //   } else {
  //     x.style.display = "none";
  //   }
  // };
  return (
    <div>
      <div id="addEntry" className="mb-3">
        <section className="form-style">
          <form onSubmit={handleSubmit}>
            <br />
            <label for="formGroupExampleInput" class="form-label">
              Product Name:
            </label>
            <input
              type="text"
              name="name"
              value={newForm.name}
              placeholder="product name"
              onChange={handleChange}
            />
            <br />
            <label for="formGroupExampleInput" class="form-label">
              Product Image:
            </label>
            <input
              type="text"
              name="image"
              value={newForm.image}
              placeholder="image URL"
              onChange={handleChange}
            />
            <br />
            <label for="formGroupExampleInput" class="form-label">
              Product Price:
            </label>
            <input
              type="number"
              name="price"
              value={newForm.price}
              placeholder="price"
              onChange={handleChange}
            />
            <br />
            <label for="formGroupExampleInput" class="form-label">
              Product Quantity:
            </label>
            <input
              type="number"
              name="count"
              value={newForm.count}
              placeholder="Stock"
              onChange={handleChange}
            />
            <br />
            <label for="formGroupExampleInput" class="form-label">
              Product Description:
            </label>
            <input
              type="text"
              name="description"
              value={newForm.description}
              placeholder="type a description"
              onChange={handleChange}
            />
            <br />
            <label for="formGroupExampleInput" class="form-label">
              Seller Name:
            </label>
            <input
              type="text"
              name="seller"
              value={newForm.seller}
              placeholder="seller name"
              onChange={handleChange}
            />
            <br />
            <button type="submit" className="btn btn-success">
              Create Listing
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
