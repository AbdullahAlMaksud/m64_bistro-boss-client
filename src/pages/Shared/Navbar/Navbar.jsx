import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContex } from "../../../Provider/AuthProvider";
import { FaBeer } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContex);
  const [cart] = useCart();

  console.log([cart])

  const handleLogOut = () => {
    logOut()
      .then(() => { })
      .then(err => console.log(err))
  }

  const navMenu = <>
    <li><Link to={'/'}>Home</Link></li>
    <li><Link to={'/menu'}>Our Menu</Link></li>
    <li><Link to={'/order/salad'}>Order Food</Link></li>
    <li><Link to={'/secret'}>Secret</Link></li>
    <li>
      <Link to={"/dashboard/cart"}>
          <button className="btn">
            <FaCartShopping className="mt-2" />
            <div className="badge badge-secondary">{cart.length}</div>
          </button>
      </Link>
    </li>
    {
      user ? <>
        {/* <span>{user?.displayName}</span> */}
        <button onClick={handleLogOut} className="btn btn-ghost">Logout</button>
      </> : <>
        <li><Link to={'/login'}>Login</Link></li>
      </>
    }
  </>


  return (
    <div>
      <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navMenu}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bisstro</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navMenu}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;