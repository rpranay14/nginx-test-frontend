import React, { useEffect,useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const ReceipientsComponent = ({id}) => {
    const axiosPrivate=useAxiosPrivate();
    const [selectedList,setSelectedList]=useState([])
    const [list,setList]=useState(null);
    const [loading,setLoading]=useState(false);
    const handleSubmit=(selected)=>{
        console.log("HIIII",selected,list)
        let isPresent=false

        selectedList.forEach((list)=>{
            if(list._id===selected._id){
                console.log("HIIII1",selected,list)
               isPresent=true;
            }
         
        })
        if(isPresent){
            console.log("HIIII2",selected,list)
            const newList=selectedList.filter((x)=>x._id!==selected._id);
            setSelectedList(newList);
        }
        else{
            console.log("HIIII3",selected,list)
            setSelectedList((prev)=>[...prev,selected]);
        }


    }
    useEffect(()=>{
        const fetchList=async()=>{
            setLoading(true)
            const response=await axiosPrivate.get('/list');
            setList(response.data.data);
            setLoading(false)

        }
        fetchList();
       
    },[])
    const updateCampaign=async()=>{
        const listids=[];
        selectedList.forEach((x)=>{
            listids.push(x._id);
        })

        const response=await axiosPrivate.post('/campaign/update-campaign',{campaignid:id,lists:listids});
        console.log(response.data,"response")
    }
  return (
    <div className='px-4 py-4 '>
        <p className='text-lg font-semibold'>Receipients</p>
        <p className='mt-5 font-semibold'>Send to</p>
        <div className='mt-2 text-sm'>
        {list?.map((x)=>(
            <p onClick={()=>handleSubmit(x)}>{x.name}</p>
        ))}
        </div>
        <p>Selected List</p>
        <div>
            {selectedList.map((x)=>(
                <p>{x.name}</p>
            ))}
        </div>
        <div className='flex items-end justify-end '>
        <button onClick={()=>updateCampaign()} className='bg-black text-white px-3 py-2 rounded-md'>Save</button>
        </div>
      

       
    </div>
  )
}

export default ReceipientsComponent