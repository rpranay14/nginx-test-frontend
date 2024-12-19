import React, { useEffect,useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';
const emailCampaigns=[
  {
    name:"Black Friday Sale",
    time:"Oct 21,2024 at 3:11PM",
    status:"Sent",
    type:"Email",
    openers:2,
    clickers:2
  },
  {
    name:"Christmas Sale",
    time:"Oct 21,2024 at 3:11PM",
    status:"Sent",
    type:"Email",
    openers:2,
    clickers:2
  }
]


const Dashboard = () => {
  const [campaign,setCampaign]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const axios=useAxiosPrivate()
  
  useEffect(()=>{
    const fetchCampaigns=async()=>{
      setLoading(true);
      const response=await axios.get('/campaign/get-campaigns');
      setCampaign(response.data.data);
      setLoading(false);
    }
    fetchCampaigns();
  },[])
  
  return (
    <>
    <h1 className="text-3xl font-bold">Hello Pranay</h1>
        <div className="flex mt-12 ">
          <div className="w-[68%]  border-2 px-4 py-2 rounded-xl">
            <div className="flex items-center justify-between ">
              <p className="font-semibold">Your Last Campaigns</p>
              <p className="font-bold text-lg cursor-pointer">Create a Campaign</p>
            </div>
            <div className="mt-2">
              {
                campaign?.map((x)=>(
                 <Link to={`/campaign/edit/${x._id}`}><div className="border-b-2 py-4 px-2 hover:bg-gray-200 cursor-pointer rounded-md">
                    <div>
                      <p className="font-semibold mb-1">{x?.name}</p>
                      <p className="text-xs mb-1">{x?.time}</p>
                      <div className="flex gap-5 text-xs"><p>{x?.status}</p>
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

export default Dashboard