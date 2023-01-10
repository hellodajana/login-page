import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogOut = (e) => {
    navigate("/");
  };

  const resolveAfter1Seconds = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(navigate("/"));
      }, 1000);
    });
  };

  const handleRemoveAccount = async () => {
    setIsDeleted(true);
    localStorage.removeItem("token");
    const result = await resolveAfter1Seconds();
    console.log(result);
  };

  return (
    <section className="home">
      <h1 className="title">Home Page</h1>
      <div className="home__container">
        <p className="home__text">Welcome!</p>
        <p className="home__text">
          If you're here it means I did something right, yay! <br />
        </p>
        <p className="home__text">
          If you want to see other awesome things I did, click{" "}
          <a className="link" href="https://hellodajana.com">
            here
          </a>{" "}
          .
        </p>

        <div className="btns">
          <button className="btn home__btn" onClick={handleLogOut}>
            Logout
          </button>
          {!isDeleted ? (
            <button className="btn home__btn" onClick={handleRemoveAccount}>
              Delete my account
            </button>
          ) : (
            <button className="btn home__btn" onClick={handleRemoveAccount}>
              Deleting...
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
