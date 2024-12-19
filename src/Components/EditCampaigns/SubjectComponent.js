import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const SubjectComponent = ({id}) => {
    const axiosPrivate=useAxiosPrivate()
    const [subject,setSubject]=useState('');
    const handleSubject=async()=>{
        console.log("hii subject")
        const response=await axiosPrivate.post('campaign/update-campaign-subject',{campaignid:id,subject:subject})

    }
  return (
    <div  className='px-4 py-4 '>
      <p className='text-lg font-semibold'>Subject</p>
      <input placeholder='Subject' className='border-2 px-2 py-1 mt-3' value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
      <button onClick={()=>handleSubject()}>Save</button>
    </div>
  )
}

export default SubjectComponent