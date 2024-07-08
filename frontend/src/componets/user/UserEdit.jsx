import { useEffect, useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserEdit = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [data, setData] = useState();
    const [formState , setFormState] = useState({})
    const [img , setImg] = useState();
    const [currentImg , setCurrentImg] = useState('');
    const { register, handleSubmit, setValue, reset, formState: { errors, isValid }, watch } = useForm({
        defaultValues: {
          name: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          image: null
        }
    });

    

    const postImage = (pics) => {
        if (pics === undefined) {
            console.log("pics is undefined");
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            console.log("pics", pics);
            data.append("file", pics);
            data.append("upload_preset", "CRUD-mern");
            data.append("cloud_name", "crud-mern");
            fetch("https://api.cloudinary.com/v1_1/crud-mern/image/upload", {
                method: 'post',
                body: data,
            }).then((res) => res.json())
            .then(data => {
                setImg(data.url.toString());
                console.log("data url", data.url.toString());
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
            console.log("please select a valid image");
            return;
        }
    };
    const getImg = () => {
      if(img) {
        return img
      }else {
        return currentImg;
      }
    }

    const onSubmit = async (data) => {
      console.log("this is the image function" , getImg());
      const trimmedData = {
        ...data,
        name: data.name.trim(),
        file:getImg()
      };
      console.log("trimmedData" ,trimmedData);

      
        if (data) {
          console.log("llll")
            const formData = new FormData();
            formData.append("image", img);
            formData.append("username", data.name);
            formData.append("email", data.email);
            formData.append("mobile", data.mobile);
            formData.append("password", data.password);
            
            for (let pair of formData.entries()) {
              console.log(pair[0] + ': ' + pair[1]);
          }
  
            try {
             
                const response = await axios.put(`http://localhost:3000/api/updateUser/${userId}` , trimmedData)
                const content = response.data
                if (content.message === "email already exists") {
                    return toast.error("Email already exists");
                }
                toast.success("User Updated!");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error during form submission: ", error);
            }
        } else {
            console.log("Errors detected, form submission prevented");
            console.log("Errors", errors);
        }
    };

    const getUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/getUser/${userId}`);
            
            
            setData(response.data.user);
            setCurrentImg(response?.data?.user?.image || '');

            reset({
                name: response?.data?.user?.name || "",
              
                mobile: response?.data?.user?.mobile || "",
                password: null,
                image: null,
            });
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [userId, reset]);
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-950 to-black">
        <form className="bg-white p-6 rounded-lg w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
      
          {/* Centered image */}
          <div className="flex justify-center mb-4">
            <img src={currentImg} alt="User Avatar" className="rounded-full w-32 h-32" />
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
      
          <div className="mb-4">
            <input
              type="file"
              id="file"
              {...register('file' , {required:false })}
              onChange={(e) => postImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
      
          <div className="mb-4">
            <input
              type="password"
              id="password"
              {...register('password' , {required:false , minLength: { value: 6}})}
              placeholder="*********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.password && <span className="text-red-600">Password must be at least 6 characters long</span>}
          </div>
      
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Update
          </button>
        </form>
      </div>
    )
}

export default UserEdit;