import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import SideMenu from './components/layout/sideNav';
import Home from "./components/Home/home";
import Report from "./components/Reports/report";
import User from "./components/User/user";
import Withdrawal from "./components/Account/withdrawal";
import Deposit from "./components/Account/deposit";
import { Toaster } from 'react-hot-toast';
import Balance from "./components/Account/balance";

const App = () => {

  return (
      <>
          <SideMenu />
          <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdrawal" element={<Withdrawal />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/report" element={<Report />} />
              <Route path="/user" element={<User />} />
          </Routes>
          <Toaster position='top-right' reverseOrder={false}  toastOptions={{
              duration: 3000,
              success: {
                  style: {
                      borderLeftColor: '#3daf8d',
                  },
                  iconTheme: {
                      primary: '#3daf8d',
                  },
              },
              error: {
                  duration: 5000,
                  iconTheme: {
                      primary: '#9e0442',
                  }
              }}} />
      </>

  );
}

export default App;
