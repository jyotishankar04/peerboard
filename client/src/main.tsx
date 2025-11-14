import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './providers/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
 const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
    </QueryClientProvider>
   </BrowserRouter>
  </StrictMode>,
)
