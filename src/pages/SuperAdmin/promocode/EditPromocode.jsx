import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import { LuLoader } from "react-icons/lu";
function PromoCodeEdit() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoKeys, setPromoKeys] = useState([]);
  const [selectedPromoKey, setSelectedPromoKey] = useState(0);
  const [selectedPromoCode, setSelectedPromoCode] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [codeType, setCodeType] = useState(true);

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
        // if(key == 10)
        // console.log(codeList[key]);
        setPromoKeys((prev) => [...prev, key]);
        setPromoCodes((prev) => [...prev, ...codeList[key]]);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // console.log(promoKeys);
    }
  }
  useEffect(() => {
    // Fetch promo codes from the server
    getPromoCodes();
  }, []);

  const handleEditExpiry = async () => {
    // Send PATCH request to '/promocode/:promoCode/edit-expiry' endpoint with the new expiry date
    const response = await axios.patch(
      `${config.API_BASE_URL}/api/v1/promocode/${
        promoCodes.find((f) => f?._id === selectedPromoCode)?.code
      }/edit-expiry`,
      {
        expiresAt: expiresAt,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    alert(response.data.message || "Failed to update Expiry Date");
  };
  const handleToggleActive = async () => {
    try {
      // Send PATCH request to '/promocode/:promoCode/toggle' endpoint
      const response = await axios.patch(
        `${config.API_BASE_URL}/api/v1/promocode/${
          promoCodes.find((f) => f?._id === selectedPromoCode)?.code
        }/toggle-status`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert(response.data.message || "Failed to update Expiry Date");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message || "Failed to update Expiry Date");
    }
  };

  console.log(codeType);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <p className="my-4">
          <b>Promo code list:</b>
        </p>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 transition-colors text-blue-50 rounded-full text-sm h-fit font-black px-4 py-1"
          onClick={() => getPromoCodes()}
        >
          Reload
        </button>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-5 my-5">
          <select onChange={(e) => setSelectedPromoKey(Number(e.target.value))}>
            <option value={""}>Select a code</option>
            {promoKeys.map((key, id) => {
              return (
                <option key={`key-${key}-${id}`} value={key}>
                  {key}
                </option>
              );
            })}
          </select>
          <div className="bg-white border-2 border-black grid grid-cols-2 gap-5 p-1">
            <button
              className="bg-green-500 text-white rounded-md"
              type="button"
              onClick={(e) => setCodeType(true)}
            >
              Active
            </button>
            <button
              className="bg-red-500 text-white rounded-md"
              type="button"
              onClick={(e) => setCodeType(false)}
            >
              Inactive
            </button>
          </div>
        </div>
        <section className="space-y-2 p-2 bg-white rounded-lg border-2 border-black">
          <table className="w-full overflow-y-hidden">
            <thead className="table-header-group bg-black text-white text-center">
              <tr>
                <th>Code</th>
                <th>{"Discount(%)"}</th>
                <th>Expire Time</th>
              </tr>
            </thead>

            <tbody className="space-y-2 my-2 overflow-y-scroll text-center h-auto">
              {promoCodes
                ?.filter(
                  (f) =>
                    f.discountPercentage === selectedPromoKey &&
                    codeType == Boolean(f.isActive)
                )
                .sort((a, b) =>
                  new Date(a.expiresAt).getTime() -
                    new Date(b.expiresAt).getTime() <=
                  0
                    ? 1
                    : -1
                )
                .map((code, id) => (
                 (new Date().getTime() < new Date(code.expiresAt).getTime()) && <tr
                    key={code + id}
                    onClick={() => setSelectedPromoCode(code._id)}
                    className={`cursor-pointer p-2 rounded text-cyan-900 ${
                      id % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                    } hover:bg-custom-teal-deep/70 hover:text-white `}
                  >
                    <td className="p-2">{code.code}</td>
                    <td className="p-2">{code.discountPercentage}%</td>
                    <td className="p-2">
                      {new Date(code?.expiresAt).toLocaleString("en-AU", {
                        timeZone: "Australia/Sydney",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        {selectedPromoCode && (
          <div className="space-y-3 fixed w-svw h-svh bg-black bg-opacity-80 top-0 right-0 backdrop-blur flex items-center justify-center p-5">
            <div className="bg-white p-10 rounded-lg shadow-xl space-y-2">
              <p>
                Modify Promo code:{" "}
                <small className="bg-slate-900 text-slate-50 px-4 py-1 rounded-md">
                  {promoCodes.find((f) => f?._id == selectedPromoCode)?.code ||
                    "-- --"}
                </small>
              </p>
              <p className="flex flex-auto flex-wrap">
                Current Expiry Time:{" "}
                <small className="bg-slate-900 text-slate-50 px-4 py-1 rounded-md">
                  {new Date(expiresAt).toLocaleString("en-AU", {
                    timeZone: "Australia/Sydney",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }) || "-- --"}{" "}
                  (Australia/Sydney)
                </small>
              </p>
              <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleEditExpiry}
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Edit Expiry
                </button>
                <button
                  onClick={handleToggleActive}
                  type="button"
                  className={`${
                    promoCodes.find((f) => f?._id === selectedPromoCode)
                      ?.isActive === false
                      ? "bg-green-500"
                      : "bg-red-500"
                  } text-white p-2 rounded`}
                >
                  {promoCodes.find((f) => f?._id === selectedPromoCode)
                    ?.isActive
                    ? "Deactivate"
                    : "Activate"}
                </button>
                <button
                  onClick={() => setSelectedPromoCode(null)}
                  type="button"
                  className={`bg-red-600 text-white p-2 rounded`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default PromoCodeEdit;
