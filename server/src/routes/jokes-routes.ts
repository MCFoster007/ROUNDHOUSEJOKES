import { Router, type Request, type Response } from "express";
import {Joke} from '../models/likedJoke.js';
// import {User} from '../models/user.js';

// const retrieveJokes = async (_req: Request, res: Response) => {
//   try {
//     const response = await fetch("https://icanhazdadjoke.com/", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Invalid user API response, check network tab!");
//     }

//     return res.json(data);
//   } catch (err) {
//     console.log("Error from data retrieval:", err);
//     return {error: err};
//   }
// };
export const retrieveLiked = async (req: Request, res: Response) => {
  try {
    // Cast req.user to include id directly
    const userId = (req.user?.id)
    if (!userId) {
      return res.status(400).json({ error: 'User not authenticated' });
    }
    const likedJokes = await Joke.findAll({ where: { userID: userId } });
    return res.status(200).json(likedJokes);
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return res.status(500).json({ error: 'Failed to retrieve liked jokes' });
  }
};
export const likeJoke = async (req: Request, res: Response) => {
 console.log(req.body)
  try {
    const {jokeId, userID, text } = req.body;
  const newJoke =await Joke.create ({jokeId, userID, text});
  res.status(201).json (newJoke);
  } catch (err) {
    console.log(err);
    res.status (500).json({message: 'An error occurred while liking the joke'});
  }
};
const router = Router();


// router.get("/Jokes", retrieveJokes);
router.get('/retrieveLiked', retrieveLiked);
router.post('/like', likeJoke)


export default router;


