import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css';
import { ApiProvider } from './context/ApiContext';

// import App from './App.tsx'
import {App} from './router'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  // </StrictMode>,
)
