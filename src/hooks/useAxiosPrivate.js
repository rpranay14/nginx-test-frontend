import { useEffect } from "react";
import { axiosapi, axiosPrivate } from "../axios/axiosapi";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../redux/ActionCreators";


const useAxiosPrivate=()=>{
    const state=useSelector(state=>state);
    const dispatch=useDispatch();
    const accessToken=state.user.userinfo.accessToken;
   
    useEffect(() => {
       const requestIntercept= axiosPrivate.interceptors.request.use(function (config) {
            if(!config.headers['Authorization'])
            {
                config.headers["Authorization"]=`Bearer ${accessToken}`
            }
            return config
          }, function (error) {
            // Do something with request error
            return Promise.reject(error);
          });


          const responseIntercept=axiosPrivate.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          },async function (error) {
            const prevRequest=error?.config;
            if(error.status===403 && !prevRequest?.sent){
                prevRequest.sent=true;
                try{
                    const apirefresh=await axiosapi.get("/users/refresh",{withCredentials:true});
               
                    const userDetails={
                        accessToken:apirefresh.data.data.accessToken,
                        email:apirefresh.data.data.email,
                        name:apirefresh.data.data.name,
                        credits:apirefresh.data.data.credits
                      }
                      dispatch(loginUser(userDetails));
                      prevRequest.headers.Authorization=`Bearer ${apirefresh.data.data.accessToken}`
                      return axiosPrivate(prevRequest)
                }
                catch(error){
                
                }
                }
              
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
          return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.request.eject(responseIntercept);

        }
    }, [])
    
    return axiosPrivate;
}

export default useAxiosPrivate;