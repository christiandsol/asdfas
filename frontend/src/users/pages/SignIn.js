import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useContext } from "react";

function SignIn() {
  const { setLoggedIn } = useContext(AuthContext);
  const [failedAttempt, setFailedAttempt] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const information = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:5001/api/user/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: responseData.userId,
            token: responseData.token,
          })
        );
        setLoggedIn(true);
        navigate("/private-page");
      } else {
        setFailedAttempt(true);
        console.log("failure");
      }
    } catch (error) {
      setFailedAttempt(true);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Sign In" />
      </form>
      {failedAttempt && <h2>Invalid login credentials</h2>}
      <p>Don't have an account? Sign up:</p>
      <a href="/sign-up">Here</a>
    </>
  );
}

export default SignIn;
