import { Router, type Request, type Response } from "express";
const retrieveCNJokes = async (_req: Request, res: Response) => {
  try {
    const response = await fetch("https://api.chucknorris.io/jokes/random?category=food", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Invalid user API response, check network tab!");
    }

    return res.json(data);
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return {error: err};
  }
};
const router = Router();


router.get("/cnJokes", retrieveCNJokes);

export default router;
