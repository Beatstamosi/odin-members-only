import { useState, useEffect } from "react";
import style from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    if (password === confirmPassword && password && confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);

  const navigate = useNavigate();

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        resetForm();
        navigate("/login");
      } else {
        console.error("Failed to sign up user", data.error);
      }
    } catch (err) {
      console.error("Error signing up user:", err);
    }
  };

  return (
    <div className={style.pageWrapper}>
      <form
        onSubmit={onFormSubmit}
        className={style.formContainer}
        aria-label="Sign up form"
      >
        <h1>Sign Up</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          aria-label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          aria-label="Confirm Password"
          aria-describedby={!passwordMatch ? "passwordHelp" : undefined}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {!passwordMatch && (
          <p
            id="passwordHelp"
            className={style.passwordMatchWarning}
            role="alert"
          >
            Passwords need to match.
          </p>
        )}

        <button
          type="submit"
          disabled={!passwordMatch}
          className={!passwordMatch ? style.btnDisabled : style.btnActive}
          aria-disabled={!passwordMatch}
          aria-label="Submit sign up form"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
