// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../Component/Dashboard/Dashboard';
import CustomerReports from '../Component/CustomerReports/CustomerReports';
import SupplierReports from '../Component/SupplierReports/SupplierReports';
import TrayistatsReports from '../Component/TrayistatsReports/TrayistatsReports';
import Login from '../Component/Login/Login'; 

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customerReports" element={<CustomerReports />} />
      <Route path="/supplierReports" element={<SupplierReports />} />
      <Route path="/trayistatsReports" element={<TrayistatsReports />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
