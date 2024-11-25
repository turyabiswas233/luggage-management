import React from "react";
const HH = ({ type, heading }) => {
  switch (type) {
    case "h1":
      return (
        <h1
          className="text-black font-extrabold text-4xl"
          dangerouslySetInnerHTML={{ __html: heading }}
        ></h1>
      );
    case "h2":
      return (
        <h2
          className="text-black font-extrabold text-3xl"
          dangerouslySetInnerHTML={{ __html: heading }}
        ></h2>
      );
    case "h3":
      return (
        <h3
          className="text-black font-extrabold text-2xl"
          dangerouslySetInnerHTML={{ __html: heading }}
        ></h3>
      );
    case "h4":
      return (
        <h4
          className="text-black font-extrabold text-xl"
          dangerouslySetInnerHTML={{ __html: heading }}
        ></h4>
      );
    case "h5":
      return (
        <h5
          className="text-black font-extrabold text-lg"
          dangerouslySetInnerHTML={{ __html: heading }}
        ></h5>
      );
    default:
      return (
        <h2
          className="text-black font-extrabold text-3xl"
          dangerouslySetInnerHTML={{ __html: heading }}
        ></h2>
      );
  }
};

const Template = ({ type, heading, para, lsType, list }) => {
  console.log(heading, type);
  return (
    <div className="space-y-5 my-5">
      <HH type={type} heading={heading} />
      {para &&
        para?.map((pp) => (
          <p className="text-base" dangerouslySetInnerHTML={{ __html: pp }}></p>
        ))}

      {list && (
        <ul
          className={`px-5 ${
            lsType == "numeric" ? "list-decimal" : "list-disc"
          } text-lg`}
        >
          {list.map((item, index) => (
            <li
              key={index}
              className="text-base"
              dangerouslySetInnerHTML={{ __html: item }}
            ></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Template;
