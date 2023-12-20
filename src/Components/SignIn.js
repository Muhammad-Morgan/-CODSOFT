import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGlobalContext } from "../utilities/Context";
const SignIn = () => {
  const navigate = useNavigate();
  const {
    wrongCredt,
    noUsersAtAll,
    notFilledAll,
    signedIn,
    updateConditionFn,
  } = useGlobalContext();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    var peopleSignedUp = localStorage.getItem("peopleSignedUp");
    if (peopleSignedUp !== null) {
      if (user.email !== "" && user.password !== "") {
        var currentUser = JSON.parse(peopleSignedUp).find(
          (item) => item.password === user.password
        );
        if (currentUser) {
          localStorage.setItem("loggedUser", JSON.stringify(currentUser));
          localStorage.setItem("isUserLogged", JSON.stringify(true));
          signedIn();
          updateConditionFn();
          navigate("/");
        } else {
          wrongCredt();
        }
      }
      if (user.email === "" && user.password === "") {
        notFilledAll();
      }
    }
    if (peopleSignedUp === null) {
      noUsersAtAll();
    }
  };
  return (
    <article className="container">
      <div className="login-form">
        <form
          onSubmit={handleSubmit}
          className="card p-3 mb-4"
          style={{
            boxShadow: "1px 3px 3px rgba(0, 0, 0, .3)",
            maxWidth: "500px",
            marginInline: "auto",
          }}
        >
          <h1 className="text-center">Sign In</h1>
          <div className="card-body">
            <div className="mb-4">
              <label forHTML="email" className="form-label">
                email
              </label>
              <input
                value={user.email}
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="mb-4">
              <label forHTML="password" className="form-label">
                Password
              </label>
              <input
                value={user.password}
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                className="form-control mb-3"
              />
              <div id="passwordHelpBlock mb-4" className="form-text">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </div>
            </div>
            <div className="d-grid gap-2 mb-4">
              <button className="btn cts btn-success mt-3 mb-2" type="submit">
                Log In
              </button>
              <Link to="/signup" className="btn cts btn-primary mt-3 mb-4">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </article>
  );
};

export default SignIn;
