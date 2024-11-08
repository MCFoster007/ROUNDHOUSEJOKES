import { Router, type Request, type Response } from "express";

const retrieveCNJokes = async (_req: Request, res: Response) => {
  try {
    const category = 'food';
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invalid user API response, check network tab!");
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Error from data retrieval:", err);
    return res.status(500).json({ error: "Error retrieving joke" });
  }
};

const router = Router();
router.get("/cnJokes", retrieveCNJokes);

export default router;

