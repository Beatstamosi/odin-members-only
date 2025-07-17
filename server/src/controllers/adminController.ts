import pool from "../db/pool.js";
import { Request, Response } from "express";

async function activateAdmin(req: Request, res: Response) {
  try {
    if (!req.user?.id) {
      return res
        .status(400)
        .json({ error: "User ID is missing from request." });
    }

    const { rowCount } = await pool.query(
      "UPDATE users SET admin = true WHERE id = $1",
      [req.user?.id]
    );

    if (rowCount === 1) {
      res.status(200).json({ message: "Admin Status updated successfully." });
    } else {
      res.status(500).json({ error: "Admin Status update failed" });
    }
  } catch (err) {
    console.error("Error updating admin status", err);
    res.status(500).json({ error: `Admin status update failed: ${err}` });
  }
}

export default activateAdmin;
