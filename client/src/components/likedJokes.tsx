import { saveJoke, getLikedJokes } from '../api/authAPI';

export const handleSaveJoke = async (joke: { id: string; text: string }) => {
  const { id: jokeId, text } = joke;
  console.log('Calling saveJoke with:', { jokeId, text });
  const result = await saveJoke(jokeId, text);
  if (result) {
    console.log('Joke saved:', result);
  } else {
    console.log('Joke save failed');
  }
};

export const handleDisplayLikedJokes = async (setLikedJokes: ()=> void) => {
  const jokes = await getLikedJokes();
  setLikedJokes(jokes);
};

