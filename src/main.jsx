import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Render the React application inside the root HTML element.
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
