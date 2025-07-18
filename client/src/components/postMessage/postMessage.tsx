import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostMessage.module.css";

function PostMessage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages/post-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        console.error("Message could not be posted: ", data.error);
        alert("Please try again");
      }
    } catch (err) {
      console.error("Failed to post message: ", err);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.formContainer}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      ></input>
      <label htmlFor="description">Message</label>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter your Message for the World"
        required
      ></textarea>
      <button type="submit">Post Message</button>
    </form>
  );
}

export default PostMessage;
