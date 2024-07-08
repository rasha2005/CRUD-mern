import { useDispatch } from "react-redux";
import { setAdminLogout} from "../../features/authSlice";
import { Link, useNavigate, useNavigation } from "react-router-dom";

const AdminHeader = () => {
    const dispatch = useDispatch();
    const navigate =  useNavigate();
 const handleClick = () => {
    localStorage.removeItem('adminId');
    localStorage.removeItem('jwtToken');
    dispatch(setAdminLogout());
    navigate('/admin')
    
 }

    return (
        <div className="bg-cyan-900 py-4 px-6 flex justify-between items-center">
            <div className="text-white text-xl font-bold">UMS</div>
            <ul className="flex space-x-4">
           <Link to='/createUser'><li className="text-white cursor-pointer" >Create User</li> </Link>
            <li onClick={handleClick} className="text-white cursor-pointer">Logout</li>
            </ul>
        </div>
    )
}

export default AdminHeader;