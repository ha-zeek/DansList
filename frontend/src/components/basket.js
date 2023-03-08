export default function Basket({ onAdd, onRemove, cartItems }) {
  // const { cartItems, onAdd, onRemove } = props;
  const loaded = () => {
    console.log(cartItems);
    const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 1);
    console.log(itemsPrice);
    const taxPrice = itemsPrice * 0.14;
    const shippingPrice = itemsPrice > 200 ? 0 : 5;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;
    return (
      <div>
        <br />
        <h1 className="basket fw-bolder">Shopping Basket</h1>
        <div>
          {cartItems.length === 0 && (
            <div className="cartStatus fw-bold fs-3">Cart Is Empty</div>
          )}
        </div>
        {cartItems.map((item) => (
          <div key={item._id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button
                onClick={() => onAdd(item)}
                type="button"
                class="btn btn-success">
                +
              </button>
              <button
                onClick={() => onRemove(item)}
                type="button"
                class="btn btn-danger">
                -
              </button>
            </div>
            <div className="col-2 text-right">
              {item.qty} x RM{Number(item.price)}
            </div>
          </div>
        ))}
        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">
                RM{itemsPrice ? itemsPrice.toFixed(2) : 0.0}
              </div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">RM{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                RM{shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">RM{totalPrice.toFixed(2)}</div>
            </div>
            <hr />
            <div className="row">
              <button
                onClick={() => alert("Checked Out. Thank you.")}
                type="button"
                class="btn btn-warning">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  const unloaded = () => {
    return (
      <div>
        <br />
        <br />
        <h1>Shopping Cart is Empty</h1>
      </div>
    );
  };
  return cartItems.length ? loaded() : unloaded();
}
