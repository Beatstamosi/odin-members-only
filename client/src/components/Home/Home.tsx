import DisplayMessage from "../DisplayMessage/displayMessage";
import { useEffect, useState } from "react";
import type { Message } from "../Authentication/types/Messages";
import { useAuth } from "../Authentication/useAuth";

function Home() {
  const [messages, setMessages] = useState<Message[]>();
  const { user } = useAuth();

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
  return (
    <div>
      {messages?.map((msg) => (
        <DisplayMessage key={msg.id} message={msg} user={user} />
      ))}
    </div>
  );
}

export default Home;
