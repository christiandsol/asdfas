import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicHomePage from "../users/pages/PublicHomePage";
import NewDecor from "../decor/pages/NewDecor";
import SignIn from "../users/pages/SignIn";
import SignUp from "../users/pages/SignUp";
import PrivateHomePage from "../users/pages/PrivateHomePage";

function App() {
  const [decorItems, setDecorItems] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHomePage />} />
        <Route
          path="/decor/new"
          element={<NewDecor onAddDecor={setDecorItems} />}
        />{" "}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* {failedAttempt && <FailedAttemptComponent />} */}
        <Route
          path="/private-page"
          element={<PrivateHomePage decorItems={decorItems} />}
        />{" "}
        <Route path="*" element={<PublicHomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
