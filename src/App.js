import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/login/Login";
import ControlPanel from "./pages/control-panel/Control-Panel.jsx";
import PrivateRoute from "./utils/Private-Route.jsx";
import Accommodation from "./pages/accommodation/Accommodation.jsx";
import User from "./pages/user/User.jsx";
import Client from "./pages/client/Client.jsx";
import Amenity from "./pages/amenity/Amenity.jsx";

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
          >
            <Route path="acomodacoes" element={<Accommodation />} />
            <Route path="clientes" element={<Client />} />
            <Route path="usuarios" element={<User />} />
            <Route path="amenidades" element={<Amenity />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
