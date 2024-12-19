import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import CreateContactForm from '../Components/Dashboard/CreateContactForm';

const ListByIdPage = () => {
    const axiosPrivate=useAxiosPrivate();
    const [openModal,setOpenModal]=useState(false)
    const [list,setList]=useState(null);
    const {listid}=useParams();
    useEffect(()=>{
        const fetchList=async()=>{
            const response=await axiosPrivate.post('/list/getlistbyid',{listid:listid});
            setList(response.data.data);
            console.log(response.data.data);
        }
        fetchList();
    },[])
  return (
    <>
    {openModal ?<CreateContactForm listid={listid} closeModal={()=>setOpenModal(false)}/> :<></>}
    <div className='flex w-[68%] justify-between '>
    <h1 className="text-3xl font-bold">Contacts</h1>
    <button onClick={()=>setOpenModal(true)} className='bg-black text-white rounded-md px-3 py-2'>Add a new contact</button>
    </div>
        <div className="flex mt-12 ">
          <div className="w-[68%]  border-2 px-4 py-2 rounded-xl">
           
            <div className="mt-2">
              {
                list?.customers?.map((x)=>(
                 <Link ><div className="border-b-2 py-4 px-2 hover:bg-gray-200 cursor-pointer rounded-md">
                    <div>
                      <p className="font-semibold mb-1">{x?.firstName} {x?.lastName}</p>
                      <p className="text-xs mb-1">{x?.email}</p>
                      <div className="flex gap-5 text-xs"><p>{x?.phoneNumber}</p>
                      <p>{x.type}</p>
                      </div>
                      </div>

                    </div>
                    </Link> 
                ))
              }
              
            </div>

          </div>
          <div>

          </div>
        </div>
        </>
  )
}

export default ListByIdPage