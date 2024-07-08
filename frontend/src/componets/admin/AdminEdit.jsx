import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AdminEdit = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [data , setData] = useState();
    const [currImage , setCurrImage] = useState("");
    const { register, handleSubmit, setValue, reset, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
          name: '',
          mobile: '',
        }
    });

    const onSubmit = async(data) => {
        const trimmedData = {
            ...data,
            name:data.name.trim(),
        }
        console.log("trimmedData" , trimmedData);
        try {

            const response = await axios.put(`http://localhost:3000/api/editUser/${userId}` , trimmedData)
            if(response.data.success === true) {
                toast.success(response.data.message);
                navigate('/adminDashboard');

            }

        } catch (error) {
            console.log(error);
        }
    }

   const getUserData = async(id) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/getUser/${id}`);
        console.log("response.data.user)",response.data.user);
        setData(response.data.user);
        setCurrImage(response.data.user.image);


        reset({
            name: response?.data?.user?.name || "",
            mobile: response?.data?.user?.mobile || "",
        });
    } catch(err) {
        console.log(err);
    }
     
   }
console.log("data",data);
    useEffect(() => {
        getUserData(userId)
    },[])
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-950 to-black">
               <form className="bg-white p-6 rounded-lg w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit User</h2>
        <div className="flex items-center justify-center mb-4" >
            <img src={currImage} alt="User Avatar" className="rounded-full w-32 h-32" />
            {
                console.log("hehe" , currImage)
            }
          </div>
        <div className="mb-4">
          <input
            type="text"
            id="name"
            {...register('name' , {required:true ,validate: {
                notEmpty: value => value.trim() !== '' || 'Name cannot be just spaces'
              }})}
              
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
            {errors.name && <span className="text-red-600">This field is required</span>}
        </div>
        
        <div className="mb-4">
          <input
            type="text"
            id="mobile"
            {...register('mobile' , {required: true , pattern :  /^[0-9]{10}$/})}
            placeholder="Mobile"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.mobile && <span className="text-red-600">Enter a valid 10-digit mobile number</span>}
        </div>
       
        <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                
              >
               update
              </button>
      </form>
    </div>
    )
}

export default AdminEdit;
