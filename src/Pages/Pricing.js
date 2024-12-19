import React, { useEffect, useState } from 'react'
import { axiosapi } from '../axios/axiosapi';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredits } from '../redux/ActionCreators';

const Pricing = () => {
  const [loading,setLoading]=useState(false);
  const [paymentLoading,setPaymentLoading]=useState(false);
  const [paymentError,setPaymentError]=useState('')
  const [error,setError]=useState("");
    const [plans,setPlans]=useState();
    const axiosprivate=useAxiosPrivate();
    const navigate=useNavigate();
    const dispatch=useDispatch();
   
    const state=useSelector((state)=>state)
    useEffect(() => {
      console.log("AI",process.env.RAZORPAY_KEY)
        // Dynamically load Razorpay script
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          // Cleanup script on component unmount
          document.body.removeChild(script);
        };
      }, []);
    useEffect(()=>{
      console.log("AI",process.env.RAZORPAY_KEY)
        const fetchPlans=async()=>{
          setLoading(true);
          try{
            const response=await axiosapi.get("/subscription");
            setPlans(response.data.data);
            setLoading(false)
          }
          catch(error){
            setError("Some error occured");
            setLoading(false)
          } 
        }
        fetchPlans();
    },[])
  


    const handlePayment = async(planName,planAmount) => {
      try{
        setPaymentLoading(true)
        const response=await axiosprivate.post('/payment/createorder',{planName,planAmount});
        const orderDetails=response.data.data;
        setPaymentLoading(false);

        const options = {
          key: 'rzp_live_ezwoK0WZsRj2qb', // Replace with your Razorpay Key ID
          amount: orderDetails.amount, // Amount in paise
          currency: "INR",
          name: "AiPhotoRestore",
          description: "AIPhotoRestore Credit",
          image: "https://aiphotorestore.in/android-chrome-512x512.png",
          order_id: orderDetails.id, // Replace with the order ID from the backend
          handler: async function (response) {
            console.log(response,"response")
            try{
              const verifiedPayment=await axiosprivate.post("/payment/verify_payment",{razorpay_payment_id:response.razorpay_payment_id,razorpay_order_id:response.razorpay_order_id,razorpay_signature:response.razorpay_signature})
              if(verifiedPayment.data.success){
                dispatch(updateCredits({credits:verifiedPayment.data.credits}))
              }
              navigate('/success')
            }
            catch(error){
              console.log("SOME ERROR OCCURED")
            }
           
          },
          prefill: {
            name: state.user.userinfo.name,
            email: state.user.userinfo.email,
          
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
    
        const rzp1 = new window.Razorpay(options);
    
        rzp1.on("payment.failed", function (response) {
          alert("Error Code: " + response.error.code);
          alert("Error Description: " + response.error.description);
          alert("Error Source: " + response.error.source);
          alert("Error Step: " + response.error.step);
          alert("Error Reason: " + response.error.reason);
          alert("Order ID: " + response.error.metadata.order_id);
          alert("Payment ID: " + response.error.metadata.payment_id);
        });
        rzp1.open();
      }
      catch(error){
        setPaymentError("Some error occured")
      }
       
      };
if(loading){
  return(
  <div className='px-5 mt-24'>
  <p className='text-5xl  text-center mt-12 font-bold w-[50%] mx-auto'>Buy Credits to Restore Photos</p>
  <div className="flex justify-center items-center mt-16">
      <div className="w-[300px] border-[1px] border-gray-300 rounded-lg shadow-lg p-6 text-center animate-pulse">
        {/* Title */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
        {/* Description */}
        <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto mb-6"></div>
        {/* Price */}
        <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
        {/* Button */}
        <div className="h-10 bg-gray-300 rounded w-full mx-auto mb-4"></div>
        {/* Footer Text */}
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
      </div>
    </div>
 
  


   </div>
  )
}
if(error!==""){
  return <p>{error}</p>
}


  return (
    <div className='px-5 mt-24'>
       <p className='text-2xl w-[100%] lg:text-5xl  text-center mt-12 font-bold lg:w-[50%] mx-auto'>Buy Credits to Restore Photos</p>
       <div className="flex justify-center items-center mt-8 lg:mt-16 mb-12">
        {plans?.map((plan)=>( <div className="w-[300px] border-[1px] border-gray-300 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Restore {plan.credits} Photos</h2>
        <p className="text-gray-500 mb-4">Get {plan.credits} credits to restore your favorite memories</p>
        <div className="text-4xl font-extrabold text-gray-900 mb-4">
        Rs.{plan.amount}
         
        </div>
        <button id="rzp-button1" onClick={()=>handlePayment(plan.name,plan.amount)} className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition duration-300">
         {paymentLoading ? <p>Processing....</p>:<p>Pay Now</p>} 
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Each credit restores 1 photo.
        </p>
      </div>))}
     
    </div>
      
       
    

        </div>
  )
}

export default Pricing