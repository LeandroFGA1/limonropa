import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/index.css"
import { ThemeProvider as ModuleT } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModuleT>
      <App/>
    </ModuleT>
    
  </StrictMode>,
)
