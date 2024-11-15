import React from "react";
const HH = ({ type, heading }) => {
  console.log(type, heading);
  switch (type) {
    case "h1":
      return <h1 className="text-black font-bold text-4xl">{heading}</h1>;
    case "h2":
      return <h2 className="text-black font-bold text-3xl">{heading}</h2>;
    case "h3":
      return <h3 className="text-black font-bold text-2xl">{heading}</h3>;
    case "h4":
      return <h4 className="text-black font-bold text-xl">{heading}</h4>;
    default:
      return <h1 className="text-black font-bold text-3xl">{heading}</h1>;
  }
};

const Template = ({ type, heading, para, lsType, list }) => {
  console.log(heading, type);
  return (
    <div className="space-y-5 my-5">
      <HH type={type} heading={heading} />
      {para && para?.map((pp) => <p className="text-base">{pp}</p>)}

      {list && (
        <ul
          className={`px-5 ${
            lsType == "numeric" ? "list-decimal" : "list-disc"
          } text-lg`}
        >
          {list.map((item, index) => (
            <li key={index} className="text-base" dangerouslySetInnerHTML={{ __html: item }}></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Template;
