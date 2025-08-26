import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dynamic from './pages/dynamic'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/contact",
      element: <Contact/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/dynamic/:username",
      element: <Dynamic/>
    },
  ])


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
