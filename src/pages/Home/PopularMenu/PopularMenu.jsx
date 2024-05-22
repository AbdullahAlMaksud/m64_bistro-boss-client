import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const PopularMenu = () => {
    const [menu, setMenu] = useState([])

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const popularItem = data.filter(item=>item.category === 'popular')
                setMenu(popularItem)
            })
    }, [])

    console.log(menu)

    return (
        <section className='mb-12'>
            <SectionTitle
                heading={'From Our Menu'}
                subHeading={'Popular Item'}
            />

            <div className='grid md:grid-cols-2 gap-10'>
                {
                    menu.map(item=><MenuItem key={item._id} item={item}/>)
                }
            </div>
            <div className='flex justify-center'>
            <button className='btn btn-outline border-0 border-b-2 mt-4'>View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;