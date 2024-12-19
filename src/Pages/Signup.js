import React, { useState } from 'react';
import { axiosapi } from '../axios/axiosapi';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    // Validation checks
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosapi.post('/users', {
        email: email,
        name: name,
        password: password,
      });
      setLoading(false);
      if (response.data.success) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-[100%] lg:w-[50%] mx-auto mt-36">
      <p className="mb-4 text-center text-2xl lg:text-4xl font-extrabold">
        Signup to your account
      </p>
      <p className="w-[70%] text-center text-xl font-semibold text-[#8a8a8a] mx-auto">
        Sign up below to create a free account and restore your photos today.
      </p>
      <div className="mt-12 mx-auto w-[80%] lg:w-[60%] xl:w-[40%]">
        {success !== '' && (
          <p className="text-center mb-2 text-green-800 font-semibold">
            {success}
          </p>
        )}
        {error !== '' && (
          <p className="text-center mb-2 text-red-500 font-semibold">
            {error}
          </p>
        )}
        <input
          className="border-[1px] px-2 py-2 w-[100%] border-[#8a8a8a] border-solid rounded-lg mb-2"
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2 mx-auto w-[80%] lg:w-[60%] xl:w-[40%]">
        <input
          className="border-[1px] px-2 py-2 w-[100%] border-[#8a8a8a] border-solid rounded-lg mb-2"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-2 mx-auto w-[80%] lg:w-[60%] xl:w-[40%]">
        <input
          className="border-[1px] px-2 py-2 w-[100%] border-[#8a8a8a] border-solid rounded-lg mb-2"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p className="mx-auto w-[80%] lg:w-[60%] xl:w-[40%]">
        Already have an account?{' '}
        <Link to="/signin" className="text-[#7C35B5] underline">
          Login
        </Link>
      </p>
      <div className="flex items-center justify-center mt-3">
        <button
          onClick={() => handleSubmit()}
          disabled={loading}
          className="mx-auto mb-[5rem] text-center w-[11rem] text-base mt-4 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 disabled:opacity-50"
        >
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </div>
    </div>
  );
};

export default Signup;
