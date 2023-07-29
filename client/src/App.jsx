import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import AllListenings from "./pages/AllListenings";
import AddListening from "./pages/AddListening";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<AllListenings />} />
            <Route path="add-listening" element={<AddListening />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} closeOnClick />
      </BrowserRouter>
    </>
  );
}

export default App;
