import React, { useState } from "react";
import { useGlobalContext } from "../utilities/Context";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const {updateConditionFn}=useGlobalContext()
  const navigate = useNavigate()
  const currentLoggedInUser = JSON.parse(
    localStorage.getItem("peopleSignedUp") || "[]"
  )?.find(
    (user) =>
      user.password ===
      JSON.parse(localStorage.getItem("loggedUser") || "{}").password
  );
    const [finalInfo, setFinalInfo] = useState({
      name: '',
      address: ''
    })
    const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setFinalInfo({
        ...finalInfo,
        [name]: value
      })
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      const newOrder = {...finalInfo,
        id: new Date().getTime().toString(),
        amount: currentLoggedInUser?.totalAmount,
        cost: parseFloat(
          (currentLoggedInUser?.totalCost + 59.99).toFixed(2)
        ),
        date: `${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`
      }
      var orderList = JSON.parse(localStorage.getItem('orderList')||"[]")
      orderList.push(newOrder)
      localStorage.setItem('orderList', JSON.stringify(orderList))
      updateConditionFn()
      var users = JSON.parse(localStorage.getItem('peopleSignedUp')||"[]")
      users = users.map((user)=>{
        if (user.password === currentLoggedInUser?.password) {
          user.userCart = []
        }
          return user
      })
      localStorage.setItem('peopleSignedUp', JSON.stringify(users))
      navigate('/orders')
    }
  return (
    <article className="container">
      <div class="row row-cols-1 row-cols-md-2 g-3 align-items-center">
        <div className="col">
          <div className="login-form">
            <form
              className="card"
              style={{
                border: "none",
                boxShadow: "none",
                marginInline: "auto",
              }}
            >
              <h1 className="mb-4">Shipping Info</h1>
              <div className="mb-4">
                <label forHTML="name" className="form-label">
                  First Name
                </label>
                <input
                value={finalInfo.name}
                onChange={handleChange}
                  name="name"
                  type="text"
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="mb-4">
                <label forHTML="address" className="form-label">
                  Address
                </label>
                <input
                value={finalInfo.address}
                onChange={handleChange}
                  name="address"
                  type="text"
                  id="address"
                  className="form-control mb-3"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col">
          <div className="col" style={{ marginInline: "auto" }}>
            <div className="bottom-info d-grid">
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
                  <p className="m-0 e-small">${currentLoggedInUser?.totalCost}</p>
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
                  <p className="m-0">${parseFloat(
                      (currentLoggedInUser?.totalCost + 59.99).toFixed(2)
                    )}</p>
                </div>
              </div>
              <div className="d-grid mb-4">
                <button
                onClick={handleSubmit}
                type="button"
                className="btn cts btn-success mt-3 mb-2">
                  PLACE YOUR ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Checkout;
