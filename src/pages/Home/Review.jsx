import React from "react"; 
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import review1 from "/img/home-two/team-1.jpg";
import review2 from "/img/home-two/alisa.png";
import review3 from "/img/home-two/jack.png";
import review4 from "/img/home-two/jackson.jpeg";
import review5 from "/img/home-two/robert.jpg";
import { MdStar } from "react-icons/md";
import "./Review.css"; // Custom CSS for additional styling
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow custom-prev-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowLeft />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      className={`${className} custom-arrow custom-next-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowRight />
    </button>
  );
};

const Review = () => {
  const { t: tl } = useTranslation();

  const t = tl("home")?.reviewSection;

  const img = [review1, review2, review3, review4, review5];
  return (
    <section className="py-12 bg-gray-200">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Millions of customers all over the world
        </h1>
        <h3 className="text-2xl font-medium mt-3 mb-6 text-[#4A686A]">
          {t.title}
        </h3>
        <div className="relative">
          <Slide
            arrows={false}
            autoplay={false}
            indicators={true}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
            slidesToScroll={1}
            slidesToShow={1}
            transitionDuration={500}
          >
            {t.reviews.map((review, index) => (
              <div key={index} className="flex justify-center gap-2">
                <div className="bg-white shadow-md rounded-xl overflow-hidden border-2 transition duration-150 hover:border-teal-500 border-transparent max-w-md mx-auto p-6 ">
                  <img
                    src={img[index]}
                    alt={review.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover p-1 ring ring-teal-400"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {review.name}
                  </h3>
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <MdStar key={i} className="text-custom-teal" />
                    ))}
                  </div>

                  <p className="text-gray-700">{review.text}</p>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default Review;
