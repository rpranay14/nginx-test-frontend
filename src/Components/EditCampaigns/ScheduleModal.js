import React, { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const ScheduleModal = ({id}) => {
  const axiosPrivate=useAxiosPrivate()
  const options=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  const timeOptions=[0,5,10,15,20,25,30,35,40,45,50,55]
    const [selectedOption,setSelectedOption]=useState();
    const [date,setDate]=useState();
    const [hour,setHour]=useState();
    const [min,setMin]=useState();
    const handleSubmit=async()=>{
      let scheduleForNow
      let time=""
  if(selectedOption==='schedule-later'){
    scheduleForNow=false
    time=
    new Date(date).setUTCHours(0, 0, 0, 0) + hour * 60 * 60 * 1000 + min * 60 * 1000;
    console.log(new Date(date).setUTCHours(0, 0, 0, 0),time,"time")
  }
  else{
    scheduleForNow=true
  }
  const response=await axiosPrivate.post('/campaign/send-campaign',{time:time,scheduleForNow:scheduleForNow,campaignid:id})
    }
  return (
    <div className='h-screen bg-white fixed top-0 right-0 w-[20rem]'>
        <p className='mt-24 text-xl ml-3 font-bold'>Schedule </p>
    <div className='mt-5 ml-3'>
       <label className='flex gap-1'> <input name='selected-grp' onChange={()=>setSelectedOption('send-now')}  checked={selectedOption==="send-now"} type='radio' value="send-now" />Send Now</label>
       <label className='flex gap-1 mt-2'> <input name='selected-grp' type='radio' onChange={()=>setSelectedOption('schedule-later')}  checked={selectedOption==="schedule-later"} value="schedule-later" />Schedule for later</label>
       {selectedOption==='schedule-later' ?
       <div>
        <p className='mt-5 font-bold'>Date</p>
        <input value={date} onChange={(e)=>setDate(e.target.value)} className='' type='date'/>
        <p className='mt-3 font-bold'>Time</p>
       <div>
        <select onChange={(e)=>setHour(e.target.value)} className='w-24 mr-1'>
          {options.map((x)=>(
            <option>{x}</option>
          ))}
        </select>
        <select value={min} onChange={(e)=>setMin(e.target.value)} className='w-24'>
          {timeOptions.map((x)=>(
            <option>{x}</option>
          ))}
        </select>
       </div>
       </div>:<></>}

    </div>
    <button onClick={()=>handleSubmit()} className='absolute bottom-5 right-5 bg-black text-white px-4 py-1  rounded-md'>Send</button>
    </div>
  )
}

export default ScheduleModal