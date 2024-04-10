import React, { useEffect } from "react";

import { useAuth } from "../auth-pages/context";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
const Dashboard = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {

  }, [, navigate]);

  return (
    <div>
      <button onClick={logout}>Log out</button>
      <div>
        {isLoggedIn && (
          <>
            {/* Navigate to dashboard initially */}
            <button onClick={() => navigate("/dashboard/leads")}>
              click to navigate
            </button>
            {/* Other content for the Login component */}
          </>
        )}
        <Outlet />
      </div>
      <></>
    </div>
  );
};

export default Dashboard;
