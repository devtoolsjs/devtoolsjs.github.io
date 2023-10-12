import { createHashRouter, RouterProvider } from 'react-router-dom'
import HTMLPrettier from './pages/HTMLPrettier'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const router = createHashRouter([
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/html/prettier',
    element: <HTMLPrettier />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
