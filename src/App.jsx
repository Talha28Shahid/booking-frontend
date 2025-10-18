import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Register from "./pages/register";
import UserDashboard from "./pages/userDashboard";
import ManagerDashboard from "./pages/managerDashboard";
import AdminDashboard from "./pages/adminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/user"
          element={<UserDashboard />}
        />
        <Route
          path="/manager"
          element={<ManagerDashboard />}
        />
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
