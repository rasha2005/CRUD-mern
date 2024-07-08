import React from 'react';
import { Route,  Navigate } from 'react-router-dom';


export const isAdminLoggedIn = () => {
  
    return localStorage.getItem('jwtToken') === null;
  };
  
  export const AdminProtectedRoute = ({ element }) => {

    console.log("hehehhehhehe",isAdminLoggedIn())
    return isAdminLoggedIn() ?  <Navigate to="/admin" /> : element;
  };
  
  