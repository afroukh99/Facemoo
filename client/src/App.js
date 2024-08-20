import React, { useContext } from 'react'
import './App.css';
import {
  createBrowserRouter
  , RouterProvider
  , Outlet,
  Navigate
} from 'react-router-dom'
import Login from './pages/Login'
import Regester from './pages/Regester'
import Home from './pages/Home'
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';
import { AuthContext } from './context/authContext';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Chat from './pages/Chat';


const App = () => {

  const { currentUser } = useContext(AuthContext)
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <div className='flex'>
            <LeftBar />
            <div style={{ flex: '6' }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )

  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />
    }
    return children;
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        },
      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/chat",
      element: <Chat />
    },
    {
      path: "regester",
      element: <Regester />
    }
  ])

  return (
    <div className='dark'>
      <div className=''>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App