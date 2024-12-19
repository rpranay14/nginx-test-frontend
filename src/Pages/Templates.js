import React, { useEffect,useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useParams } from 'react-router-dom';

const Templates = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const axiosPrivate=useAxiosPrivate();
    const [templates,setTemplates]=useState([]);
    const [selectedTemplate,setSelectedTemplate]=useState('')
    useEffect(()=>{
        const fetchFunction=async()=>{
            const fetchTemplates=await axiosPrivate.get('/templates/get-templates');
            setTemplates(fetchTemplates.data.data);

        }
        fetchFunction();
      

    },[])
    const handleUpdateTemplate=async()=>{
        const response=await axiosPrivate.post('campaign/update-campaign-template',{campaignid:id,template:selectedTemplate})
        console.log("TEMPLATE",selectedTemplate);
        navigate(`/campaign/edit/${id}`)


    }
  return (
    <div className='px-4'>
        <p className='mb-12'>Templates</p>
        {
            templates?.map((x)=>(
                <img onClick={()=>setSelectedTemplate(x?._id)} src={x?.thumbLink} className='w-96 h-auto'/>
            ))
        }
        <div className='mt-12'>
            <button onClick={()=>handleUpdateTemplate()} className='bg-black text-white px-12 rounded-md py-2'>Add Template
            </button>
            </div>
    </div>
  )
}

export default Templates