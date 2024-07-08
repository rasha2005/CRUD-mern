import { useState } from "react";
import { useForm } from "react-hook-form"
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../../features/authSlice";


const Login = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState:{errors , isValid},
    watch,
} = useForm();
  const onSubmit = async(data) => {
    console.log("data",data)

    const datas = {
      ...data,
    }

    try {
      const response = await axios.post('http://localhost:3000/api/userLogin' , datas);
      console.log("heyyyy")
      const content =  response.data
      console.log("content" , content);

       if(content.success === false) {
        console.log("dudud")
        toast.error(content.message)
       }else {
        console.log("hehe")
        const token = response.data.token;
        console.log("1")
        const userId = response.data.userId
         
        console.log("2",userId)
        localStorage.setItem("jwtToken" , token)
        localStorage.setItem("userId" , userId);
        dispatch(setUserLogin(token)); 
        navigate('/dashboard')
       }
    }catch (err) {
      console.log("this one working?",err);
    }
  }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-950 to-black">
               <form className="bg-white p-6 rounded-lg w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-bold mb-4 text-center">   Sign In</h2>
       
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
            type="password"
            id="password"
            {...register('password' , {required:true })}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            
          />
          {errors.password && <span className="text-red-600">Password is required</span>}
        </div>
        <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Sign In
              </button>
      </form>
    </div>
    )
}

export default Login;