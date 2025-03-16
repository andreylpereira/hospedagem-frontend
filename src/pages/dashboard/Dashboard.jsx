import React from "react";
import Bread from "../../components/bread/Bread";

const Dashboard = () => {
  return (
    <div className="container d-flex justify-content-center min-vh-100 user-select-none">
      <div className="w-100">
        <div>
          <Bread current={"DASHBOARD"} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
