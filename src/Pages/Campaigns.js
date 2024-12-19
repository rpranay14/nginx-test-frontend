import React from 'react';
import { Link } from 'react-router-dom';
const campaign=[
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

const Campaigns = () => {
  return (
    <div className='pr-24 '>
      <div className='flex justify-between '>
        <p className='text-3xl font-bold'>Camapigns</p>
        <Link to="/create-campaign"><button className='bg-black text-white rounded-lg px-4 py-2'>Create Campaign</button></Link>
      </div>
      <div className=' w-[70%]  mt-4 '>
        {
          campaign.map((x)=>(
            <div className='flex justify-between border-2 px-4 py-2 w-[100%] rounded-lg mb-4 hover:bg-gray-200 cursor-pointer'>
              <div>
              <p className='font-semibold text-lg mb-2'>{x.name}</p>
              <p>{x.time}</p>
              <p>{x.status}</p>
              </div>
              <div>
                <div>
                  <p className='text-sm'>Receipients</p>
                  </div>
                  <div>
                    <p className='text-center'>{x.openers}</p>
                    </div>
                </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Campaigns