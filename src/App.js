import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from 'react';
import Home from './pages/Home';
import Item from './pages/Item';

import Category from './pages/Category';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //to define pages
import Categories from './pages/Categories';
import Order from './pages/Order';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ProtectedRoute from './utils/ProtectedRoute';


function App() {


  return (
    <div className="App">
            <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute/>}>
              <Route path= "/" element={<Home/>}/>
              <Route path= "/item/:id" element={<Item/>}/>
              <Route path= "/category" element={<Categories/>}/>
              <Route path= "/category/:id" element={<Category/>}/>
              <Route path="/order" element={<Order/>}/>
              </Route>
              

            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

            </Routes>
            </BrowserRouter>

    </div>
  );
}



export default App;
