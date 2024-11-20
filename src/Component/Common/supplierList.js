import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSuppliers } from '../../Slice/supplierSlice';

const SupplierDropdown = ({ onChange }) => {
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

  // Ensure suppliers.Records is an array
  const supplierRecords = suppliers.Records || [];

  return (
    <div>
      <select
        className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none w-full"
        onChange={(e) => onChange(e.target.value)} // Call onChange prop when selection changes
      >
        <option value="">Select Supplier</option>
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
