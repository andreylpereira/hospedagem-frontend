import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/login/Login";
import ControlPanel from "./pages/control-panel/Control-Panel.jsx";
import PrivateRoute from "./utils/Private-Route.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/painel"
            element={
              <PrivateRoute>
                <ControlPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
