import React from "react";
import Navbar2 from "../Navbar2";
import LeftPanel2 from "../LeftPanel2";

const AdminLayout = ({ children }) => {
  return (
    <>
      <Navbar2 />
      <LeftPanel2 />
      {children}
    </>
  );
};

export default AdminLayout;
