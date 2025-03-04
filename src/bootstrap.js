import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const rootEl = document.getElementById("__APP_NAME__-dev-root");
const root = createRoot(rootEl);
root.render(<App />);

// Mount logic works for both standalone and embedded
// src/bootstrap.js
// const mount = (el) => {
//   if (!el) {
//     console.error('Mount container element not found!');
//     return;
//   }
//   ReactDOM.render(<App />, el);
// };

// // Development mount with explicit ID
// if (process.env.NODE_ENV === 'development') {
//   const devRootId = `${APP_NAME}-dev-root`; // Will be replaced by build script
//   const devRoot = document.getElementById(devRootId);
  
//   if (devRoot) {
//     mount(devRoot);
//   } else {
//     console.warn(`Development root element #${devRootId} not found`);
//   }
// }

// export { mount };