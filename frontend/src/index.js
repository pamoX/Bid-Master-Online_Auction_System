// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// Create the root
const root = createRoot(document.getElementById('root'));

// Render the app with BrowserRouter and StrictMode
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// Optional: Performance measurement
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);


/* import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'; 


// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';

const root = createRoot(document.getElementById('root')); // Create a root
root.render(<App />); // Render the app

ReactDOM.render( 
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>, 
  document.getElementById("root") 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

 */