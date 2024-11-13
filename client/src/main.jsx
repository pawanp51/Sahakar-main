import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LoginProvider } from '../public/ContextApi/Logincontext.jsx'
import { ProjProvider } from '../public/ContextApi/ProjContext.jsx'
import { TaskProvider } from '../public/ContextApi/TaskContext.jsx'
createRoot(document.getElementById('root')).render(
    <TaskProvider>
    <ProjProvider>
    <LoginProvider >
    <App />
    </LoginProvider>
    </ProjProvider>
    </TaskProvider>
)



