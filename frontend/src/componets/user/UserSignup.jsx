import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {useDispatch} from "react-redux"
import { setUserLogin } from "../../features/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const UserSignup = () => {

    const [img , setImg] = useState(null);
    const [loading , setLoding] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState:{errors , isValid},
        watch,
    } = useForm();

    const postImage = (pics) => {
        setLoding(true);
        if(pics === undefined) {
          console.log("pics is undefined");
          return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png") {
          const data = new FormData();
          console.log("pics" , pics)
          data.append("file" , pics);
          data.append("upload_preset" , "CRUD-mern");
          data.append("cloud_name" , "crud-mern");
          
          fetch("https://api.cloudinary.com/v1_1/crud-mern/image/upload" , {
            method:'post',
            body: data,
          }).then((res) => res.json())
          .then(data => {
            console.log("hehe")
            setImg(data.url.toString());
            console.log("hehe")
            console.log("data url",data.url.toString());
            setLoding(false);
          })
          .catch((err) => {
            console.log(err);
            setLoding(false);
          });
        }else {
          console.log("please select a message");
          setLoding(false);
          return;
        }
      };

    const onSubmit = async(data) => {

        const trimmedData = {
            ...data,
            name: data.name.trim(),
            file:img
          };

         

          try {
            const response = await axios.post('http://localhost:3000/api/insertUser', trimmedData);
            if(response.data.sucess === false ) {
             toast.error(response.data.message)
            }
            const token = response.data.token;
            const userId = response.data.user_id
             
            dispatch(setUserLogin(token)); 

            localStorage.setItem("jwtToken" , token)
            localStorage.setItem("userId" , userId);
            navigate('/dashboard')
          }catch (err) {
            console.log(err);
          }
      };

    return (
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-950 to-black">
               <form className="bg-white p-6 rounded-lg w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
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
            type="email"
            id="email"
            {...register('email' , {required:true ,  pattern: /^\S+@\S+$/})}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
           {errors.email && <span className="text-red-600">Enter a valid email address</span>}
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
        <div className="mb-4">
          <input
            type="file"
            id="file"
            {...register('file' , {required:true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            onChange={(e) => postImage(e.target.files[0])}
          />
          {errors.file && <span className="text-red-600">invalid file</span>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            {...register('password' , {required:true , minLength: { value: 6}})}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.password && <span className="text-red-600">Password must be at least 6 characters long</span>}
        </div>
        <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                
              >
                Sign Up
              </button>
      </form>
    </div>
    )
}

export default UserSignup;