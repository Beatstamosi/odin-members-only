import { useNavigate } from "react-router-dom";

function useDeleteMessage() {
  const navigate = useNavigate();

  return async function deleteMessageHandler(
    e: React.MouseEvent<HTMLButtonElement>,
    messageId: number
  ) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages/delete-message`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            messageId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        navigate(0);
      } else {
        console.error("Message could not be delete: ", data.error);
      }
    } catch (err) {
      console.error("Failed to delete message: ", err);
    }
  };
}

export default useDeleteMessage;
