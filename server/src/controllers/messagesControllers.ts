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

export { getAllMessages };
