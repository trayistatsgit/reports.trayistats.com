import React, { Suspense } from 'react';
const SupplierDropdown = React.lazy(() => import('./supplierList')); // Lazy load SupplierDropdown

const SupplierComponent = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold">Select Supplier</h2>
        </div>

        <Suspense fallback={<div>Loading supplier dropdown...</div>}>
          <SupplierDropdown /> {/* Supplier dropdown component */}
        </Suspense>

        {/* 4 Cards in a 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Card 1 */}
          <div className="bg-purple-200 p-6 rounded-lg">
            <h3 className="text-lg font-bold">A</h3>
            <img
              src="path/to/image1.png"
              alt="A"
              className="w-full h-40 object-cover mt-2 rounded-lg"
            />
          </div>

          {/* Card 2 */}
          <div className="bg-purple-200 p-6 rounded-lg">
            <h3 className="text-lg font-bold">B</h3>
            <img
              src="path/to/image2.png"
              alt="B"
              className="w-full h-40 object-cover mt-2 rounded-lg"
            />
          </div>

          {/* Card 3 */}
          <div className="bg-purple-200 p-6 rounded-lg">
            <h3 className="text-lg font-bold">C</h3>
            <img
              src="path/to/image3.png"
              alt="C"
              className="w-full h-40 object-cover mt-2 rounded-lg"
            />
          </div>

          {/* Card 4 */}
          <div className="bg-purple-200 p-6 rounded-lg">
            <h3 className="text-lg font-bold">D</h3>
            <img
              src="path/to/image4.png"
              alt="D"
              className="w-full h-40 object-cover mt-2 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierComponent;
