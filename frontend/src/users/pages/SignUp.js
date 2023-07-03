import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useContext } from "react";

function SignUp() {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const [failedAttempt, setFailedAttempt] = useState(false);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const information = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(information);
    if (loggedIn) {
    } else {
      try {
        fetch("http://localhost:5001/api/user/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(information),
        }).then((response) => {
          if (response.ok) {
            const responseData = response.json();
            localStorage.setItem("token", response.token);
            setLoggedIn(true);
            navigate("/private-page");
          } else {
            setFailedAttempt(true);
            console.log("failure");
          }
        });
      } catch (error) {
        setFailedAttempt(true);
      }
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" name="username" placeholder="username"></input>
        <input type="email" name="email" placeholder="email"></input>
        <input type="password" name="password" placeholder="password"></input>
        <input type="submit"></input>
      </form>
      <p>Don't have an account, sign up:</p>
      <a href="/sign-up">Here</a>
      {failedAttempt && (
        <h2>
          Invalid inputs, makes sure password is longer than 8 characters and
          email is valid
        </h2>
      )}
    </>
  );
}

export default SignUp;
