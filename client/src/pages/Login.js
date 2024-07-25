import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    fetch('http://localhost:4000/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        localStorage.setItem('user', 'true');
        navigate('/');
      } else {
        alert('Login failed. Please try again.');
      }
      window.location.reload()
    }).catch(error => {
      alert('Login failed. Please check your network connection and try again.', error);
    });

    setEmail("");
    setPassword("");
  };

  return (
    <section className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-lg max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form className='space-y-4'>
          <div>
            <label htmlFor='email' className='block mb-1'>Email:</label>
            <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter Your Email' className='w-full border-gray-300 border p-2 rounded' />
          </div>
          <div>
            <label htmlFor='password' className='block mb-1'>Password:</label>
            <input id='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Your Password' className='w-full border-gray-300 border p-2 rounded' />
          </div>
          <div>
            <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
          </div>
          <button onClick={handleClick} type='button' className='w-full bg-primary py-3 px-4 text-white rounded hover:bg-primary-dark transition duration-200'>Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
