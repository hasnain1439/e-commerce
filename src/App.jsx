import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dynamic from './pages/dynamic'
import HookHandler from './pages/HookHandler'
import CartPage from './pages/AddCart/CartPage'
import { Provider } from 'react-redux'
import { store } from './redux/store'


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
    {
      path: "/hook-handler",
      element: <HookHandler/>
    },
    {
      path: "/cart",
      element: <CartPage/>
    },
  ])


  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    </>
  )
}

export default App
