
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './components/ui/provider'
import { RouterProvider } from 'react-router-dom'
import router from './router/routes'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)