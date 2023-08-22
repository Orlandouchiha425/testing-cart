import React from "react";
import LineItem from "../components/Cart/LineItem";
function NavModal({ handleChangeQty, orders, handleCheckOut }) {
  if (!orders) return null;
  //im fetching LineItem from LineItems component/route> i pushed it to LineItem. the reason this is done is because i passed orderss props
  //orderss is the cart, which comes from Car.jsx located at ../components/Cart/Cart. that pops getCart
  //ordersSchema.statics.getCart = function (userId) {
  // 'this' is the orders model
  // return this.findOneAndUpdate(
  // query
  // { user: userId, isPaid: false },
  // update
  // { user: userId },
  // upsert option will create the doc if
  // it doesn't exist
  //     { upsert: true, new: true }
  //   );
  // };
  //so we passed props orders so i can use orders.isPaid

  const lineItems = orders.lineItems.map((item) => (
    <LineItem
      lineItem={item}
      isPaid={orders.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  ));
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Cart Items
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Shopping Cart
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {orders.isPaid ? (
                <span>
                  orders <span className="smaller">{orders.ordersId}</span>
                </span>
              ) : (
                <span>NEW orders</span>
              )}
              <span>{new Date(orders.updatedAt).toLocaleDateString()}</span>
            </div>
            <div>
              {lineItems.length ? (
                <>
                  {lineItems}
                  <section>
                    {orders.isPaid ? (
                      <span>TOTAL&nbsp;&nbsp;</span>
                    ) : (
                      <button
                        className="btn-sm"
                        onClick={handleCheckOut}
                        disabled={!lineItems.length}
                      >
                        CHECKOUT
                      </button>
                    )}
                    <span>{orders.totalQty}</span>
                    <span>${orders.ordersTotal.toFixed(2)}</span>
                  </section>
                </>
              ) : (
                <div>Add games to your cart</div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavModal;
