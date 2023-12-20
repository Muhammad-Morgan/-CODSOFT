import React from "react";
import { useGlobalContext } from "../utilities/Context";
import { Link } from "react-router-dom";

const Cart = () => {
  const currentLoggedInUser = JSON.parse(
    localStorage.getItem("peopleSignedUp") || "[]"
  )?.find(
    (user) =>
      user.password ===
      JSON.parse(localStorage.getItem("loggedUser") || "{}").password
  );
  const { isUserLogged, updateConditionFn } = useGlobalContext();
  const [temp, setTemp] = React.useState("");
  const handleChange = (e) => {
    setTemp(e.target.value);
  };
  const handleClick = (id) => {
    var users = JSON.parse(localStorage.getItem("peopleSignedUp") || "[]")?.map(
      (user) => {
        if (currentLoggedInUser.password === user.password) {
          user.userCart = user.userCart.map((item) => {
            if (item.id === id) {
              item.amount = temp;
            }
            return item;
          });
        }
        return user;
      }
    );
    localStorage.setItem("peopleSignedUp", JSON.stringify(users));
    updateConditionFn();
  };
  const removeItem = (id) => {
    var users = JSON.parse(localStorage.getItem("peopleSignedUp") || "[]")?.map(
      (user) => {
        if (currentLoggedInUser.password === user.password) {
          user.userCart = user.userCart.filter((item) => item.id !== id);
        }
        return user;
      }
    );
    localStorage.setItem("peopleSignedUp", JSON.stringify(users));
    updateConditionFn();
  };
  return (
    <article className="container sell">
      <div className="my-0">
        <h1>Shopping Cart</h1>
        <hr className="my-0 mb-4" />
      </div>
      {currentLoggedInUser?.userCart?.length >= 1 ? (
        <div className="row row-cols-1 row-cols-md-2">
          {currentLoggedInUser?.userCart.map((item) => {
            const { id, amount, img, name, model, price } = item;
            return (
              <div key={id} className="col">
                <div
                  className="card sel mb-2"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <div className="row row-cols-1 row-cols-md-4 align-items-start">
                    <div className="col">
                      <img className="im-fl" src={img} alt={name} />
                    </div>
                    <div className="col">
                      <h4>{name}</h4>
                      <span>{model}</span>
                    </div>
                    <div className="col">
                      <p>Amount: {amount}</p>
                      <select
                        value={amount}
                        onChange={handleChange}
                        className="drop-down-cstm-btn-cart d-flex justify-content-end dps col-7"
                      >
                        <option className="option" value="">
                          0
                        </option>
                        <option className="option" value="1">
                          1
                        </option>
                        <option className="option" value="2">
                          2
                        </option>
                        <option className="option" value="3">
                          3
                        </option>
                        <option className="option" value="4">
                          4
                        </option>
                        <option className="option" value="5">
                          5
                        </option>
                        <option className="option" value="6">
                          6
                        </option>
                        <option className="option" value="7">
                          7
                        </option>
                        <option className="option" value="8">
                          8
                        </option>
                        <option className="option" value="9">
                          9
                        </option>
                        <option className="option" value="10">
                          10
                        </option>
                        <option className="option" value="11">
                          11
                        </option>
                        <option className="option" value="12">
                          12
                        </option>
                        <option className="option" value="13">
                          13
                        </option>
                        <option className="option" value="14">
                          14
                        </option>
                        <option className="option" value="15">
                          15
                        </option>
                        <option className="option" value="16">
                          16
                        </option>
                        <option className="option" value="17">
                          17
                        </option>
                        <option className="option" value="18">
                          18
                        </option>
                        <option className="option" value="19">
                          19
                        </option>
                        <option className="option" value="20">
                          20
                        </option>
                      </select>
                      <div class="btns-remove-add d-flex flex-md-column align-items-md-start justify-content-between align-items-center">
                        <button
                          onClick={() => removeItem(id)}
                          className="cstm-rem d-flex"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleClick(id)}
                          className="btn btn-sm btn-success"
                          style={{ fontSize: ".7rem" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="col">
                      <h6>${price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="col" style={{ marginInline: "auto" }}>
            <div className="bottom-info">
              <div
                className="card p-4 box-bg"
                style={{
                  marginInline: "auto",
                  backgroundColor: "var(--navbar-color)",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <div className="subtotal mb-2 d-flex justify-content-between">
                  <span className="m-0 small">Subtotal</span>
                  <p className="m-0 e-small">
                    ${currentLoggedInUser?.totalCost}
                  </p>
                </div>
                <hr className="m-0" />
                <div className="shipping mb-2 mt-2 d-flex justify-content-between">
                  <span className="m-0 small">Shipping</span>
                  <p className="m-0 e-small">$50</p>
                </div>
                <hr className="m-0" />
                <div className="tax mb-2 mt-2 d-flex justify-content-between">
                  <span className="m-0 small">Tax</span>
                  <p className="m-0 e-small">$9.99</p>
                </div>
                <hr className="m-0" />
                <div className="total mt-3 d-flex justify-content-between">
                  <span className="m-0">Order Total</span>
                  <p className="m-0">
                    $
                    {parseFloat(
                      (currentLoggedInUser?.totalCost + 59.99).toFixed(2)
                    )}
                  </p>
                </div>
              </div>
              <div className="d-grid">
                {isUserLogged ? (
                  <Link to="/checkout" className="btn colo btn-primary my-4">
                    Proceed To Check Out
                  </Link>
                ) : (
                  <Link to="/signin" className="btn colo btn-primary my-4">
                    Please Log In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="d-flex align-items-center justify-content-center mt-4">
          Your Cart's Empty!
        </h1>
      )}
    </article>
  );
};

export default Cart;
