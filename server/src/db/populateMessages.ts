import pool from "../db/pool.js";
import "dotenv/config";

const messages = [
  {
    title: "Welcome to the club!",
    description: "Hey Peter, glad to have you here.",
    userId: 1,
  },
  {
    title: "Meeting Reminder",
    description: "Don't forget the meeting at 10AM tomorrow.",
    userId: 2,
  },
  {
    title: "Coffee Chat",
    description: "Hey Susan, let's catch up over coffee.",
    userId: 3,
  },
  {
    title: "Bug in Login",
    description: "Adrian found a bug in the login flow. Needs fixing.",
    userId: 2,
  },
  {
    title: "New Feature Proposal",
    description: "Susan suggested adding dark mode to the app.",
    userId: 3,
  },
];

async function seedMessages() {
  try {
    for (const msg of messages) {
      await pool.query(
        `INSERT INTO messages (title, description, userId) VALUES ($1, $2, $3)`,
        [msg.title, msg.description, msg.userId]
      );
    }
    console.log("✅ Messages seeded successfully.");
  } catch (err) {
    console.error("❌ Error seeding messages:", err);
  } finally {
    await pool.end();
  }
}

seedMessages();
