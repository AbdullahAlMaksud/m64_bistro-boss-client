import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContex } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import cover from '../../assets/others/authentication2.png'
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {
    const { signIn } = useContext(AuthContex);
    const [disable, setDisable] = useState(true)
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';
    console.log('state in the, location', location.state);
    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password })
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: {
                        popup: `
                    animate__animated
                    animate__fadeInDown
                  `
                    },
                    hideClass: {
                        popup: `
                    animate__animated
                    animate__fadeOutUp
                  `
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-between min-w-full">
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row bg-base-200 min-h-fit py-10 shadow-2xl shadow-black/50 border-b-8  border-[#D1A054] justify-between w-full rounded-md items-center lg:px-10">


                <div className="text-center lg:text-left flex-1 flex items-center justify-center">
                    <img src={cover} className="" alt="" />
                </div>



                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-center">Login now!</h1>
                    <form onSubmit={handleLogin} className="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                < LoadCanvasTemplate />
                            </label>
                            {/* <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder='Type the captcha' className="input input-bordered" required /> */}
                            {/* <button className='btn btn-outline btn-xs mt-2'>Validate</button> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#D1A054] hover:bg-[#654b24] text-white">Login</button>
                        </div>
                    </form>
                    <p className="text-center pt-2 text-[#D1A054] "><small>New Here? <Link className='font-bold' to={'/signup'}>Create an account</Link></small></p>
                    <div className='text-center flex flex-col items-center'>
                        <p className='pb-3 pt-2'>Or sign in with</p>

                        <SocialLogin/>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;