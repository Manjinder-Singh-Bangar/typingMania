import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { LoginForm, RegisterForm } from './components/Form.jsx'
import { Home } from './components/Home.jsx'

const router = createBrowserRouter([{
  path:"/",
  element: <App />,
  children:[
    {
      path:"",
      element:<Home />
    },
    {
      path:"login",
      element:<LoginForm />
    },
    {
      path:"register",
      element:<RegisterForm />
    },
    // {
    //   path:"logout",
    //   element:<Logout />
    // }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>
)
