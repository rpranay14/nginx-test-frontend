import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NavbarComponent from './Components/NavbarComponent';
import SignIn from './Pages/SignIn';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Pricing from './Pages/Pricing';
import SuccessPage from './Pages/SuccessPage';
import MainLayout from './Pages/MainLayout';
import Campaigns from './Pages/Campaigns';
import CreateCampaignPage from './Pages/CreateCampaignPage';
import EditCampaign from './Pages/EditCampaign';
import Templates from './Pages/Templates';
import ContactusPage from './Pages/ContactusPage';
import ListByIdPage from './Pages/ListByIdPage';
import Template from './Components/Template';




const Main = () => {
  return (
    <>
    <NavbarComponent/>
    <Routes>
     
        <Route path='/' element={<HomePage/>}/>
        <Route path='/template' element={<Template/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<MainLayout/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/campaigns' element={<Campaigns/>}/>
        <Route path='/lists' element={<ContactusPage/>}/>
        <Route path='/create-campaign' element={<CreateCampaignPage/>}/>
        <Route path="/campaign/edit/:id" element={<EditCampaign/>}/>
        <Route path="/campaign/edit/:id/design" element={<Templates/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
        <Route path='/list/:listid' element={<ListByIdPage/>}/>
        </Route>
        </Route>
    </Routes>
    </>
  )
}

export default Main