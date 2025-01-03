import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";
import { LuLoader2 } from "react-icons/lu";

function BulkPromoCodeGeneration() {
  const [discountPercentage, setDiscountPercentage] = useState(0);
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
        <input
          type="number"
          id="discountPercentage"
          placeholder="Discount Percentage"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={discountPercentage}
          min={0}
          max={100}
          required
          step={1}
          onChange={(e) => setDiscountPercentage(e.target.value)}
        />
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
      </div>
      <div>
        {/* code count */}
        <label
          htmlFor="codeCount"
          className="block text-sm font-medium text-gray-700"
        >
          Code Count
        </label>
        <select
          name="codeCount"
          id="codeCount"
          onChange={(e) => setCodeCount(e.target.value)}
        >
          <option value="1">1</option>
          <option value="1">5</option>
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
