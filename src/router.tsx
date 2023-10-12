import { createHashRouter, RouterProvider } from 'react-router-dom'
import HTMLPrettier from './pages/HTMLPrettier'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import JSONToTypeScript from './pages/JSONToTypeScript'

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
  },
  {
    path: '/json/to/typescript',
    element: <JSONToTypeScript />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
