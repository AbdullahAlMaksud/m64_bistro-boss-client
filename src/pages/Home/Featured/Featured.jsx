import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-20'>
            <SectionTitle heading={'Featured Item'} subHeading={'Check it out'}>

            </SectionTitle>

            <div className='md:flex justify-center items-center bg-black bg-opacity-60 pb-28 pt-2 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:m-10'>
                    <p>Aug 20, 2029</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam vitae consequatur ducimus provident error quam quia nobis beatae fuga mollitia dolores, a recusandae reprehenderit blanditiis natus, ad harum placeat voluptatum ex, iste id. Tempora sed quos facilis quo ad quas praesentium doloremque consectetur neque laudantium quam, cum, omnis numquam? Et?</p>
                    <button className='btn btn-outline border-0 border-b-2 mt-4'>Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;