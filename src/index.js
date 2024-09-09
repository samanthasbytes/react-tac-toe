import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client'; // bridge between React components and the browser
import './styles.css';

import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
