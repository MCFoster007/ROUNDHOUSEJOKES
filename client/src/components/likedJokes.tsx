import { saveJoke, getLikedJokes } from '../api/authAPI';
import { Joke } from "../../../server/src/models/likedJoke";




export const handleSaveJoke = async (joke: { id: string; text: string; userID: number }) => {
  const { id: jokeId, text, userID } = joke;
  console.log('Calling saveJoke with:', { jokeId, text,userID });
  const result = await saveJoke(jokeId, text, userID);
  if (result) {
    console.log('Joke saved:', result);
  } else {
    console.log('Joke save failed');
  }
};

export const handleDisplayLikedJokes = async (setLikedJokes: (jokes: Joke[])=> void) => {
  const jokes = await getLikedJokes();
  setLikedJokes(jokes);
};



