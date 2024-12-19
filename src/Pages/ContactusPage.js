import React, { useEffect,useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { Link } from 'react-router-dom';
import CreateList from '../Components/Dashboard/CreateList';

const ContactusPage = () => {
    const axiosPrivate=useAxiosPrivate();
    const [list,setList]=useState(null);
    const [showList,setShowList]=useState(false)
    useEffect(() => {
        const fetchLists=async()=>{
            const response=await axiosPrivate('/list');
            setList(response.data.data)
        }
        fetchLists();
    }, [])
    
  
  return (
    <>
    {showList ? <CreateList closeModal={()=>setShowList(false)}/>:<></>}
    <div className='pr-24 '>

      <div className='flex justify-between '>
        <p className='text-3xl font-bold'>Lists</p>
        <button onClick={()=>setShowList(true)} className='bg-black text-white rounded-lg px-4 py-2'>Create Lists</button>
      </div>
      <div className=' w-[70%]  mt-4 '>
        {
          list?.map((x)=>(
            <div className='flex justify-between border-2 px-4 py-2 w-[100%] rounded-lg mb-4 hover:bg-gray-200 cursor-pointer'>
              <div>
              <p className='font-semibold text-lg mb-2'>{x?.name}</p>
              </div>
              <div>
                  <p className='text-sm'><span className='font-semibold'>Contacts:&nbsp;</span>{x?.customers.length}</p>
                  </div>
                 
               
                <div>
                   <Link to={`/list/${x?._id}`}><button className='bg-black text-white px-4 py-1 rounded-lg'>View</button></Link>
                </div>

            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default ContactusPage