import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutFonasa from "./components/LayoutFonasa";
import LayoutPublico from "./components/LayoutPublico";
import { AuthProvider } from "./hooks/useAuth";
import LectorQR from "./pages/analizarQR/LectorQR";
import Logout from "./pages/Logout";
import FormularioLogin from "./pages/login/FormularioLogin";
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
              path="/lector"
              element={<LectorQR />}
            />
          </Route>

          <Route path="*" element={() => "404 Not Found"} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AplicacionSnoopy;
