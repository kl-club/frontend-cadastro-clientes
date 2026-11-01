import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RegistrationPage from './view/pages/RegistrationPage/RegistrationPage';

// O QR Code aponta para: https://seu-dominio/cadastro?token=<token>
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={<RegistrationPage />} />
        <Route path="*" element={<Navigate to="/cadastro" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
