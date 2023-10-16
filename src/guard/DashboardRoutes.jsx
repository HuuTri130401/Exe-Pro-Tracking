import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const DashboardRoutes = () => {
    let {user} = useSelector(state=>state.userSlice);
    return(
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default DashboardRoutes;