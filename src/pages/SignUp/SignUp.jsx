import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContex } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import cover from '../../assets/others/authentication2.png'
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const SignUp = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()
    const {creatUser, updateUserProfile} = useContext(AuthContex);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = data => {
        creatUser(data.email, data.password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser)
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{
                // console.log('User Profile info Updated')
                
                //create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res=>{
                    if(res.data.insertedId){
                        console.log('user added to the db', res.data)
                        reset();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your profile has been created!",
                            showConfirmButton: false,
                            timer: 1500
                          });
                          navigate('/');
                    }
                })
            })
            .catch(error=>console.log(error))
        })
    }

    console.log(watch("name")) // watch input value by passing the name of it

    return (
        <div className="min-h-screen flex items-center justify-between min-w-full">
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row-reverse bg-base-200 min-h-fit py-10 shadow-2xl shadow-black/50 border-b-8  border-[#D1A054] justify-between w-full rounded-md items-center lg:px-10">
                <div className="text-center lg:text-left flex-1 flex items-center justify-center">
                    <img src={cover} className="" alt="" />
                </div>


                <div className="w-full max-w-md px-8">
                <h1 className="text-3xl font-bold text-center">Sign up!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" name="name" className="input input-bordered border" />
                            {errors.name && <span className="text-red-500">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                            })} name="password" placeholder="password" className="input input-bordered" />
                            {
                                errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )
                            }
                            {
                                errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password must be 6 characters</p>
                                )
                            }
                            {
                                errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password must be less than 20 characters</p>
                                )
                            }
                            {
                                errors.password?.type === "pattern" && (
                                    <p className="text-red-600">Password must have one uppercase, one lowercase and one special character.</p>
                                )
                            }
                            < label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-[#D1A054] hover:bg-[#654b24] text-white" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className="text-center pt-2 text-[#D1A054] "><small>Already have an account? <Link className="font-bold" to={'/login'}>Login Here</Link></small></p>
                    <div className='text-center flex flex-col items-center'>
                        <p className='pb-3 pt-2'>Or sign in with</p>

                        <SocialLogin/>

                    </div>
                </div>
            </div >
        </div >
    );
};

export default SignUp;