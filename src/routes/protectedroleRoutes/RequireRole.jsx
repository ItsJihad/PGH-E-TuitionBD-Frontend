import { Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/Loader/LoadingPage";
import UseAuth from "../../hooks/UseAuth";
import { useAxiosSecure } from "../../hooks/UseAxios";

export default function RequireRole({ allowedRole, children }) {
  const { currentUser } = UseAuth();
  const axios = useAxiosSecure();
  const location = useLocation();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await axios.get("/private/userrole");
        setRole(res.data.role);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [currentUser, axios]);

  if (loading) return <LoadingPage />;

  /* Not logged in */
  if (!currentUser) {
    return (
      <Navigate
        to="/signin"
        state={{ from: location }}
        replace
      />
    );
  }

  /* Role still missing (API issue safety) */
  if (!role) {
    return <Navigate to="/" replace />;
  }

  /* Wrong role */
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}