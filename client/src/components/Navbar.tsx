import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  return (
    <div className='display-flex justify-space-between align-center py-2 px-5 mint-green body'>
      <h1> RoundHouse Jokes 
        <img 
          src="/laugh.png" 
          alt="Laugh Icon" 
          style={{ width: '40px', height: '40px', marginLeft: '10px', verticalAlign: 'middle' }} 
        />

      </h1>

      <div className="button-group">
        <button className='btn' type='button'>
            <Link to='/signUp'>
            <img 
                src="/sign-up.png" 
                alt="Sign Up Icon" 
                width="60" 
                height="60" 
                style={{ cursor: 'pointer' }}
               />
            </Link>
            </button>

        {!loginCheck ? (
          <button className='btn' type='button'>
            <Link to='/login'>
            <img 
                src="/login.png" 
                alt="Login Icon" 
                width="60" 
                height="60" 
                style={{ cursor: 'pointer' }}
               />
                </Link>
                </button>
        ) : (
          <button
            className='btn'
            type='button'
            onClick={() => {
              auth.logout();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
