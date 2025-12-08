import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout.jsx'
import { router } from './routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
     <MainLayout></MainLayout>
    </RouterProvider>
  </StrictMode>,
)
