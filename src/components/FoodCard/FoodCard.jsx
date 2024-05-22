

const FoodCard = ({ item }) => {
    
    const {name, recipe, image, price} = item;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image}  /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4 py-2">${price}</p>
            <div className="card-body flex flex-col items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                <button className='btn btn-outline border-0 border-b-2 mt-4 uppercase bg-slate-100 border-orange-400'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;