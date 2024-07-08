import { useDispatch } from "react-redux";
import { setUserLogout } from "../../features/authSlice";
import { useNavigate, useNavigation } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const navigate =  useNavigate();
 const handleClick = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('jwtToken');
    dispatch(setUserLogout());
    navigate('/login')
    
 }

    return (
        <div className="bg-cyan-900 py-4 px-6 flex justify-between items-center">
            <div className="text-white text-xl font-bold">UMS</div>
            <ul className="flex space-x-4">
               
            <li onClick={handleClick} className="text-white cursor-pointer">Logout</li>
            </ul>
        </div>
    )
}

export default Header;