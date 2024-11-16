import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";
import Login from "../pages/login/Login.jsx";
import ControlPanel from "../pages/control-panel/ControlPanel.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Accommodation from "../pages/accommodation/Accommodation.jsx";
import Reservation from "../pages/reservation/Reservation.jsx";
import User from "../pages/user/User.jsx";
import Client from "../pages/client/Client.jsx";
import Amenity from "../pages/amenity/Amenity.jsx";
import { Toaster } from 'sonner'

const Routers = () => {
  return (<>
  <Router>
  <Toaster richColors />
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/painel" element={<Navigate to="/painel/acomodacoes" />} />

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
          <Route
            path="usuarios"
            element={
              <PrivateRoute requiredRole="ADMINISTRADOR">
                <User />
              </PrivateRoute>
            }
          />

          <Route path="amenidades" element={<Amenity />} />
          <Route path="reservas" element={<Reservation />} />
        </Route>
      </Routes>
    </AuthProvider>
  </Router>;
  </>)
};

export default Routers;
