import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import UserList from '../components/Users';
import auth from '../utils/auth';
import { handleSaveJoke } from "../components/likedJokes";
import { Joke } from "../../../server/src/models/likedJoke";

// Import sound files
import newJokeSound from '../../public/newJokeSound.wav';
import chuckJokeSound from '../../public/chuckJokeSound.wav';
import { getLikedJokes } from "../api/authAPI";

const Home = ({ userID }: { userID?: number }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [joke, setJoke] = useState<string>("");
    // const [likedJokes, setLikedJokes] = useState<string[]>([]);

    // Check login status when the component mounts
    useLayoutEffect(() => {
        checkLogin();
    }, []);

    // Fetch users if the user is logged in
    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    // Check if the user is logged in
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    // Function to play sound
    const playSound = (soundFile: string) => {
        const audio = new Audio(soundFile);
        audio.play();
    };

    // Fetch a new joke from icanhazdadjoke API
    const fetchNewJoke = async (): Promise<string> => {
        try {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' },
            });
            if (!response.ok) throw new Error('Cannot generate joke');
            const data = await response.json();
            return data.joke;
        } catch (error) {
            console.error('Error fetching new joke:', error);
            return 'Sorry, we couldn’t fetch a new joke at the moment.';
        }
    };

    // Fetch a Chuck Norris joke
    const fetchChuckJoke = async (): Promise<string> => {
        try {
            const response = await fetch('https://api.chucknorris.io/jokes/random?category=food');
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error('Error fetching Chuck Norris joke:', error);
            return 'Sorry, we couldn’t fetch a Chuck Norris joke at the moment.';
        }
    };

    // Fetch users list
    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
            setError(true);
        }
    };

    // Handle button click for jokes with sound
    const handleButtonWithSound = async (jokeType: string, soundFile: string) => {
        playSound(soundFile);

        if (jokeType === 'newJoke') {
            const newJoke = await fetchNewJoke();
            setJoke(newJoke);
        } else if (jokeType === 'chuckJokes') {
            const chuckJoke = await fetchChuckJoke();
            setJoke(chuckJoke);
        }
    };

    // interface JokeData {
    //     id: string,
    //     userID: number,
    //     text: string
    // }

    // let joke: InstanceType<typeof Joke>;


    const handleSaveCurrentJoke = async () => {
        console.log("UserID in handleSaveCurrentJoke:", userID);
        if (joke && userID) {
            const jokeData = {
                id: new Date().toISOString(), // Assuming `id` here is meant to be a unique identifier
                text: joke,
            };
    
            console.log('Saving joke data:', jokeData);
    
            try {
                await handleSaveJoke(jokeData); // Pass both jokeData and userID
            } catch (error) {
                console.error('Error saving joke:', error);
            }
        }
    };

    const LikedJokesComponent = () => {
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

    const { likedJokes, handleShowLikedJokes } = LikedJokesComponent();

    if (error) {
        return <div>Error loading users. Please try again later.</div>;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>Let's KICK a smile on your face!</h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )
            }
            <div className="button-group">
                <button onClick={() => handleButtonWithSound('newJoke', newJokeSound)}>New Joke</button>
                <button onClick={() => handleButtonWithSound('chuckJokes', chuckJokeSound)}>Chuck Joke</button>
                <button onClick={handleShowLikedJokes}>My Jokes</button>
            </div>

            <div className="joke-box">
                <p>{joke || "Click a button to get a joke!"}</p>
            </div>

            <div className="button-save">
                <button onClick={handleSaveCurrentJoke}>Save Joke!</button>
            </div>

            <div className="likedJokes">
                <h3>Your Liked Jokes:</h3>
                <ul>
                    {likedJokes.map((likedJoke, index) => (
                        <li key={index}>{likedJoke.text}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Home;