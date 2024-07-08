import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const usersPerPage = 5;

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/deleteUser/${id}`);
            if (response.data.success === true) {
                setData(data.filter(user => user._id !== id));
                toast.success(response.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getUserList = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/getUserList");
            setData(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserList();
        if(localStorage.getItem('jwtToken') !== null) {
            navigate('/adminDashboard');
        }
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let filteredUsers = data.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page when search query changes
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-950 to-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search by name..."
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
                    />
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Picture
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentUsers.map((user) => (
                            <tr key={user._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center justify-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={user.image} alt="User" />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.mobile}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex justify-center items-center">
                                        <Link to={`/adminEdit/${user._id}`}>
                                            <span className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer">Edit</span>
                                        </Link>
                                        <span onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-900 cursor-pointer">Delete</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between mt-4">
                    {data.length > usersPerPage ? (
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            Previous
                        </button>
                    ) : (
                        <div></div>
                    )}
                    <span className="text-sm text-gray-500">Page {currentPage}</span>
                    {data.length > usersPerPage ? (
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            Next
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
