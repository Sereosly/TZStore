import App from './App';
import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './lib/context/UserProvider';
import '../src/styles/index.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  </StrictMode>,
);