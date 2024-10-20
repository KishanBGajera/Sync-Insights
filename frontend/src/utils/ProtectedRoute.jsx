import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/AuthContext"; // Import AuthContext
import Unauthorized from "../components/Unauthorized";

function ProtectedRoute({ children, allowedRoleIds }) {
  const { Details } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Details) {
      setIsLoading(false);
      console.log("User Role ID:", Details.role_id);
    }
  }, [Details]);

  if (isLoading) {
    return (
      // <div>Access Denied. You do not have permission to view this page.</div>
      <Unauthorized />
    );
  }

  if (!Details) {
    console.log("User not logged in, redirecting to login page...");
    return <Navigate to="/" />;
  }

  if (!allowedRoleIds.includes(Details.role_id)) {
    console.log("Access denied for role ID:", Details.role_id);
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default ProtectedRoute;
