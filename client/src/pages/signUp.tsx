import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { signUp } from '../api/authAPI';
import type { UserSignUp } from '../interfaces/UserSignUp';

const SignUp = () => {
    const [signUpData, setSignUpData] = useState<UserSignUp>({
        username: '',
        email: '',
        password: '',
    });

    const naviagte = useNavigate();

    const handleChange = (
        p: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = p.target;
        setSignUpData({
            ...signUpData,
            [name]: value,
        });
    };

    const handleSubmit = async (p: FormEvent) => {
        p.preventDefault();
        try {
            const data = await signUp(signUpData);
            Auth.signUp(data.token)
            naviagte('/');
        } catch (err) {
            console.error('Failed to sign up', err);
        }
    };

    return (
        <div className='form-conatiner'>
            <form className='form signUp-form' onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        className='form-input'
                        type='text'
                        name='username'
                        value={signUpData.username || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        className='form-input'
                        type='email'
                        name='email'
                        value={signUpData.email || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        className='form-input'
                        type='password'
                        name='password'
                        value={signUpData.password || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary' type='submit'>
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;