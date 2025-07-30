import React, { useEffect} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "./UserContext";

function ProtectedRoute({ children }) {
    const {setUser,user ,setLoading,loading} = useContext(UserContext);
 
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4040/user/checkToken", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
