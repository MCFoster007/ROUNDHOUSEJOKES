import type { UserLogin } from '../interfaces/UserLogin';
import type { UserSignUp } from '../interfaces/UserSignUp';

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

export { login, signUp };
