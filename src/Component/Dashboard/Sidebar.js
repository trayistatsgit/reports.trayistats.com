import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import mainLogo from '../../assets/images/mainLogo.png';
import dashboardImage from '../../assets/images/TS Dashboard Image.png';

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-white p-4">
      <div className="text-2xl font-bold mb-8">
        <img src={mainLogo} alt="Trayistats Logo" className="w-[60px] h-[50px] ml-20" />
      </div>
      <div className='border bg-[#F8F8F8] rounded-xl'>
        <ul className="space-y-2">
          {/* Using NavLink for navigation */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive ? 'text-lg font-semibold bg-gray-300 p-2 w-full text-left' : 'text-lg font-semibold hover:bg-gray-200 p-2 w-full text-left'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customerReports"
              className={({ isActive }) => 
                isActive ? 'text-lg font-semibold bg-gray-300 p-2 w-full text-left' : 'text-lg font-semibold hover:bg-gray-200 p-2 w-full text-left'
              }
            >
              Customer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/supplierReports"
              className={({ isActive }) => 
                isActive ? 'text-lg font-semibold bg-gray-300 p-2 w-full text-left' : 'text-lg font-semibold hover:bg-gray-200 p-2 w-full text-left'
              }
            >
              Supplier
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trayistatsReports"
              className={({ isActive }) => 
                isActive ? 'text-lg font-semibold bg-gray-300 p-2 w-full text-left' : 'text-lg font-semibold hover:bg-gray-200 p-2 w-full text-left'
              }
            >
              Trayistats Report
            </NavLink>
          </li>
        </ul>
        <div className="text-2xl font-bold mb-8">
          <img src={dashboardImage} alt="Trayistats Logo" className="mt-20" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
