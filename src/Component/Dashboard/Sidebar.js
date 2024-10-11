import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for navigation
import mainLogo from '../../assets/images/mainLogo.png';
import dashboardImage from '../../assets/images/TS Dashboard Image.png';

const Sidebar = () => {
  return (
    <div className="w-[20%] min-h-screen bg-white p-6 flex flex-col justify-between">
      {/* Logo Section */}
      <div className="flex flex-col items-center">
        <img src={mainLogo} alt="Trayistats Logo" className="w-16 h-auto mb-8" />
      </div>

      {/* Navigation Links */}
      <div className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive
                  ? 'text-lg font-semibold bg-purple-100 text-purple-800 p-3 rounded-md block transition duration-300'
                  : 'text-lg font-semibold hover:bg-gray-200 p-3 rounded-md block transition duration-300'
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customerReports"
              className={({ isActive }) => 
                isActive
                  ? 'text-lg font-semibold bg-purple-100 text-purple-800 p-3 rounded-md block transition duration-300'
                  : 'text-lg font-semibold hover:bg-gray-200 p-3 rounded-md block transition duration-300'
              }
            >
              Customer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/supplierReports"
              className={({ isActive }) => 
                isActive
                  ? 'text-lg font-semibold bg-purple-100 text-purple-800 p-3 rounded-md block transition duration-300'
                  : 'text-lg font-semibold hover:bg-gray-200 p-3 rounded-md block transition duration-300'
              }
            >
              Supplier
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trayistatsReports"
              className={({ isActive }) => 
                isActive
                  ? 'text-lg font-semibold bg-purple-100 text-purple-800 p-3 rounded-md block transition duration-300'
                  : 'text-lg font-semibold hover:bg-gray-200 p-3 rounded-md block transition duration-300'
              }
            >
              Trayistats Report
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Dashboard Image */}
      <div className="flex flex-col items-center mt-10">
        <img src={dashboardImage} alt="Trayistats Dashboard" className="w-[200px] h-auto mt-8" />
      </div>
    </div>
  );
};

export default Sidebar;
