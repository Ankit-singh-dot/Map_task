import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// index.js
import "leaflet/dist/leaflet.css";
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
