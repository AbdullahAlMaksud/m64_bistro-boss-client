import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const {googleSignIn} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()


    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
            const userInfo={
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data);
                navigate('/')
            })
        })
    }
    return (
        <div className='flex gap-4'>
            <button className='btn btn-circle btn-outline' disabled><BsFacebook /></button>
            <button onClick={handleGoogleSignIn} className='btn btn-circle btn-outline'><BsGoogle /></button>
            <button className='btn btn-circle btn-outline' disabled><BsGithub /></button>
        </div>
    );
};

export default SocialLogin;