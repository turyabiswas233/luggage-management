import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";
import { LuLoader2 } from "react-icons/lu";

function BulkPromoCodeGeneration({ setIsTrigger }) {
  const [discountPercentage, setDiscountPercentage] = useState('101');
  const [codeCount, setCodeCount] = useState(10);
  const [expiresAt, setExpiresAt] = useState("");
  const [message, setMessage] = useState("");
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      // Send POST request to '/promocode/generate-bulk' endpoint with the form data
      const response = await axios.post(
        `${config.API_BASE_URL}/api/v1/promocode/generate-bulk`,
        {
          discountPercentage: Number.parseInt(discountPercentage),
          codeCount,
          expiresAt: new Date(expiresAt).toISOString(),
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
      console.log(error);
    } finally {
      setLoad(false);
      setIsTrigger(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
      <div
        className="fixed bg-slate-900/60 top-0 left-0 w-full h-full z-50  backdrop-blur-sm aria-hidden:hidden"
        aria-hidden={message.length == 0}
      >
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-md">
          <p className="font-bold">Message</p>
          <p>{message}</p>
          <button
            className="bg-slate-900 hover:bg-slate-700 transition-colors text-white px-4 py-2 rounded-md mt-4"
            type="button"
            onClick={() => {
              setMessage("");
            }}
          >
            Ok
          </button>
        </div>
      </div>
      <div className="mb-4 space-y-4">
        <label
          htmlFor="discountPercentage"
          className="block text-sm font-medium text-gray-700"
        >
          Discount Percentage
        </label>
        <select
          name="discountPercentage"
          id="discountPercentage"
          placeholder="Discount Percentage"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={discountPercentage}
          required
          onChange={(e) => setDiscountPercentage(e.target.value)}
        >
          <option value="101">Super Free</option>
          <option value="5">5%</option>
          <option value="10">10%</option>
          <option value="15">15%</option>
          <option value="20">20%</option>
          <option value="25">25%</option>
          <option value="30">30%</option>
          <option value="35">35%</option>
          <option value="40">40%</option>
          <option value="45">45%</option>
          <option value="50">50%</option>
          <option value="55">55%</option>
          <option value="60">60%</option>
          <option value="65">65%</option>
          <option value="70">70%</option>
          <option value="75">75%</option>
          <option value="80">80%</option>
          <option value="85">85%</option>
          <option value="90">90%</option>
          <option value="95">95%</option>
          <option value="100">100%</option>
        </select>
      </div>
      <div className="mb-4 space-y-4">
        <label
          htmlFor="expiresAtC"
          className="block text-sm font-medium text-gray-700"
        >
          Expire At
        </label>
        <input
          type="datetime-local"
          name="expiresAt"
          id="expiresAtC"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setExpiresAt(e.target.value)}
          value={expiresAt}
        />

        {expiresAt && (
          <pre className="max-w-full text-wrap ring-1 rounded-md p-2 bg-white shadow-md text-xs select-none hover:bg-blue-100/40">
            International Time: {new Date(expiresAt).toUTCString()}`
          </pre>
        )}
      </div>
      <div className="mb-4 space-y-4">
        {/* code count */}
        <label
          htmlFor="codeCount"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Promo codes to Generate
        </label>
        <select
          name="codeCount"
          id="codeCount"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={codeCount}
          onChange={(e) => setCodeCount(e.target.value)}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <button
        type="submit"
        className="h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
      >
        {load ? (
          <LuLoader2 className="mx-auto animate-spin" />
        ) : (
          "Generate Promo Codes"
        )}
      </button>
    </form>
  );
}

export default BulkPromoCodeGeneration;
