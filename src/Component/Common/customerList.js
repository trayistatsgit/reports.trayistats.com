import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../../Slice/customerSlice';

const CustomerDropdown = () => {
  const dispatch = useDispatch();

  const customers = useSelector((state) => state.customer.customers);
  const status = useSelector((state) => state.customer.status);
  const error = useSelector((state) => state.customer.error);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading customers...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Check if customers.Records is an array before mapping
  const customerRecords = customers.Records || [];

  return (
    <div>
      <select className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none w-full">
        <option value="">Select Customer</option>
        {customerRecords.map((customer) => (
          <option key={customer.ClientName} value={customer.ClientName}>
            {customer.ClientName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomerDropdown;
