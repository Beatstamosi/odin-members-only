import { useAuth } from "./Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import secretPassword from "./secretPassword";

function useBecomeAdmin() {
  const { fetchUser } = useAuth();
  const navigate = useNavigate();

  return async function becomeAdmin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const password = secretPassword(
      `${import.meta.env.VITE_SECRETPASSWORDADMIN}`
    );

    if (!password) {
      alert("Wrong Password buddy");
      return;
    } else {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/become-admin`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        if (res.ok) {
          await fetchUser();
          navigate("/");
        } else {
          console.error("Failed to update admin status", data.error);
        }
      } catch (err) {
        console.error("Error updating admin status: ", err);
      }
    }
  };
}

export default useBecomeAdmin;
