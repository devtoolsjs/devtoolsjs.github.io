import { createHashRouter, RouterProvider } from 'react-router-dom'
import HTMLPrettier from './pages/HTMLPrettier'
import Home from './pages/Home'

const router = createHashRouter([
  {
    path: '*',
    element: <div>Not found</div>
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
