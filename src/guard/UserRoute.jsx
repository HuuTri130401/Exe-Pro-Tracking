import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoutes = () => {
    const { user, role } = useSelector(state => state.userSlice);
    if (user && user.customer.role === 1) {
        return <Navigate to="/adminManageUsers" />;
    } else if (user && user.customer.role === 0) {
        return <Navigate to="/projects" />;
    } else {
        return <Outlet />;
    }
}

export default UserRoutes;