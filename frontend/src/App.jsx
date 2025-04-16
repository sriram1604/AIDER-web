import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MentalHealth from "./pages/MentalHealth.jsx";
import AIAssistant from "./pages/AIAssistant.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import ProtectedRoute from "./components/ProtectRoute.jsx";
import ChatbotLayout from "./pages/ChatbotLayout.jsx";
import PrescriptionUpload from "./pages/PrescriptionStorage.jsx";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={
          
            <HomePage />
          
        } />
        <Route path="/mental-health" element={
          <ProtectedRoute>
            <MentalHealth />
          </ProtectedRoute>
        } />
        <Route path="/ai-assistant" element={
          <ProtectedRoute>
            <AIAssistant />
          </ProtectedRoute>
        } />
        
        <Route path="/medical-prescription" element={
          <ProtectedRoute>
            <PrescriptionUpload />
          </ProtectedRoute>
        } />
        <Route path="/:userType" element={<ChatbotLayout />} />
      </Routes>
        
    </Router>
  );
}

export default App;
