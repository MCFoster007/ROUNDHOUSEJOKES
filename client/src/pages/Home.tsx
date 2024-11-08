import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import SubmitaJoke from "./SubmitaJoke";
import UserList from '../components/Users';
import auth from '../utils/auth';

const Home = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [joke, setJoke] = useState<string>("");


    useLayoutEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchNewJoke = async (): Promise<string> => {
        try {
            const response = await fetch('https://icanhazdadjoke.com/');
            const data = await response.json();

            if (data.type === 'single') {
                return data.joke;
            } else {
                return `${data.setup} - ${data.delivery}`;
            }
        } catch (error) {
            console.error('Error fetching new joke:', error);
            return 'Sorry, we couldn`t fetch a new joke at the moment.';
        }
    };

    const fetchChuckJoke = async (): Promise<string> => {
        try {
            const category = 'food';
            const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error('Error fetching Chuck Norris joke:', error);
            return 'Sorry, we couldn\'t fetch a Chuck Norris joke at the moment.';
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
            setError(true);
        }
    };

    const handleButtonClick = async (jokeType: string) => {
        if (jokeType === 'newJoke') {
            const newJoke = await fetchNewJoke();
            setJoke(newJoke);
        } else if (jokeType === 'chuckJokes') {
            const chuckJoke = await fetchChuckJoke();
            setJoke(chuckJoke);
        }
    };
   
    if (error) {
        return <SubmitaJoke />;
    }

    return (
        <>
            {
                !loginCheck ? (
                    <div className='login-notice'>
                        <h1>
                            Let's KICK a smile on your face!
                        </h1>
                    </div>
                ) : (
                    <UserList users={users} />
                )}
            <div className="button-group">
                <button onClick={() => handleButtonClick('newJoke')}>New Joke</button>
                <button onClick={() => handleButtonClick('chuckJokes')}>Chuck Joke</button>
                <button onClick={() => handleButtonClick('myJokes')}>My Jokes</button>
            </div>

            <div className="joke-box">
                <p>{joke || "Click a button to get a joke!"}</p>
            </div>
        
            <div className="button-save">
                <button onClick={() => handleButtonClick('saveJoke')}>Save Joke!</button>
            </div>  
        </>
    );
};

export default Home;