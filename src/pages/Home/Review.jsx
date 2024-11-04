import React from "react";
import "react-slideshow-image/dist/styles.css";
import config from "../../config";
const review1 = config.BUCKET_URL + "/files/img/home-two/team-1.jpg";
const review2 = config.BUCKET_URL + "/files/img/home-two/alisa.png";
const review3 = config.BUCKET_URL + "/files/img/home-two/jack.png";
const review4 = config.BUCKET_URL + "/files/img/home-two/jackson.jpeg";
const review5 = config.BUCKET_URL + "/files/img/home-two/robert.jpg";
import { MdStar } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "./Review.css"; // Custom CSS for additional styling

// swiper
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      aria-label="Previous"
      className={`${className || ""} custom-arrow custom-prev-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowLeft size={"1.5em"} />
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button
      aria-label="Forward"
      className={`${className || ""} custom-arrow custom-next-arrow`}
      onClick={onClick}
    >
      <MdKeyboardArrowRight size={"1.5em"} />
    </button>
  );
};

const Review = () => {
  const { t: tl } = useTranslation();

  const t = tl("home")?.reviewSection;

  const img = [review1, review2, review3, review4, review5];
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Trusted by millions of customers all over the world
        </h1>
        <h3 className="text-2xl font-medium mt-3 mb-6 text-[#4A686A]">
          {t.title}
        </h3>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={"auto"}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          className="flex gap-3 relative my-20 min-h-80"
        >
          {t.reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="grid gap-2 min-h-fit max-w-md h-80 bg-white shadow-md rounded-xl overflow-hidden border-2 border-teal-500 md:mx-auto p-6 mb-20"
            >
              <p className="text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block w-4 h-4 text-gray-400"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <br />
                {review.text}
              </p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <MdStar key={i} className="text-custom-teal" size={"1.3em"} />
                ))}
              </div>
              <div className="flex gap-3 items-start mt-4">
                <img
                  className="aspect-square -rotate-6 rounded-sm object-cover p-1 ring ring-teal-400"
                  src={img[index]}
                  width={80}
                  height={80}
                  alt={review.name}
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-sm">Locked in Melbourne </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwipeButton />
        </Swiper>
      </div>
    </section>
  );
};
const SwipeButton = () => {
  const swipe = useSwiper();
  return (
    <div className="absolute right-0 -bottom-0 flex gap-3 items-center justify-end">
      <CustomPrevArrow onClick={() => swipe.slidePrev()} />
      <CustomNextArrow onClick={() => swipe.slideNext()} />
    </div>
  );
};
export default Review;
