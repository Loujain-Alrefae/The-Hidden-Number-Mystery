import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './i18n';
import Entro from './pages/Entro'
import GameOnEasy from './pages/GameOnEasy';
import GameOnMedium from './pages/GameOnMedium';
import GameOnHard from './pages/GameOnHard';

const routes = createBrowserRouter([
  {
    path:"/",
    element:<Entro/>
  },
  {
    path : "/level-easy",
    element : <GameOnEasy/>
  },
  {
    path : "/level-medium",
    element : <GameOnMedium/>
  },
  {
    path : "/level-hard",
    element : <GameOnHard/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={routes} />
  </StrictMode>,
)
