import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import './index.css'
import App from './App.tsx'

// Required for AG Grid v35+ when using modular builds (prevents error #272).
ModuleRegistry.registerModules([AllCommunityModule])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
