// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store/store'; // Import your store
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Component/Dashboard/Sidebar'; // Import Sidebar
import AppRoutes from './Routes/routes'; // Import your routes file

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          {/* Sidebar - it will be persistent */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
