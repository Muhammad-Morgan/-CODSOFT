import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../utilities/Context";
const SingleProduct = () => {
  const { allProducts, isUserLogged, updateConditionFn, loginCart } =
    useGlobalContext();
  const [condC, setConditionC] = useState(false);
  const [amount, setAmount] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const singleproduct = allProducts.find(
    (product) => product.id === parseInt(id)
  );
  const handleClick = (e) => {
    e.preventDefault();
    if (isUserLogged !== true) {
      setConditionC(true);
      loginCart();
    } else {
      setConditionC(false);
      const item = { ...singleproduct, amount };
      var signedUsers = JSON.parse(
        localStorage.getItem("peopleSignedUp") || "[]"
      );
      var signedUser = JSON.parse(localStorage.getItem("loggedUser") || "{}");
      signedUsers = signedUsers.map((user) => {
        if (user.password === signedUser.password) {
          var userCart = [];
          userCart = [...userCart, item];
          var uniqueCart = [
            ...userCart
              .reduce((map, obj) => map.set(obj.id, obj), new Map())
              .values(),
          ];
          user.userCart = uniqueCart;
        }
        return user;
      });
      localStorage.setItem("peopleSignedUp", JSON.stringify(signedUsers));
      updateConditionFn();
      navigate("/cart");
    }
  };
  return (
    <article className="container">
      <div className="horizontal-links-angle mb-3 d-flex align-items-center gap-2 mt-0">
        <Link className="horizon-link" to="/">
          Home
        </Link>
        <FontAwesomeIcon icon={faAngleRight} />
        <Link className="horizon-link" to="/products">
          Products
        </Link>
      </div>
      <div
        className="card cst-card ps-4 mb-3"
        style={{
          boxShadow: "none",
          border: "none",
        }}
      >
        <div className="row row-cols-1 row-cols-md-2 align-items-center">
          <div className="img-singleproduct-container mb-3 col">
            <img
              className="img-fluid"
              src={singleproduct.img}
              alt={singleproduct.name}
            />
          </div>
          <div className="card-body col">
            <div className="text-pro-con">
              <h2 className="mb-3">{singleproduct.name}</h2>
              <span className="gray-comp d-block">{singleproduct.model}</span>
              <h4>${singleproduct.price}</h4>
              <p>{singleproduct.desc}</p>
            </div>
            <div className="dropdown d-flex flex-column mb-3">
              <h5 style={{ color: "var(--text-color)" }} className="mb-3">
                Amount
              </h5>
              <select
                className="drop-down-cstm-btn d-flex justify-content-end"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
            </div>
            <button onClick={handleClick} className="btn btn-success">
              ADD TO BAG
            </button>
            {condC && (
              <Link to="/signin" className="btn ms-3 btn-primary">
                LOG IN
              </Link>
            )}{" "}
          </div>
        </div>
      </div>
    </article>
  );
};

export default SingleProduct;
