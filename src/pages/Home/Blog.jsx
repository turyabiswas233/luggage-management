import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faEye,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import furniture from "/img/home-two/furniture-1.jpg";
import luggage from "/img/home-two/luggage-1.svg";
import hospital from "/img/home-two/hospital-1.webp";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Blog() {
  const { t: tl } = useTranslation();
  const t = tl("home").blogSection; // Accessing blog section based on the current language

  const imageMap = {
    furniture,
    hospital,
    luggage,
  };

  return (
    <section
      className="pt-20 pb-14 bg-gradient-to-b from-gray-100 to-gray-200 scroll-mt-20"
      id="blog"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.posts.map((post, index) => (
            <div
              key={index}
              className="bg-white transition duration-500 transform hover:-translate-y-2 hover:shadow-2xl rounded-lg overflow-hidden"
            >
              <img
                className="w-full aspect-auto object-fill transition duration-500 transform hover:scale-110"
                src={imageMap[post.imageUrl]}
                alt="Blog"
                width={500}
                height={500}
              />

              <div className="p-6">
                <h3 className="font-semibold text-xl leading-tight truncate mb-2">
                  <a
                    href={"/blog-details/" + (index + 1)}
                    className="hover:text-blue-600 transition duration-300"
                    about={post?.comments}
                    title={post?.title}
                    aria-description={post?.comments}
                    aria-roledescription="blog url"
                  >
                    {post.title}
                  </a>
                </h3>
                <div className="mb-4">
                  <span className="text-gray-500">
                    By:
                    <span className="inline-block bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-300 px-2 py-1 rounded ml-2">
                      {post.author}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4 text-gray-500">
                  <span className="flex items-center transition duration-300 hover:text-blue-600">
                    <FontAwesomeIcon icon={faComments} className="mr-2" />
                    {post.comments} Comments
                  </span>
                  <span className="flex items-center transition duration-300 hover:text-blue-600">
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    {post.views} Views
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  to={"/blog-details/" + (index + 1)}
                  about={post?.comments}
                  title={post?.title}
                  aria-description={post?.comments}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 transition duration-300 font-semibold"
                >
                  Read More{" "}
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;
