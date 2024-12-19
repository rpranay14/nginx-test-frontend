import React, { useEffect, useState } from 'react';
import { axiosapi } from '../axios/axiosapi';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/ActionCreators';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    setSuccess('');
    setError('');
  },[email,password])

  const validateEmail = (email) => {
    // Regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    setSuccess('');
    setError('');

    // Validation checks
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosapi.post(
        '/users/signin',
        { email: email, password: password },
        { withCredentials: true }
      );
      setLoading(false);
      if (response.data.success) {
        setSuccess('User logged in successfully');
        const userDetails = {
          accessToken: response.data.data.accessToken,
          email: response.data.data.email,
          name: response.data.data.name,
          credits:response.data.data.credits
        };
        dispatch(loginUser(userDetails));
        navigate('/restorephotos')

      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <div className="w-[100%] lg:w-[50%] mx-auto mt-36">
        <p className="mb-4 text-center text-2xl lg:text-4xl font-extrabold">Signin to your account</p>
        <p className="w-[70%] text-center text-lg lg:text-xl font-semibold text-[#8a8a8a] mx-auto">
          Sign in below to create a free account and restore your photos today.
        </p>

        <div className="mt-12 mx-auto w-[80%] lg:w-[60%] xl:w-[40%]">
          {success !== '' && (
            <p className="text-center mb-2 text-green-800 font-semibold">{success}</p>
          )}
          {error !== '' && (
            <p className="text-center mb-2 text-red-500 font-semibold">{error}</p>
          )}
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
            className="border-[1px] px-2 py-2  w-[100%] border-[#8a8a8a] rounded-lg mb-2"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="mx-auto  w-[80%] lg:w-[60%] xl:w-[40%]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#7C35B5] underline">
            Signup
          </Link>
        </p>
        <div className="flex items-center justify-center mt-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mx-auto mb-[5rem] text-center w-[11rem] text-base mt-4 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Signin'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
