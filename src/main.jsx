import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n';
import Entro from './pages/Entro'
import GamePage from './pages/GamePage';

const routes = createBrowserRouter([
  {
    path:"/",
    element:<Entro/>
  },
  {
    path : "/level/:level",
    element : <GamePage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={routes}/>
      
  </StrictMode>,
)
