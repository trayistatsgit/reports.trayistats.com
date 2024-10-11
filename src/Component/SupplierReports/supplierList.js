import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSuppliers } from '../../Slice/supplierSlice';

const SupplierDropdown = () => {
  const dispatch = useDispatch();

  const suppliers = useSelector((state) => state.supplier.suppliers);
  const status = useSelector((state) => state.supplier.status);
  const error = useSelector((state) => state.supplier.error);

  useEffect(() => {
    dispatch(fetchAllSuppliers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading suppliers...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Check if suppliers.Records is an array before mapping
  const supplierRecords = suppliers.Records || [];

  return (
    <div>
      <select className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none w-full">
        <option value="">Select a supplier</option>
        {supplierRecords.map((supplier) => (
          <option key={supplier.Name} value={supplier.Name}>
            {supplier.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SupplierDropdown;
