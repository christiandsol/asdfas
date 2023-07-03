import React, { useState, useEffect, useContext } from "react";

import Header from "../components/Header";
import TopNavbar from "../components/TopNavBar";
import { AuthContext } from "../components/AuthProvider";
import "../components/Card.css";
import "./PrivateHomePage.css";

function PrivateHomePage() {
  const { loggedIn } = useContext(AuthContext);
  const [decorItems, setDecorItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        const fetchedDecorItems = await getDecors(storedData.userId);
        setDecorItems(fetchedDecorItems);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (index) => {
    if (expandedCardIndex === index) {
      setExpandedCardIndex(null); // Hide the expanded card if clicked again
    } else {
      setExpandedCardIndex(index); // Show the clicked card
    }
  };

  if (loggedIn) {
    return (
      <div>
        <Header loggedIn="true" />
        {/* <TopNavbar></TopNavbar> */}
        <div className="card-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : decorItems && decorItems.length > 0 ? (
            decorItems.map((item, index) => {
              if (item) {
                const isExpanded = expandedCardIndex === index;
                return (
                  <div
                    key={index}
                    className={`card ${isExpanded ? "expanded" : ""}`}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="card-img">
                      <img
                        className="card-img"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                    <div className="card-title-holder">
                      <h2 className="card-title">{item.title}</h2>
                    </div>
                    <div
                      className={`card-text ${isExpanded ? "expanded" : ""}`}
                    >
                      <p className="description">{item.description}</p>
                      <a href={item.url} className="link">
                        Link
                      </a>
                      <p>Price: {item.price}</p>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>No decor items found.</p>
          )}
        </div>
      </div>
    );
  } else {
    return <h1>Not logged in, can't access page</h1>;
  }
}

const getDecors = async (userId) => {
  const response = await fetch(`http://localhost:5001/api/user/${userId}`);
  const data = await response.json();
  const decors = data.decors;
  let decorItems = [];
  for (let i = 0; i < decors.length; i++) {
    const id = await fetch(`http://localhost:5001/api/decor/${decors[i]}`);
    let data = await id.json();
    console.log("data after this");
    console.log(data);
    decorItems = decorItems.concat(data.decors);
  }
  return decorItems;
};

export default PrivateHomePage;
