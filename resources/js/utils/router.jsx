import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import UserForm from "../pages/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/dashboard" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/user",
        element: <User />,
    },
    {
        path: "/user/create",
        element: <UserForm />,
    },
    {
        path: "/user/:id",
        element: <UserForm />,
    },
]);

export default router;
