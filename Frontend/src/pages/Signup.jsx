import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const appURL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${appURL}/auth/signup`, {
          name,
          email,
          password,
        })
        .then((response) => {
          setMessage(response.data.message);
        });
    } catch (error) {
      if (error.response && error.response.data) {
        console.log();

        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong");
        console.error("There was an error signing up:", error);
      }
    }
  };

  return (
    <>
      <section id="signup">
        <div className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <h2>Create New Account !!!</h2>
              <p>{message}</p>
              <form onSubmit={handleSubmit} method="post">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={handleInputChange}
                />

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={handleInputChange}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={handleInputChange}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-success form-control mt-2"
                />
              </form>
              <hr />
              <span>Already registered</span>
              <Link to="/auth/login">
                <button className="btn btn-warning loginbtn form-control">
                  Login
                </button>
              </Link>
            </div>
            <div className="col-md-4" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
