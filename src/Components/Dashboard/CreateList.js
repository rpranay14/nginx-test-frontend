import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const CreateList = ({closeModal}) => {
    const axios=useAxiosPrivate();
    const [error,setError]=useState('')
    const [listName,setListName]=useState('')
    const handleSubmit=async()=>{
        const response=await axios.post('/list/addNewList',{listName});
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
            <p className='font-semibold mb-1'>List Name</p>
            <input className='w-[100%] px-2 py-1 border-black border-[1px] rounded-sm' placeholder='List Name' onChange={(e)=>setListName(e.target.value)} value={listName}/>

            </div>
           
            <div className='mt-10 w-[100%] flex justify-between '>
                <button onClick={()=>closeModal()} className='text-gray-600 font-bold'>Cancel</button>
                <button onClick={()=>handleSubmit()} className='text-black font-extrabold'>Create</button>
            </div>
       


        </div>


    </div>
  )
}

export default CreateList