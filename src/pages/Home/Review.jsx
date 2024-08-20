import React from "react";
import Slider from "react-slick";
import review1 from '../../img/home-two/team-1.jpg';
import review2 from '../../img/home-two/team-1.jpg';
import review3 from '../../img/home-two/team-1.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Review.css'; // Custom CSS for additional styling
import translations from './translations'; // Import translations

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow custom-prev-arrow`} onClick={onClick} />;
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow custom-next-arrow`} onClick={onClick} />;
};

const Review = ({ currentLanguage = 'en' }) => {
  const t = translations[currentLanguage].reviewSection; // Accessing review section based on the current language

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#4A686A]">{t.title}</h2>
        <div className="relative">
          <Slider {...settings}>
            {t.reviews.map((review, index) => (
              <div key={index} className="flex justify-center">
                <div className="bg-white shadow-md rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 max-w-md mx-auto p-6 text-center">
                  <img src={review1} alt={review.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{review.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{review.position}</p>
                  <div className="flex justify-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <i key={i} className='bx bxs-star text-yellow-500'></i>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Review;