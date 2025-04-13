import React, {useState, useEffect } from "react";
import Bread from "../../components/bread/Bread";

const Dashboard = () => {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const iFrame = `https://app.powerbi.com/view?r=eyJrIjoiYTdlYmRhM2MtODVjZS00NjJhLWI3ZWMtOTMzYjE0NWZhYmUzIiwidCI6IjJjZjdkNGQ1LWJkMWItNDk1Ni1hY2Y4LTI5OTUzOTliMjE2OCJ9&t=${timestamp}`;

  return (
    <div className="container d-flex justify-content-center min-vh-100 user-select-none">
      <div className="w-100">
        <div>
          <Bread current={"DASHBOARD"} />
        </div>
        <div>
          <iframe
            className="shadow"
            title="quinta"
            width="100%"
            height="800"
            src={iFrame}
            frameborder="0"
            allowFullScreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
