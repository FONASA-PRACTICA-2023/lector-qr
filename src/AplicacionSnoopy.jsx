import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./pages/Logout";
import FormularioLogin from "./pages/login/FormularioLogin";
import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";
import { AuthProvider } from "./hooks/useAuth";
import Formulario from "./pages/servicios/FormularioRegistro";
import FormularioRequestResponse from "./pages/servicios/FormularioRequestResponse";
import ListadoServiciosIntegracion from "./pages/servicios/ListadoServiciosIntegracion";
import { Modal } from "bootstrap";
import LectorQR from "./pages/analizarQR/LectorQR";
import Roles from "./pages/servicios/RolesUsuario";
import RecursosAutorizados from "./pages/recursos-Autorizados/RecursosAutorizados";
import Registros from "./pages/servicios/RegistroCredenciales";
import Encuentro from "./pages/servicios/DetalleEncuentroMedico";
import P from "./pages/servicios/Prueba";
function AplicacionSnoopy() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<LayoutPublico />}>
            <Route path="/login" element={<FormularioLogin />} />

            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route element={<LayoutFonasa />}>
            <Route
              path="/servicio-crear"
              element={<Formulario />}
            />
            <Route
              path="/Roles"
              element={<Roles />}
            />
            <Route
              path="/Prueba"
              element={<P />}
            />
            <Route
              path="/RegistrosCredenciales"
              element={<Registros />}
            />
           
            <Route
              path="/Encuentro/:id"
              element={<Encuentro />}
            />
            <Route
              path="/"
              element={<LectorQR />}
            />
            <Route
              path="/odal"
              element={<Modal />}
            />
            <Route
              path="/RolesAut"
              element={<RecursosAutorizados />}
            />

            <Route
              path="/servicio-editar/:id"
              element={<Formulario />}
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
