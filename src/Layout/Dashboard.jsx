import { FaBook, FaCalendar, FaHome, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Dashboard = () => {
    const [cart] = useCart();

    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu p-4'>
                    <li>
                        <NavLink to={'/dashboard/home'}>
                            <FaHome/>
                            User Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}>
                            <FaCalendar/>
                            Reservation
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart/>
                            My Cart ({cart.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'}>
                            <MdReviews/>
                            Add a Review
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/bookins'}>
                            <FaBook/>
                            My Bookings
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}>
                            <FaHome/>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <FaSearch/>
                            Menu
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className='flex-1 p-4'>
                <Outlet>

                </Outlet>
            </div>
        </div>
    );
};

export default Dashboard;