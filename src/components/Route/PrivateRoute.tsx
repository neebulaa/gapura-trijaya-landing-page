import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

export default function PrivateRoute() {
	const { user } = useAuth();
	return user ? <Outlet /> : <Navigate to="login" />;
}
