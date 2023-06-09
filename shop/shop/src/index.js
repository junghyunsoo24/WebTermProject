import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import reportWebVitals from './reportWebVitals';
import PageController from './PageController';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PageController />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
); 

reportWebVitals();

/*
 *

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PageController />
    </BrowserRouter>
  </React.StrictMode>
);

*/


