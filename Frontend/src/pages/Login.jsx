import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const appURL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(
          `${appURL}/auth/login`,
          {
            email,
            password,
          }
          // { withCredentials: true } //Include cookies in the request
        )
        .then((response) => {
          setMessage(response.data.message);
          console.log("from login Before save", response.data.token);

          localStorage.setItem("token", response.data.token);
          console.log("from login after save", localStorage.getItem("token"));
        })
        .then(() => {
          navigate("/dashboard");
        });
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong");
        console.error("There was an error loggin in:", error);
      }
    }
  };

  return (
    <>
      <section id="login">
        <div className="container">
          <div className="row">
            <div className="col-md-4" />
            <div className="col-md-4">
              <h2>Login Here !!!</h2>
              <p>{message}</p>
              <form onSubmit={handleSubmit} method="post">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  key="email"
                  value={email}
                  onChange={handleInputChange}
                />
                <label htmlFor="pass">Password</label>
                <input
                  type="password"
                  name="password"
                  key="password"
                  className="form-control"
                  value={password}
                  onChange={handleInputChange}
                />
                <input
                  type="submit"
                  defaultValue="Submit"
                  className="form-control btn btn-success"
                />
              </form>
              <hr />
              <Link to="/auth/signup">
                <button className="btn btn-warning form-control">
                  Create New Account
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

export default Login;
