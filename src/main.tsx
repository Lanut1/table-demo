import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BookProvider } from './context/BookContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <ThemeProvider> */}
      <CssBaseline />
      <BookProvider>
        <App />
      </BookProvider>
    {/* </ThemeProvider> */}
  </StrictMode>,
)
