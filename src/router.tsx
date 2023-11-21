import { createHashRouter, RouterProvider } from 'react-router-dom'
import HTMLPrettier from './pages/HTMLPrettier'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import JSONToTypeScript from './pages/JSONToTypeScript'
import ImageMeasurer from './pages/ImageMeasurer'

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
  },
  {
    path: '/image/measurer',
    element: <ImageMeasurer />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
