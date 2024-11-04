import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComp from "../Home/NavbarComp";
import { useTranslation } from "react-i18next";
const lng = localStorage.getItem("i18nextLng");
function BlogDetails() {
  const { blogid } = useParams();
  const [currentLanguage, setCurrentLanguage] = useState(
    lng ? (lng == "en-US" ? "en" : lng) : "en"
  );
  const { i18n, t } = useTranslation();
  const handleChangeLanguage = (lang) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };
  const blog = t("blogs").blogs.find((ele) => ele.id === blogid);

  const { head, desc, img, othersInfo } = blog;
  return (
    <div className="text-black font-normal">
      <NavbarComp
        setLanguage={handleChangeLanguage}
        currentLanguage={currentLanguage}
      />
      <div className="main py-32 px-5 space-y-6">
        <header>
          <h1 className="text-5xl font-extrabold">{head}</h1>

          <img
            className="object-cover aspect-video rounded-lg w-full max-w-3xl mx-auto"
            width={1920}
            height={1000}
            src={img}
            alt="image file"
          />
          <p className="text-lg">{desc}</p>
        </header>
        <div>
          {othersInfo.map((ele, id) => {
            return (
              <div key={id} className="my-5">
                <h3 className="text-2xl font-bold">{ele.title}</h3>
                {ele.desc.split("\n").map((pele) => {
                  return <p key={pele}>{pele}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
