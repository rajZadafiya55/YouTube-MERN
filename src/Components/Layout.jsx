import React from "react";
import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <LeftPanel />
      {children}
    </> 
  );
};

export default Layout;
