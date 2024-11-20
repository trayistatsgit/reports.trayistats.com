import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Component/Dashboard/Sidebar';
import AppRoutes from './Routes/routes';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex">
          <Sidebar />

          <div className="flex-1">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
