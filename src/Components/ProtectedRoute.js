import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { axiosapi } from '../axios/axiosapi';
import { loginUser } from '../redux/ActionCreators';
import SignIn from '../Pages/SignIn';


const ProtectedRoute = () => {
 const [isLoading,setIsLoading]=useState(false)
    const user=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
    useEffect(()=>{
        const fetchToken=async()=>{
          setIsLoading(true);
       
          try {
              const response=await axiosapi.get("/users/refresh",{withCredentials:true});
           
              const userDetails={
                  accessToken:response.data.data.accessToken,
                  email:response.data.data.email,
                  name:response.data.data.name,
                  credits:response.data.data.credits
                }
               setIsLoading(false)
              dispatch(loginUser(userDetails))
             
          } catch (error) {
            setIsLoading(false)
            navigate("/signin")
          }
        }
        if(user?.userinfo===null){
            fetchToken();
        }
        else{
         
        }
    },[])
    if(user.userinfo!==null){
      return <Outlet/>
    }
    else{
      if(isLoading){
        return <p className='mt-24'>Loading.....</p>
      }
    }
 
 
}
 


export default ProtectedRoute