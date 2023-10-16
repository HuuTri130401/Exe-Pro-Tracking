import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoutes = () => {
    let {user} = useSelector(state=>state.userSlice);
    
    return(
        user ? <Navigate to="/projects"/>: <Outlet/>
    )
}

export default UserRoutes;