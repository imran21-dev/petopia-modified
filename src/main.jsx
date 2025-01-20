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
import AdoptionRequest from './pages/AdoptionRequest';
import CreateCampaign from './pages/CreateCampaign';
import MyCampaigns from './pages/MyCampaigns';
import Updatecampaign from './pages/Updatecampaign';
import DonationCampaigns from './pages/DonationCampaigns';
import DonationDetails from './pages/DonationDetails';
import MyDonations from './pages/MyDonations';
import AllUsers from './pages/AllUsers';
import AdminRoute from './private/AdminRoute';
import AllPets from './pages/AllPets';
import UpdatePetAdmin from './pages/UpdatePetAdmin';
import AllDonations from './pages/AllDonations';
import UpdateAllCampaign from './pages/UpdateAllCampaign';

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
        path: '/donation-campaigns',
        element: <DonationCampaigns></DonationCampaigns>
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
        path: '/donation-details/:id',
        element: <DonationDetails></DonationDetails>
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
            element: <PrivateRoute><DashboardHome></DashboardHome></PrivateRoute>
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
          {
            path: '/dashboard/adoption-requests',
            element: <PrivateRoute><AdoptionRequest></AdoptionRequest></PrivateRoute>
          },
          {
            path: '/dashboard/create-campaign',
            element: <PrivateRoute><CreateCampaign></CreateCampaign></PrivateRoute>
          },
          {
            path: '/dashboard/my-campaign',
            element: <PrivateRoute><MyCampaigns></MyCampaigns></PrivateRoute>
          },
          {
            path: '/dashboard/update-campaign/:id',
            element: <PrivateRoute><Updatecampaign></Updatecampaign></PrivateRoute>
          },
          {
            path: '/dashboard/my-donations',
            element: <PrivateRoute><MyDonations></MyDonations></PrivateRoute>
          },
          {
            path: '/dashboard/users',
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
          },
          {
            path: '/dashboard/all-pets',
            element: <AdminRoute><AllPets></AllPets></AdminRoute>
          },
          {
            path: '/dashboard/update-pet-admin/:id',
            element: <AdminRoute><UpdatePetAdmin></UpdatePetAdmin></AdminRoute>
          },
          {
            path: '/dashboard/all-donation',
            element: <AdminRoute><AllDonations></AllDonations></AdminRoute>
          },
          {
            path: '/dashboard/update-all-campaign/:id',
            element: <PrivateRoute><UpdateAllCampaign></UpdateAllCampaign></PrivateRoute>
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
