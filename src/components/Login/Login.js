import { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const inputCheck = () => {
    const check = /[a-zA-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,8}(.[a-z{2.8}])?/g;
    if (!data.email || !check.test(data.email)) {
      setErrorMsg("Email is not valid");
    } else {
      setErrorMsg("");
    }

    if (!data.email && !data.password) {
      setErrorMsg("Please type in email and password");
    } else if (!data.password) {
      setErrorMsg("Password is not valid");
    } else {
      setErrorMsg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);

    const user = { ...data };
    setIsPending(true);

    axios
      .post("url", {
        user,
      })
      .then(() => {
        navigate("/home");
        console.log("Success!");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const user = { ...data };
    user[e.target.id] = e.target.value;
    setData(user);
    console.log(user);
  };

  return (
    <section className="login">
      <h1 className="title">Login</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="email">
          Email
        </label>
        <input
          className="login__input"
          type="email"
          id="email"
          name="email"
          required
          value={data.email}
          onChange={(e) => handleChange(e)}
        />
        <label className="login__label" htmlFor="password">
          Password
        </label>
        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={data.password}
          onChange={(e) => handleChange(e)}
        />
        {!isPending ? (
          <button onClick={inputCheck} className="btn login__btn">
            Login
          </button>
        ) : (
          <button disabled className="btn login__btn">
            Loading ...
          </button>
        )}
        <p className="login__error">{errorMsg}</p>
      </form>
    </section>
  );
};

export default Login;
