import { Router, type Request, type Response } from "express";
import {Joke} from '../models/likedJoke.js';

const retrieveJokes = async (_req: Request, res: Response) => {
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming", {
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
const retrieveLiked = async (_req: Request, res: Response) => {
  try {
    const userID = _req.params.userID;
    const likedJokes =await Joke.findAll ({where: {userID}});
    return res.status(200).json(likedJokes);
    // TODO: find all liked jokes by user with ID, user_ID

    // return res.status(418).send ('to be implemented');
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return res.status(500).json ({error: 'failed to retrieved liked jokes'});
  }
  return retrieveLiked;
};
const likeJoke = async (_req: Request, res: Response) => {
  try {

    
    // TODO: add joke to the DB with user_ID
    //body must include joke text and user id 

    return res.status(418).send ('to be implemented');
  } catch (err) {
    console.log("Error from data retrieval:", err);
    return {error: err};
  }
};
const router = Router();


router.get("/Jokes", retrieveJokes);
// router.get('/liked/:user_ID', retrieveLiked);
router.post('/like', likeJoke)


export default router;


