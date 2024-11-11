import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import { LuLoader } from "react-icons/lu";
function PromoCodeEdit() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoKeys, setPromoKeys] = useState([]);
  const [selectedPromoKey, setSelectedPromoKey] = useState("");
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);
  async function getPromoCodes() {
    try {
      setLoading(true);
      const response = await axios.get(
        `${config.API_BASE_URL}/api/v1/promocode/grouped`
      );
      // setPromoCodes(response.data);
      const codeList = response.data?.groupedPromoCodes;
      setPromoKeys([]);
      setPromoCodes([]);

      Object.keys(codeList).forEach((key) => {
        console.log(codeList[key]);
        setPromoKeys((prev) => [...prev, key]);
        setPromoCodes((prev) => [...prev, codeList[key]]);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    // Fetch promo codes from the server
    getPromoCodes();
    return () => {
      getPromoCodes();
    };
  }, []);

  const handleEditExpiry = async () => {
    // Send PATCH request to '/promocode/:promoCode/edit-expiry' endpoint with the new expiry date
    const response = await axios.patch(
      `/promocode/${selectedPromoCode}/edit-expiry`,
      {
        expiresAt,
      }
    );
  };
  const filteredPromoCodes = promoCodes?.filter(
    (f) => f.discountPercentage === Number(selectedPromoKey)
  );
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="my-4">
          <b>
            Promo code list:{" "}
            <small className="bg-slate-900 text-slate-50 px-4 py-1 rounded-md">
              {selectedPromoCode || "-- --"}
            </small>
          </b>
        </p>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 transition-colors text-blue-50 rounded-full text-sm h-fit font-black px-4 py-1"
        >
          Reload
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ul className="space-y-2 p-2 max-h-64 overflow-y-auto bg-white rounded-lg border-2 border-black">
          <select onChange={(e) => setSelectedPromoKey(e.target.value)}>
            {promoKeys.map((key, id) => {
              return <option value={"key"}>{key}</option>;
            })}
          </select>
          {filteredPromoCodes.map((code, id) => (
            <li
              key={code + id}
              //   onClick={() => setSelectedPromoCode(code)}
              className={`cursor-pointer p-2 rounded text-cyan-900 ${
                selectedPromoCode === code
                  ? "bg-gray-800 text-gray-200"
                  : "hover:bg-gray-200 "
              }`}
            >
              {/* {code} */}
            </li>
          ))}
        </ul>
        {selectedPromoCode ? (
          <div className="mt-4">
            {expiresAt}
            <input
              type="datetime-local"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleEditExpiry}
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Edit Expiry
            </button>
          </div>
        ) : (
          <h4>Select a promo-code to update expiry time</h4>
        )}
      </div>
    </div>
  );
}
export default PromoCodeEdit;
