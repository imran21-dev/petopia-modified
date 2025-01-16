import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
 
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './layout/HomePage';
import Home from './pages/Home';
import PetListing from './pages/PetListing';
import SignUp from './pages/SignUp';
import ContextApi from './auth/ContextApi';
import Login from './pages/Login';
import PetDetails from './pages/PetDetails';
import Dashboard from './layout/Dashboard';
import AddPet from './pages/AddPet';
import MyPets from './pages/MyPets';
import DashboardHome from './pages/DashboardHome';
import PrivateRoute from './private/PrivateRoute';
import DashboardRedirect from './components/ui/DashboardRedirect';
import UpdatePet from './pages/UpdatePet';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
    children:[
      {
        path: '/',
        element:<Home></Home>
      },
      {
        path: '/pet-listing',
        element: <PetListing></PetListing>
      },
      {
        path: '/registration',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/pet-details/:id',
        element: <PetDetails></PetDetails>
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: '/dashboard',
            element: <DashboardRedirect></DashboardRedirect>
          },
          {
            path: '/dashboard/home',
            element: <DashboardHome></DashboardHome>
          },
          {
            path: '/dashboard/add-pet',
            element:<PrivateRoute> <AddPet></AddPet></PrivateRoute>
          },
          {
            path: '/dashboard/my-pets',
            element: <PrivateRoute><MyPets></MyPets></PrivateRoute>
          },
          {
            path: '/dashboard/update-pet/:id',
            element: <PrivateRoute><UpdatePet></UpdatePet></PrivateRoute>
          },
        ]
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi>
      <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>

    </ContextApi>
  </StrictMode>,
)
