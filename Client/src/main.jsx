import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TestModeProvider } from './Context/TextModeContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestModeProvider>
    <App />

    </TestModeProvider>
  </StrictMode>,
)
