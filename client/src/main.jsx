import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoginProvider } from '../public/ContextApi/Logincontext.jsx'
import { ProjProvider } from '../public/ContextApi/ProjContext.jsx'
import { TaskProvider } from '../public/ContextApi/TaskContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GeotagProvider } from '../public/ContextApi/geotagcontext.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <TaskProvider>
    <ProjProvider>
    <LoginProvider >
    <GeotagProvider>
    <App />
    </GeotagProvider>
    </LoginProvider>
    </ProjProvider>
    </TaskProvider>
    </BrowserRouter>
)



