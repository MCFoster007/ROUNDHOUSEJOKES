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

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
            setError(true);
        }
    };

const handleButtonClick = (newJoke: string) => {
        setJoke(newJoke);
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
        </>
    );
};

export default Home;