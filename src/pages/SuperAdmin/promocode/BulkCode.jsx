import React, { useState } from "react";
import axios from "axios";
import config from "../../../config";

function BulkPromoCodeGeneration() {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [codeCount, setCodeCount] = useState(0);
  const [expiresAt, setExpiresAt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send POST request to '/promocode/generate-bulk' endpoint with the form data
    const response = await axios.post(
      `${config.API_BASE_URL}/api/v1/promocode/generate-bulk`,
      {
        discountPercentage,
        codeCount,
        expiresAt,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
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
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={discountPercentage}
          min={0}
          max={100}
          onChange={(e) => setDiscountPercentage(e.target.value)}
        />
      </div>
      <div className="mb-4 space-y-4">
        <label
          htmlFor="discountPercentage"
          className="block text-sm font-medium text-gray-700"
        >
          Discount Percentage
        </label>
        <input
          type="datetime-local"
          name="expiresAt"
          id="expiredAt"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setExpiresAt(e.target.value)}
          value={expiresAt}
        />
      </div>
      <button
        type="submit"
        className="h-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-5"
      >
        Generate Promo Codes
      </button>
    </form>
  );
}

export default BulkPromoCodeGeneration;
