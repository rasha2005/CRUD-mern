import { useEffect, useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [data , setData] = useState({});

    useEffect(() => {
      const userId = localStorage.getItem('userId')
      console.log("userId",userId);
       const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/getUser/${userId}`)
            setData(response.data.user)
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    fetchUser();
    if(localStorage.getItem('userId') !== null){
      navigate('/dashboard');
    }
    },[])
    console.log("userData" , data._id);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-950 to-black">
      <div className="relative">
        {/* White container for user details */}
        <div className="max-w-xl w-full mx-auto bg-white rounded-lg shadow-md p-8 text-gray-800 relative">
          {/* Edit text positioned on top right */}
          <Link to={`/editProfile/${data?._id}`}  className="absolute top-0 right-0 text-sky-700 text-sm px-2 py-1">
            Edit Profile
          </Link>
          
          <h2 className="text-2xl font-bold mb-4">Welcome, {data.name}</h2>
          {/* Centered image */}
          <div className="flex items-center justify-center mb-4">
            <img src={data.image} alt="User Avatar" className="rounded-full w-32 h-32" />
          </div>
          
         
          <p className="text-lg">Email: {data.email}</p>
          {/* Add more user details as needed */}
        </div>
      </div>
    </div>
    )
}

export default UserDashboard