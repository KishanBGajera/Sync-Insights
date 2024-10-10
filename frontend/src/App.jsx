import "./App.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";

function App() {
  return (
    <div>
      <AuthProvider>
        <Outlet></Outlet>
      </AuthProvider>
    </div>
  );
}

export default App;
