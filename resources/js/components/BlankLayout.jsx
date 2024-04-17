import React from "react";

function BlankLayout({ children }) {
    return (
        <div className="bg-slate-50 flex flex-col items-center min-h-screen w-full pt-20">
            {children}
        </div>
    );
}

export default BlankLayout;
