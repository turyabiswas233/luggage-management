import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { MdKeyboardArrowUp } from "react-icons/md";
const ScrollToTopButton = () => {
  // const [isVisible, setIsVisible] = useState(false);

  // const toggleVisibility = () => {
  //   if (window.pageYOffset > 300) {
  //     setIsVisible(true);
  //   } else {
  //     setIsVisible(false);
  //   }
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // useEffect(() => {
  //   window.addEventListener("scroll", toggleVisibility);
  //   return () => window.removeEventListener("scroll", toggleVisibility);
  // }, []);

  return (
    <div className="">
      <hr />
      <br />
      <button
        type="button"
        onClick={scrollToTop}
        className="p-4 pt-2 pb-2 text-white rounded-full shadow-lg ahover:bg-[#3f8184] abg-[#1a73a7] border-2 border-white flex items-center mx-auto my-6"
      >
        Back to top <MdKeyboardArrowUp className="animate-pulse" fontSize={"2em"} />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
