import type { Message } from "../Authentication/types/Messages";
import type { User } from "../Authentication/types/User";
import styles from "./DisplayMessage.module.css";
import useDeleteMessage from "../deleteMessageHandler";

type Props = {
  message: Message;
  user: User | null;
};

function DisplayMessage({ message, user }: Props) {
  const deleteMessageHandler = useDeleteMessage();

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{message.title}</h2>
      <p className={styles.description}>{message.description}</p>
      {user?.member && (
        <p className={styles.meta}>
          {new Date(message.created_at).toLocaleString()} by {message.author}
        </p>
      )}
      {user?.admin && (
        <button
          className={styles.deleteButton}
          onClick={(e) => deleteMessageHandler(e, message.id)}
        >
          Delete Message
        </button>
      )}
    </div>
  );
}

export default DisplayMessage;
