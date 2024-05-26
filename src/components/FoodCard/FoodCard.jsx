import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {

    const { name, recipe, image, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            //send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: `${name} is Added to your cart`,
                      showConfirmButton: false,
                      timer: 1000
                    });
                    //refetch the cart to items count
                    refetch()
                }
                })

        }
        else {

            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4 py-2">${price}</p>
            <div className="card-body flex flex-col items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">

                    <button
                        onClick={handleAddToCart}
                        className='btn btn-outline border-0 border-b-2 mt-4 uppercase bg-slate-100 border-orange-400'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;