import React, { useState, useEffect } from "react";

import HomePage from "./PublicHomePage";
import Purchase from "../components/Purchase";
function Users() {
  return (
    <div>
      <Header />
      <TopNavbar></TopNavbar>
      <Purchase />
    </div>
  );
}

export default Users;
