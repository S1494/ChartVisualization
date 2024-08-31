import "./App.css";
import Table from "./components/Table";
import Dashboard from "./pages/Dashboard";
import "./css/header.css";
import "./css/sidebar.css";
import "./css/table.css";
import "./css/dashboard.css";
import "./css/login.css";
import "./css/signup.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DataProvider } from "./contex/DataContext";
import Analytic from "./pages/Analytic";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/dashboard/table" element={<Table />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytic" element={<Analytic />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
