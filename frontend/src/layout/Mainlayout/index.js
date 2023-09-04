import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Customization from "../Customization";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
        <Customization />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
