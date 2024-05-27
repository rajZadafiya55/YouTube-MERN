import { useEffect, useState } from "react";

import "../Css/studio.css";

import Dashboard from "./Studio/Dashboard";

function Studio() {
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    if (theme === false && window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "#F9F9F9";
    } else if (theme === true && window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "rgb(31, 31, 31)";
    }
  }, [theme]);

  return (
    <>
      <div className={theme ? "studio" : "studio studio-light"}>
        <Dashboard />
      </div>
    </>
  );
}

export default Studio;
