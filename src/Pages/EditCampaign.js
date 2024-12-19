import React, { useEffect, useState } from 'react'
import ReceipientsComponent from '../Components/EditCampaigns/ReceipientsComponent';
import { useParams } from 'react-router-dom';
import SubjectComponent from '../Components/EditCampaigns/SubjectComponent';
import { useNavigate } from 'react-router-dom';
import ScheduleModal from '../Components/EditCampaigns/ScheduleModal';

const EditCampaign = () => {
    const navigate=useNavigate();
    const {id}=useParams();
    const [selectedOption,setSelectedOption]=useState(-1);
    useEffect(()=>{

    },[]);
    const [openModal,setOpenModal]=useState(false);
  return (

    <div className='w-[50%] mx-auto'>
        {openModal ? <ScheduleModal id={id}/> :<></>}
        <div className='flex justify-between items-center'>
            <p className='text-xl font-bold '>Pranay</p>
            <button onClick={()=>setOpenModal(true)} className='bg-black text-white px-5 rounded-md py-2'>Schedule</button>
        </div>
        <div className='mt-10  border-2   py-2 rounded-md'>
            <div className='flex items-center justify-between px-4 py-8 border-b-2'>
                <p className='text-lg font-bold'>Sender</p>
                <button className='text-white bg-black px-4 py-2 rounded-md   w-[12rem]'>Manage Sender</button>
            </div>
            <div className='flex items-center justify-between px-4 py-8 border-b-2'>
                <div>
                <p className='text-lg font-bold'>Receipients</p>
                <p>The people who receive your campaign</p>
                </div>
                <button onClick={()=>setSelectedOption(1)} className='text-white bg-black px-4 py-2 rounded-md w-[12rem] '>Manage Recipients</button>
               
            </div>
            {selectedOption===1 ? <ReceipientsComponent id={id}/>:<></>}
            <div className='flex items-center justify-between px-4 py-8 border-b-2'>
                <div>
                <p className='text-lg font-bold'>Subject</p>
                <p>Add a subject line for this campaign.</p>
                </div>
               
                <button onClick={()=>setSelectedOption(2)} className='text-white bg-black px-4 py-2 rounded-md  w-[12rem]'>Manage Subject</button>
             
            </div>
            {selectedOption===2 ? <SubjectComponent id={id}/>:<></>}
            <div className='flex items-center justify-between px-4 py-8 '>
                <div>
                <p className='text-lg font-bold'>Design</p>
                <p>Create your email content.</p>
                </div>
               
                <button onClick={()=>navigate(`/campaign/edit/${id}/design`)} className='text-white bg-black px-4 py-2 rounded-md  w-[12rem]'>Start Designing</button>
               
            </div>
        </div>
    </div>
  )
}

export default EditCampaign