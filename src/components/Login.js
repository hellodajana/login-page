import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  };

  return (
    <section className="login">
      <h1 className="login__title">Login</h1>
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
        <button className="btn">Login</button>
        <p className="login__error"></p>
      </form>
    </section>
  );
};

export default Login;
