// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './Store/store'; // Import your store
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/routes'; // Import your routes file

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
