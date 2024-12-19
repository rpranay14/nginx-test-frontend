import React, { useEffect, useState } from 'react';
import { 
  Home, 
  Users, 
  Settings, 
  Calendar, 
  MessageSquare, 
  Menu 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({setSidebarOpen}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen)
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`
      ${isSidebarOpen ? 'w-64' : 'w-20'} 
      bg-gray-800 
      text-white 
      transition-all 
      duration-300 
      ease-in-out 
      fixed
      left-0 
      top-0 
      h-full 
      overflow-hidden
      z-40
    `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isSidebarOpen && (
          <h1 className="text-xl font-bold">Dashboard</h1>
        )}
        <button 
          onClick={toggleSidebar} 
          className="hover:bg-gray-700 p-2 rounded"
        >
          <Menu />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="mt-8">
        <ul>
          {[
            { icon: Home, label: 'Home' ,link:"/dashboard"},
            { icon: Users, label: 'Campaigns',link:"/campaigns" },
            { icon: Calendar, label: 'Lists',link:'/lists' },
            { icon: MessageSquare, label: 'Messages' },
            { icon: Settings, label: 'Settings' }
          ].map((item, index) => (
            <Link to={item.link}><li 
              key={index} 
              className="hover:bg-gray-700 cursor-pointer"
            >
              <a 
                className="flex items-center p-4 space-x-3"
              >
                <item.icon className="h-6 w-6" />
                {isSidebarOpen && (
                 <span className="truncate">{item.label}</span>
                )}
              </a>
            </li></Link>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar