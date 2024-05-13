import { createHashRouter, RouterProvider } from 'react-router-dom'
import HTMLPrettier from './pages/HTMLPrettier'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import JSONToTypeScript from './pages/JSONToTypeScript'
import ImageMeasurer from './pages/ImageMeasurer'
import Calendar from './pages/Calendar'

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
  },
  {
    path: '/calendar',
    element: <Calendar />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
