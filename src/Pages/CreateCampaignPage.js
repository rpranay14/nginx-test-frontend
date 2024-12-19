import React, { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {useNavigate} from 'react-router-dom'

const CreateCampaignPage = () => {
    const [campaignName,setCampaignName]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("")
    const axios=useAxiosPrivate();
    const navigate=useNavigate()
    const handleSubmit=async()=>{
      setLoading(true)
      try{
        const response=await axios.post("/campaign/create-campaign",{name:campaignName});
        setLoading(false);
        if(response.data.success){
          navigate(`/campaign/edit/${response.data.data}`)
        }
      }
      catch(error){
        setLoading(false);
        setError("Some error occured")

      }
    }
  return (
    <div className='w-[35%] mx-auto'>
        <p className='text-2xl font-semibold'>Create an email campaign</p>
        <p className='mt-4 text-[#212121] '>Keep subscribers engaged by sharing your latest news, promoting your bestselling products, or announcing an upcoming event.</p>
       {error !=="" ? <p>{error}</p>:<></>}
        <p className='mt-10  font-semibold'>Campaign Name</p>
   
        <input placeholder='Campaign Name' className='w-[100%] px-3 py-1 border-2 mt-2 rounded-md' value={campaignName} onChange={(e)=>setCampaignName(e.target.value)}/>
        <div className='mt-3 justify-end flex gap-4 '>
            <button className='border-2 border-black px-4 py-1 rounded-md '>Cancel</button>
            <button onClick={()=>handleSubmit()} className='bg-black text-white px-2 py-1 rounded-md'>{!loading ? "Create Campaign" :"Creating Campaign"}</button>
        </div>
    </div>
  )
}

export default CreateCampaignPage