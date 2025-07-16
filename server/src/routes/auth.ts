import { Router } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import pool from "../db/pool.js";
import { User } from "../types/User.js";

const authRouter = Router();

// SIGN UP
authRouter.post("/sign-up", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await pool.query(
      "INSERT INTO users (firstName, lastName, email, password ) VALUES ($1, $2, $3, $4)",
      [req.body.firstName, req.body.lastName, req.body.email, hashedPassword]
    );
    res.status(200).json({ message: "User signed up successfully." });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: `Error signing up user: ${err.message}` });
    } else {
      res.status(500).json({ error: "Unknown error occurred during sign-up." });
    }
  }
});

// LOGIN
authRouter.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    (
      err: Error | null,
      user: User | false,
      info: { message?: string } | undefined
    ) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ error: info?.message || "Login failed" });
      }

      // Log the user in
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res
          .status(200)
          .json({ message: "Logged in successfully", user });
      });
    }
  )(req, res, next);
});

// GET USER
authRouter.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    // Send limited user data (avoid sending password, etc.)
    const { id, email, firstname, lastname, member, admin } = req.user;
    res.json({
      user: {
        id,
        email,
        firstName: firstname,
        lastName: lastname,
        member,
        admin,
      },
    });
  } else {
    res.status(401).json({ user: null });
  }
});

// CHECK IF USER / EMAIL ALREADY SIGNED UP
authRouter.post("/check-email", async (req, res) => {
  try {
    const user = await pool.query("SELECT 1 FROM users WHERE email = ($1);", [
      req.body.email,
    ]);

    const exists = user.rows.length > 0;

    res.status(200).json({ exists });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: `Error signing up user: ${err.message}` });
    } else {
      res.status(500).json({
        error: "Unknown error occurred during check for existing user.",
      });
    }
  }
});

// LOGOUT
authRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "User logged out successfully." });
    });
  });
});

export default authRouter;
