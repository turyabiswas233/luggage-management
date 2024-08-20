import React from "react";
const Support = () => {
  return (
    <div className="w-full text-black font-normal space-y-10 p-10">
      <h2 className="text-2xl font-bold"><a className="text-[#2a9b84]" href="/">Urloker</a> Support</h2>

      <p>
        We're here to help! If you have any questions or encounter issues while
        using Urloker, feel free to reach out to our support team.
      </p>

      <p>
        <span className="font-bold">Email: </span> <span className="underline">admn@urloker.com</span>
      </p>
      <p className="text-lg font-bold">
        We aim to respond to all inquiries within 24 hours.
      </p>

      <p className="text-lg font-bold">
        For faster resolution, please include the following information in your
        email:
      </p>

      <ul className="px-10 grid gap-3 list-disc">
        <li>A brief description of the issue you're facing.</li>
        <li>Any relevant screenshots or error messages.</li>
        <li>The Urloker version you're using(if applicable)</li>
      </ul>
      <p className="text-lg font-bold">
        Thank you for your patience and understanding!
      </p>
    </div>
  );
};

export default Support;
