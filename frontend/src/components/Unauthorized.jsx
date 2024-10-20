import { AlertTriangle } from "lucide-react";
import "../style/Unauthorized.css"; // Import the CSS file

export default function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <AlertTriangle className="icon" />
        <h1 className="heading">Unauthorized Access</h1>
        <p className="description">
          Sorry, you don't have permission to access this page. Please contact
          your administrator if you believe this is an error.
        </p>
      </div>
    </div>
  );
}
