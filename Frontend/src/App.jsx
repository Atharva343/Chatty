import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Singup";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { useAuth } from "./store/useAuth.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/themeStore.js";

const App = () => {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuth();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log(authUser);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"></Loader>
      </div>
    );
  return (
    <div data-theme={theme}>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? <Home></Home> : <Navigate to={"/login"}></Navigate>
          }
        ></Route>
        <Route
          path="/signup"
          element={!authUser ? <Signup></Signup> : <Navigate to="/"></Navigate>}
        ></Route>
        <Route
          path="/login"
          element={!authUser ? <Login></Login> : <Navigate to={"/"}></Navigate>}
        ></Route>
        <Route path="/settings" element={<Setting></Setting>}></Route>
        <Route
          path="/profile"
          element={
            authUser ? <Profile></Profile> : <Navigate to="/login"></Navigate>
          }
        ></Route>
      </Routes>
      <Toaster></Toaster>
    </div>
  );
};

export default App;
