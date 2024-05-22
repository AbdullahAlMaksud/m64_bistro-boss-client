import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';

const Testimonials = () => {
    const [review, setReview] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])

    console.log(review)
    return (
        <section>
            <SectionTitle subHeading={'What Our Client Say'} heading={'Testimonials'}>

            </SectionTitle>

            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        review.map(rev =>
                            <SwiperSlide key={rev._id}>
                                <div className='flex flex-col items-center m-16 mx-24 '>

                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={rev.rating}
                                        readOnly
                                    />

                                    <p className='py-8'>{rev.details}</p>
                                    <h3 className='text-orange-400 text-2xl'>{rev.name}</h3>
                                </div>
                            </SwiperSlide>
                        )
                    }

                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;