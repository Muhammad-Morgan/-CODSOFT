import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faCartShopping,
  faBarsStaggered,
  faF,
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../utilities/Context";
const Nav = () => {
  const navigate = useNavigate();
  const [showLinks, setShowLinks] = useState(false);
  const refLinks = useRef(null);
  const refContainer = useRef(null);
  const {
    alert,
    closeAlert,
    isUserLogged,
    loggedInUser,
    updateConditionFn,
    signedOut,
  } = useGlobalContext();
  const currentLoggedInUser = JSON.parse(
    localStorage.getItem("peopleSignedUp") || "[]"
  )?.find(
    (user) =>
      user.password ===
      JSON.parse(localStorage.getItem("loggedUser") || "{}").password
  );
  const logOut = () => {
    localStorage.setItem("loggedUser", "{}");
    localStorage.setItem("isUserLogged", "false");
    updateConditionFn();
    signedOut();
    navigate("/");
  };
  useEffect(() => {
    const linksHeight = refLinks.current.getBoundingClientRect().height;
    if (showLinks) {
      refContainer.current.style.height = `${linksHeight}px`;
    } else {
      refContainer.current.style.height = "0px";
    }
  }, [showLinks]);
  useEffect(() => {
    const getTime = setTimeout(() => {
      closeAlert();
    }, 3000);
    return () => {
      clearTimeout(getTime);
    };
  }, [alert, closeAlert]);
  return (
    <>
      <div
        className={`alert-cs d-flex align-items-center ${
          alert.alertCondition ? "active" : "hidden"
        }`}
        style={{
          width: "fit-content",
          backgroundColor: `${
            alert.alertType === "success" ? "var(--alert-success)" : ""
          }
          ${alert.alertType === "danger" ? "var(--alert-danger)" : ""}
          `,
          color: `${
            alert.alertType === "success" ? "var(--alert-check-success)" : ""
          }
          ${alert.alertType === "danger" ? "var(--alert-check-danger)" : ""}
          `,
          borderColor: `${
            alert.alertType === "success" ? "var(--alert-check-success)" : ""
          }
          ${alert.alertType === "danger" ? "var(--alert-check-danger)" : ""}
          `,
        }}
      >
        {alert.alertType === "success" ? (
          <FontAwesomeIcon className="me-3" icon={faCircleCheck} />
        ) : (
          <FontAwesomeIcon className="me-3" icon={faCircleExclamation} />
        )}
        <div style={{ position: "relative" }}>
          {alert.alertMessage}
          <button
            onClick={closeAlert}
            style={{ color: "var(--alert-check-success)" }}
            className="alert-close-btn"
          >
            <FontAwesomeIcon icon={faXmark} className="alert-close-icon" />
          </button>
        </div>
      </div>
      <nav className="top-nv py-2">
        <div className="container d-flex justify-content-center justify-content-md-end">
          <ul className="d-flex mb-0 gap-3">
            {isUserLogged ? (
              <li>
                <div
                  style={{ textTransform: "capitalize" }}
                  className="top-nv-link"
                >
                  Hello, {loggedInUser.name}!
                </div>
              </li>
            ) : (
              <li>
                <Link to="/signin" className="top-nv-link">
                  Sign In
                </Link>
              </li>
            )}
            {isUserLogged ? (
              <li>
                <button onClick={logOut} className="top-nv-link-bt">
                  Log Out
                </button>
              </li>
            ) : (
              <li>
                <Link to="/signup" className="top-nv-link">
                  Create Account
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <nav className="nv-bg">
        <div className="nav-center">
          <div className="container-fluid nav-center-inside d-flex justify-content-between align-items-center">
            <div className="btn-logo">
              <button
                onClick={() => {
                  setShowLinks(!showLinks);
                }}
                className="st-bar d-md-none"
              >
                <FontAwesomeIcon className="fa-xl" icon={faBarsStaggered} />
              </button>
              <Link className="d-none log d-md-block">
                <FontAwesomeIcon icon={faF} />
              </Link>
            </div>
            <div className="horizontal-links d-none d-md-block">
              <ul className="d-flex mb-0 gap-3">
                <Link className="horizontal-links-li" to="/">
                  Home
                </Link>
                <Link className="horizontal-links-li" to="/about">
                  About
                </Link>
                <Link to="/products" className="horizontal-links-li">
                  Products
                </Link>
                <Link to="/cart" className="horizontal-links-li">
                  Cart
                </Link>
                {isUserLogged && (
                  <Link to="/checkout" className="horizontal-links-li">
                    Checkout
                  </Link>
                )}
                {isUserLogged && (
                  <Link to="/orders" className="horizontal-links-li">
                    Orders
                  </Link>
                )}
              </ul>
            </div>
            <div className="cart-container">
              <Link to="/cart">
                <div className="not-cstm d-flex justify-content-center align-items-center">
                  {currentLoggedInUser?.totalAmount}{" "}
                </div>
                <FontAwesomeIcon
                  className=" cart-container-cstm fa-xl"
                  icon={faCartShopping}
                />
              </Link>
            </div>
          </div>
          <div
            ref={refContainer}
            className={`virtical-links d-md-none d-block`}
          >
            <ul ref={refLinks} className="d-flex flex-column mb-0">
              <Link to="/" className="virtical-links-li">
                Home
              </Link>
              <Link to="/about" className="virtical-links-li">
                About
              </Link>
              <Link to="products" className="virtical-links-li">
                Products
              </Link>
              <Link to="cart" className="virtical-links-li">
                Cart
              </Link>
              {isUserLogged && (
                <Link to="/checkout" className="virtical-links-li">
                  Checkout
                </Link>
              )}
              {isUserLogged && (
                <Link to="/orders" className="virtical-links-li">
                  Orders
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
