import { useState, useEffect } from 'react';
import { Joke } from "../../../server/src/models/likedJoke";
import { getLikedJokes } from '../api/authAPI'
export const LikedJokesComponent = () => {
    const [likedJokes, setLikedJokes] = useState<Joke[]>([]);
  
    useEffect(() => {
        handleShowLikedJokes();
    }, []);
  
    const handleShowLikedJokes = async () => {
        try {
            const jokes = await getLikedJokes();
            setLikedJokes(jokes);
        } catch (error) {
            console.error("Failed to retrieve liked jokes:", error);
        }
    };
  
    // Return only the state and function for use in Home
    return { likedJokes, handleShowLikedJokes };
  };