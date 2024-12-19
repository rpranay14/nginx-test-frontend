import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";

import { Outlet } from "react-router-dom";






const MainLayout = () => {
  const [isSidebarOpen,setIsSidebarOpen]=useState(true)

  return (
    <div className="flex h-screen w-[100%]">
      {/* Sidebar */}
      <Sidebar setSidebarOpen={()=>setIsSidebarOpen(!isSidebarOpen)}/>

      <main className={`mt-24 w-[100%] ${isSidebarOpen ? 'ml-72' : 'ml-24'}`}>
       <Outlet/>
      </main>
   
    </div>
  );
};

export default MainLayout;
