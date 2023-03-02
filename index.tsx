import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from 'src/App'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
