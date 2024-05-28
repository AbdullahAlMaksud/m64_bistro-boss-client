import { FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUsers, FaUtensils } from 'react-icons/fa';
import { MdEmail, MdReviews } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { FcContacts } from 'react-icons/fc';
import { GrContact } from 'react-icons/gr';
import { BiFoodMenu } from 'react-icons/bi';
import { FaPeopleGroup } from 'react-icons/fa6';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();

    //TODO: get isAdmin value from the database
    const isAdmin = useAdmin();
    console.log(isAdmin)

    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className='menu p-4'>
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to={'/dashboard/adminHome'}>
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/addItems'}>
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/manageItems'}>
                                    <FaList />
                                    Manage Item ({cart.length})
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/bookings'}>
                                    < FaBook/>
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/users'}>
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </li>
                        </> : <>
                            <li>
                                <NavLink to={'/dashboard/userHome'}>
                                    <FaHome />
                                    User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/reservation'}>
                                    <FaCalendar />
                                    Reservation
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/cart'}>
                                    <FaShoppingCart />
                                    My Cart ({cart.length})
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/review'}>
                                    <MdReviews />
                                    Add a Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/dashboard/bookins'}>
                                    <FaBook />
                                    My Bookings
                                </NavLink>
                            </li>
                        </>
                    }


                    <div className="divider"></div>

                    {/* Shared Navlink */}

                    <li>
                        <NavLink to={'/'}>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <BiFoodMenu />
                            Menu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <MdEmail />
                            Contact
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