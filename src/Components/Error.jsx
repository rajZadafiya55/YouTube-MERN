import errorImg from "../img/error.png";
import "../Css/error.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    // Redirect to the home page after a short delay
    const timer = setTimeout(() => {
      navigate("/");
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <>
      <div className={theme ? "error-page" : "error-page light-mode"}>
        <div className="top-error">
          <img src={errorImg} alt="NOT FOUND" className="error_img" />
        </div>
        <div className="bottom-error">
          <h1>Oops!</h1>
          <p>Sorry, we&apos;re not able to find what you were looking for.</p>
          <button
            className={
              theme ? "revert-home" : "revert-home text-light-mode error-light"
            }
            onClick={() => navigate("/")}
          >
            GO TO HOMEPAGE
          </button>
        </div>
      </div>
    </>
  );
}

export default Error;
