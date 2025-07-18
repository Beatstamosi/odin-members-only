import pool from "../db/pool.js";
import { Request, Response } from "express";

async function getAllMessages(req: Request, res: Response) {
  try {
    const { rows } = await pool.query(
      `SELECT messages.*, users.firstname AS author
   FROM messages
   JOIN users ON messages.userid = users.id`
    );

    res.status(200).json({ messages: rows });
  } catch (err) {
    console.error("Error fetching messages", err);
    res.status(500).json({ error: err });
  }
}

async function postMessage(req: Request, res: Response) {
  if (!req.body.title || !req.body.description || !req.user?.id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO messages(title, description, userid) VALUES ($1, $2, $3) RETURNING*",
      [req.body.title, req.body.description, req.user?.id]
    );

    if (result.rowCount === 1) {
      res.status(201).json({ message: "Message posted successfully!" });
    } else {
      res.status(500).json({ error: "Message could not be posted" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: `Message could not be posted: ${err.message}` });
    } else {
      res.status(500).json({ error: "Message could not be posted:", err });
    }
  }
}

export { getAllMessages, postMessage };
