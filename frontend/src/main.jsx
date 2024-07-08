import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/user/login.jsx'
import Signup from './pages/user/signup.jsx'
import Dashboard from './pages/user/dashboard.jsx'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

import Edit from './pages/user/edit.jsx'
import { store } from './app/store';
import {ProtectedRouteLogin,ProtectedRouteLogout ,AdminProtectedRoute , AdminProtectedRouteLogout}  from './auth/ProtectedRoute.jsx'
import LoginAdmin from './pages/admin/loginAdmin.jsx'
import DashboardAdmin from './pages/admin/dashboardAdmin.jsx'
import EditAdmin from './pages/admin/editAdmin.jsx'

import UserCreate from './pages/admin/UserCreate.jsx'

const AppLayout = () => {
  return (
    <div >
     
       
        <ToastContainer/>
        <Outlet />
        
      
    </div>
  )
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path:'/',
        element:<ProtectedRouteLogout element={<Login />} />
      },
      {
        path:'/signup',
        element:<ProtectedRouteLogout element={<Signup />} />
      },
      {
        path:'/dashboard',
        element: <ProtectedRouteLogin element={<Dashboard />}/>
      },
      {
        path:'/editProfile/:userId',
        element:<ProtectedRouteLogin element={<Edit />} />

      },
      {
        path:'/admin',
        element:<AdminProtectedRouteLogout element={<LoginAdmin />} />
      },
      {
        path:'/adminDashboard',
        element:<AdminProtectedRoute element={<DashboardAdmin />} />
      },
      {
        path:'/adminEdit/:userId',
        element:<EditAdmin />
      },
      {
        path:'/createUser',
        element:<UserCreate />
      }
    ]
  }
])

  ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
   
      <RouterProvider router={appRouter} />
    
  </Provider>
)

