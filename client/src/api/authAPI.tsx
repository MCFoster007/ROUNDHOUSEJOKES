import type { UserLogin } from '../interfaces/UserLogin';
import type { UserSignUp } from '../interfaces/UserSignUp';
import Auth from '../utils/auth';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('User information not retrieved, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

const signUp = async (userInfo: UserSignUp) => {
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    console.log(response)
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      throw new Error('Error signing up!');
    }

    return data;
  } catch (err) {
    console.log('Error from user sign up: ', err);
    return Promise.reject('Could not sign up');
  }
};

export const saveJoke = async (jokeId: string, text: string, userID: number) => {
  try {
    console.log('Sending joke to API:', { jokeId, text, userID });
    const response = await fetch('/jokesroute/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({ jokeId, text, userID}),
    });
    if (!response.ok) {
      throw new Error('Failed to save the joke');
    }
    const result = await response.json();
    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error('Error saving joke:', error);
  }
};

export const getLikedJokes = async () => {
  const token = Auth.getToken();
  try {
    const response = await fetch(`/jokesroute/retrieveLiked`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to retrieve liked jokes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error retrieving liked jokes:', error);
    return [];
  }
};

export { login, signUp };
