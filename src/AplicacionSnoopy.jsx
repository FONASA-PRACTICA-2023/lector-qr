import { BrowserRouter, Route, Routes } from "react-router-dom";

import Logout from "./pages/Logout";
import FormularioLogin from "./pages/login/FormularioLogin";

import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";
import { AuthProvider } from "./hooks/useAuth";

import FormularioServicioIntegracion from "./pages/servicios/FormularioServicioIntegracion";
import FormularioRequestResponse from "./pages/servicios/FormularioRequestResponse";
import ListadoServiciosIntegracion from "./pages/servicios/ListadoServiciosIntegracion";
import Muestreo from "./pages/analizarQR/Muestreo";
import { Modal } from "bootstrap";

function AplicacionSnoopy() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutPublico />}>
            <Route path="/login" element={<FormularioLogin />} />
            <Route
              path="/"
              element={<Muestreo />}
            />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<LayoutFonasa />}>
            <Route
              path="/servicio-crear"
              element={<FormularioServicioIntegracion />}
            />
            
            <Route
              path="/odal"
              element={<Modal/>}
            />
          
            <Route
              path="/servicio-editar/:id"
              element={<FormularioServicioIntegracion />}
            />
            <Route
              path="/add-request/:id"
              element={<FormularioRequestResponse />}
            />
            <Route
              path="/registros"
              element={<ListadoServiciosIntegracion />}
            />
          </Route>

          <Route path="*" element={() => "404 Not Found"} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AplicacionSnoopy;
