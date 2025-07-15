import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./Login.module.css";
import { useAuth } from "../useAuth.tsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const { fetchUser } = useAuth();

  const navigate = useNavigate();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
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
        await fetchUser();
        navigate("/");
      } else {
        setLoginFailed(true);
        console.error("Failed to login user", data.error);
      }
    } catch (err) {
      console.error("Error logging in user:", err);
    }
  };

  return (
    <div className={style.pageWrapper}>
      <h1>Login</h1>
      {loginFailed ? <p>Username or password is wrong</p> : null}
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={!username || !password}
          className={
            !username || !password ? style.btnDisabled : style.btnActive
          }
        >
          Log In
        </button>
        <p>
          If you do not have an account yet,{" "}
          <Link to="/sign-up">sign up here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
