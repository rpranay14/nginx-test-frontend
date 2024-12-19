import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const CreateContactForm = ({listid,closeModal}) => {
    const axios=useAxiosPrivate();
    const [lastName,setLastName]=useState('');
    const [firstName,setFirstName]=useState('');
    const [email,setEmail]=useState('');
    const [phoneNumber,setPhoneNumber]=useState(null);
    const [error,setError]=useState('')
    const handleSubmit=async()=>{
        const response=await axios.post('/customer',{listid,firstName,lastName,email,phoneNumber});
        if(response.data){
            closeModal()
        }
        else{
            setError("Some error occured")
        }

    }
  return (
    <div className='absolute bg-black opacity-45 top-0 left-0 right-0 bottom-0'>
        <div className='fixed h-screen top-0 right-0 w-[20%] bg-white pl-4 pr-4'>
            <div className='mt-20 w-[100%]'>
                {error!=='' ?<p className='mb-5'>{error}</p>:<></>}
            <p className='font-semibold mb-1'>First Name</p>
            <input className='w-[100%] px-2 py-1 border-black border-[1px] rounded-sm' placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>

            </div>
            <div className='mt-4 w-[100%]'>
                {error!=='' ?<p className='mb-5'>{error}</p>:<></>}
            <p className='font-semibold mb-1'>Last Name</p>
            <input className='w-[100%] px-2 py-1 border-black border-[1px] rounded-sm' placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)} value={lastName}/>

            </div>
            <div className='mt-4 w-[100%]'>
            <p className='font-semibold mb-1'>Email</p>
            <input className='w-[100%] px-2 py-1 border-black border-[1px] rounded-sm' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

            </div>
            <div className='mt-4 w-[100%]'>
            <p className='font-semibold mb-1'>Phone Number</p>
            <input className='w-[100%] px-2 py-1 border-black border-[1px] rounded-sm' placeholder='Phone Number' onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
            </div>
            <div className='mt-10 w-[100%] flex justify-between '>
                <button onClick={()=>closeModal()} className='text-gray-600 font-bold'>Cancel</button>
                <button onClick={()=>handleSubmit()} className='text-black font-extrabold'>Create</button>
            </div>
       


        </div>


    </div>
  )
}

export default CreateContactForm