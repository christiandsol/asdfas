import { useCallback, useContext } from "react";
import { AuthContext } from "../../users/components/AuthProvider";
import { useNavigate } from "react-router-dom";
function NewDecor({ onAddDecor }) {
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    const information = {
      title: e.target.title.value,
      description: e.target.description.value,
      url: e.target.url.value,
      price: e.target.price.value,
      image: e.target.image.value,
    };
    try {
      const token = JSON.parse(localStorage.getItem("userData")).token;
      const response = await fetch("http://localhost:5001/api/decor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(information),
      });
      if (response.ok) {
        onAddDecor((prevDecorItems) => [...prevDecorItems, information]);
        navigate("/private-page");
      }
    } catch (error) {
      console.log("error");
    }
  };

  if (loggedIn) {
    return (
      <form onSubmit={submitHandler}>
        <input type="text" name="title" placeholder="title"></input>
        <input type="text" name="description" placeholder="description"></input>
        <input type="url" name="url" placeholder="link to item"></input>
        <input type="number" name="price" placeholder="price"></input>
        <input type="url" name="image" placeholder="image"></input>
        <input type="submit"></input>
      </form>
    );
  } else {
    return <h1>Not logged in, can't access page</h1>;
  }
}
export default NewDecor;
