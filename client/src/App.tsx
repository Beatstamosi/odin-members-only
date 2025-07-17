import { Link } from "react-router-dom";
import { useAuth } from "./components//Authentication/useAuth.jsx";
import LogOut from "./components/Authentication/LogOut/LogOut.jsx";
import { useEffect, useState } from "react";
import type { Message } from "./components/Authentication/types/Messages.js";
import style from "./App.module.css";
import DisplayMessage from "./components/DisplayMessage/displayMessage.js";

function App() {
  const { user, loading, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>();

  // useEffect to fetch messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/messages/get-all`
        );

        const data = await res.json();

        if (res.ok) {
          setMessages(data.messages);
        } else {
          console.error("Error fetching messages: ", data.error);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(`Error fetching messages: ${err}`);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  // navbar either login or create Message & Become Member // if member button become admin
  // display messages via component; map through messages // pass user as props

  return (
    <>
      <div className={style.navBarWrapper}>
        <div>
          <h2>{user?.email || "No user found"}</h2>
        </div>
        <div className={style.navBarRightPart}>
          {!isAuthenticated && <Link to="/login">Log In</Link>}

          {isAuthenticated && (
            <>
              <button className={style.btnClassic}>Create Message</button>

              {!user?.member && (
                <button className={style.btnClassic}>Become a Member</button>
              )}

              {user?.member && !user?.admin && <button>Become Admin</button>}

              <LogOut />
            </>
          )}
        </div>
      </div>

      <div>
        {messages?.map((msg) => (
          <DisplayMessage message={msg} user={user} />
        ))}
      </div>
    </>
  );
}

export default App;
