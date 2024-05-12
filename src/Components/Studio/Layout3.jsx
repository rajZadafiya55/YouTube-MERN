import React from "react";
import Navbar2 from "../Navbar2";
import LeftPanel3 from "../LeftPanel3";

const Layout3 = ({ children }) => {
  return (
    <>
      <Navbar2 />
      <LeftPanel3 />
      {children}
    </>
  );
};

export default Layout3;
