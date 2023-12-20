import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../utilities/Context";
const Signup = () => {
  const { unmatchingPassword, notFilledAll, signedUp, updateConditionFn } =
    useGlobalContext();
  const navigate = useNavigate();
  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (
      person.name !== "" &&
      person.email !== "" &&
      person.password !== "" &&
      person.confirmPassword !== "" &&
      person.password === person.confirmPassword
    ) {
      const newPerson = {
        ...person,
        id: new Date().getTime().toString(),
        totalAmount: 0,
        totalCost: 0,
        userCart: [],
      };
      var peopleSignedUp = JSON.parse(
        localStorage.getItem("peopleSignedUp") || "[]"
      );
      peopleSignedUp.push(newPerson);
      localStorage.setItem("peopleSignedUp", JSON.stringify(peopleSignedUp));
      signedUp();
      updateConditionFn();
      navigate("/signin");
    }
    if (
      person.name !== "" &&
      person.email !== "" &&
      person.password !== "" &&
      person.confirmPassword !== "" &&
      person.password !== person.confirmPassword
    ) {
      var confPass = document.querySelector("#confirmPassword");
      confPass.style.borderColor = "var(--alert-check-danger)";
      unmatchingPassword();
    }
    if (
      person.name === "" ||
      person.email === "" ||
      person.password === "" ||
      person.confirmPassword === ""
    ) {
      notFilledAll();
    }
  };
  return (
    <article className="container">
      <div className="login-form d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleClick}
          className="card mb-4"
          style={{
            boxShadow: "1px 3px 3px rgba(0, 0, 0, .3)",
            maxWidth: "500px",
          }}
        >
          <h1 className="text-center mt-3">Sign Up</h1>
          <div className="card-body">
            <div className="mb-3">
              <label forHTML="name" className="form-label">
                name
              </label>
              <input
                value={person.name}
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label forHTML="email" className="form-label">
                email
              </label>
              <input
                value={person.email}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label forHTML="password" className="form-label">
                Password
              </label>
              <input
                value={person.password}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                className="form-control mb-3"
              />
              <label forHTML="confirmPassword" className="form-label">
                confirm Password
              </label>
              <input
                value={person.confirmPassword}
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control mb-3"
              />
              <div id="passwordHelpBlock mb-4" className="form-text">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji. The 2 password must be matching.
              </div>
            </div>
            <div className="d-grid gap-2">
              <button className="btn cts btn-primary mt-3 mb-4" type="submit">
                Sign Up
              </button>
              <div>
                <p>
                  Already a member?{" "}
                  <Link to="/signin" className="btn ms-3 btn-outline-primary">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Signup;
