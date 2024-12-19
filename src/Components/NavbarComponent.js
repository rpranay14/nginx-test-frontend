import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/ActionCreators";
import { axiosapi } from "../axios/axiosapi";
import logo from '../Assets/camera.png';


const NavbarComponent = () => {
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axiosapi.get("/users/refresh", {
          withCredentials: true,
        });

        const userDetails = {
          accessToken: response.data.data.accessToken,
          email: response.data.data.email,
          name: response.data.data.name,
          credits:response.data.data.credits
        };

        dispatch(loginUser(userDetails));
      } catch (error) {
        
      }
    };
    if (user?.userinfo === null) {
      fetchToken();
    }
  }, [user, dispatch, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async() => {
    // Clear user info and redirect to login page
    try{
      const response=await axiosapi.get('/users/logout',{withCredentials:true});
     

      dispatch(loginUser(null));
      navigate("/signin");
    }
    catch(error){
      
    }
  
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-10 pl-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Branding Section */}
          <div className="flex-shrink-0">
           
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-6 items-center">
          <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-[#1769aa] text-lg font-medium"
                >
                  Dashboard
                </Link>
            {user?.userinfo ? (
              <>
              <Link
                  to="/pricing"
                  className="text-gray-700 hover:text-[#1769aa] text-lg font-medium"
                >
                 Pricing
                </Link>
                <span className="text-lg  text-gray-700 font-bold">
                  Welcome, {user.userinfo.name}
                </span>
                <Link
                 
                  className="text-gray-700 hover:text-[#1769aa] font-bold text-lg "
                >
                  {user.userinfo.credits} Credits
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="px-2 py-1 rounded-md bg-[#1769aa] text-white text-lg font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-[#1769aa] text-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-700 hover:text-[#1769aa] text-lg font-medium"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1769aa] hover:bg-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2">
            <div className="flex flex-col space-y-4 items-start bg-white py-4 px-6 shadow-lg">
              {user?.userinfo ? (
                <>
                 <Link
                  to="/pricing"
                  className="text-gray-700 hover:text-[#1769aa] text-lg font-medium"
                >
                 Pricing
                </Link>
                  <span className="text-lg font-medium text-gray-700 w-full">
                    Welcome, {user.userinfo.name}
                  </span>
                  <Link
                    
                    className="text-gray-700 hover:text-[#1769aa] text-lg font-bold w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user.userinfo.credits} Credits
                  </Link>
                 
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-white rounded-md bg-[#1769aa] px-2 py-1  text-lg font-medium "
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-700 hover:text-[#1769aa]  text-lg font-medium w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-gray-700 hover:text-[#1769aa] text-lg font-medium w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarComponent;
