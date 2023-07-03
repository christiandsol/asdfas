import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import TopNavbar from "../components/TopNavBar";
import Purchase from "../components/Purchase";
import "./PublicHomePage.css";
function PublicHomePage() {
  return (
    <div>
      <Header />
      {/* <TopNavbar></TopNavbar> */}
      <div>
        <h1 className="welcome">
          Welcome to the Application, please sign in to continue
        </h1>
      </div>
    </div>
  );
}

export default PublicHomePage;
