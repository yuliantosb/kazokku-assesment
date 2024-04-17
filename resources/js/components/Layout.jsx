import React, { useState } from "react";
import Logo from "../aseets/logo.png";
import Default from "../aseets/default.avif";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { message, Modal, App } from "antd";
import { Link, Navigate, useLocation } from "react-router-dom";

function Layout({ children }) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const [toggleOpen, setToggleOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(
            logout(({ success, message: theMessage }) => {
                if (!success) {
                    Modal.error({ title: "Error", content: theMessage });
                }
                message.success(theMessage);
            })
        );
    };

    return user ? (
        <App>
            <div className="flex flex-1 min-h-full w-full bg-slate-50">
                <div className="w-[300px] bg-white px-6 pt-8 border-r border-slate-100">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <img src={Logo} className="w-6 h-6" alt="" />
                            <span className="text-slate-800 font-medium text-lg">
                                Kazokku
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <span className="text-slate-400 uppercase text-xs">
                            Main Menu
                        </span>
                        <nav className="flex flex-col gap-6">
                            <Link
                                to="/dashboard"
                                className={`flex items-center gap-4 cursor-pointer ${
                                    pathname === "/dashboard"
                                        ? "bg-primary text-white"
                                        : "text-slate-600"
                                } hover:bg-slate-50 hover:text-slate-600 px-3 py-2 rounded-md`}
                            >
                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-2 -2 24 24"
                                    width="28"
                                    fill="currentColor"
                                >
                                    <path d="M2 2v4h4V2H2zm0-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm12 0h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v4h4V2h-4zm0 10h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm0 2v4h4v-4h-4zM2 12h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm0 2v4h4v-4H2z"></path>
                                </svg>
                                <span className="font-medium text-sm">
                                    Overview
                                </span>
                            </Link>
                            {user?.user?.type === "admin" && (
                                <Link
                                    to="/user"
                                    className={`flex items-center gap-4 cursor-pointer px-3 py-2 ${
                                        pathname.includes("/user")
                                            ? "bg-primary text-white"
                                            : "text-slate-600"
                                    } hover:bg-slate-50 hover:text-slate-600 rounded-md`}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="-2 -2 24 24"
                                        width="28"
                                        fill="currentColor"
                                    >
                                        <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-14a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V8a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2zM5.91 16.876a8.033 8.033 0 0 1-1.58-1.232 5.57 5.57 0 0 1 2.204-1.574 1 1 0 1 1 .733 1.86c-.532.21-.993.538-1.358.946zm8.144.022a3.652 3.652 0 0 0-1.41-.964 1 1 0 1 1 .712-1.868 5.65 5.65 0 0 1 2.284 1.607 8.032 8.032 0 0 1-1.586 1.225z"></path>
                                    </svg>
                                    <span className="font-medium text-sm">
                                        User
                                    </span>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
                <div className="flex flex-1 min-h-screen flex-col">
                    <div className="bg-white border-b-2 border-slate-100 px-4 py-2 justify-end flex gap-2 relative">
                        <div className="flex flex-col text-right">
                            <p className="text-slate-800 font-medium text-sm">
                                {user?.user?.name}
                            </p>
                            <p className="text-slate-600 text-xs">
                                {user?.user?.email}
                            </p>
                        </div>
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setToggleOpen(!toggleOpen)}
                        >
                            <img
                                src={Default}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            <button className="bg-transparent">
                                <svg
                                    className={`h-4 w-4 text-slate-800 ${
                                        toggleOpen ? "rotate-180" : "rotate-0"
                                    } ease-in-out duration-75`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="-5 -8 24 24"
                                    width="28"
                                    fill="currentColor"
                                >
                                    <path d="M7.071 5.314l4.95-4.95a1 1 0 1 1 1.414 1.414L7.778 7.435a1 1 0 0 1-1.414 0L.707 1.778A1 1 0 1 1 2.121.364l4.95 4.95z"></path>
                                </svg>
                            </button>
                        </div>
                        {toggleOpen && (
                            <div className="bg-white absolute top-14 right-2 p-2 rounded-md flex flex-col gap-2 drop-shadow-sm">
                                <div
                                    className="flex gap-2 hover:bg-slate-50 px-4 py-2 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    <svg
                                        className="w-5 h-5 text-slate-600"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="-5 -3 24 24"
                                        width="28"
                                        fill="currentColor"
                                    >
                                        <path d="M3.414 7.828h5.642a1 1 0 1 1 0 2H3.414l1.122 1.122a1 1 0 1 1-1.415 1.414L.293 9.536a.997.997 0 0 1 0-1.415L3.12 5.293a1 1 0 0 1 1.415 1.414L3.414 7.828zM13 0a1 1 0 0 1 1 1v16a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1z"></path>
                                    </svg>
                                    <label className="text-slate-600 text-sm cursor-pointer">
                                        Logout
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </App>
    ) : (
        <Navigate to="/login" />
    );
}

export default Layout;
