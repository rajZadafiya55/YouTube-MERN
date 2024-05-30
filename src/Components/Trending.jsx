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
      <h1>Raj Zadafiya</h1>
      <h1>Raj Zadafiya</h1>
      <h1>Raj Zadafiya</h1>
      <h1>Raj Zadafiya</h1>
      <h1>Raj Zadafiya</h1>
      <h1>Raj Zadafiya</h1>
      <h1>Raj Zadafiya</h1>
      <h1>raviiiiiiiiiiiiiiiiiii senjaliya ravi ravi ravi</h1>
      <h1> raj raj rajraj raj raj rajraj raj</h1>
      <h1>30-5 ravi senjaliya 1st</h1>
    </>
  );
}

export default Trending;
