import "../Css/trending.css";
import { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import BasicTabs from "./Channel/BasicTabs";

function Trending() {
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  document.title = "Trending - YouTube";

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  return (
    <>

      <BasicTabs />
    </>
  );
}

export default Trending;
