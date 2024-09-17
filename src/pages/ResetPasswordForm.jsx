import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import config from "../config";
import axios from "axios";
import logo from "/img/home-two/logo3.svg";

function ResetPasswordForm() {
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Handle password  reset logic here
    if (newPassword.length < 8) {
      setError("Password length should be greater than or equal 8 character");
      setLoad(false);
      setSuccess(false);
      return;
    } else if (newPassword !== confirmPassword) {
      setError("Make sure both of the password is same");
      setLoad(false);
      setSuccess(false);
    } else if (newPassword === confirmPassword) {
      const url = config.API_BASE_URL;
      try {
        setLoad(true);
        const response = await axios.post(
          `${url}/api/v1/users/reset-password/${tokenId}`,
          {
            token: tokenId,
            newPassword: newPassword,
          }
        );
        console.log(response.data);
        setSuccess(true);
      } catch (error) {
        if (error.response.data.error) {
          setError(error.response.data.error);
        } else setError("An Unexpected error occured. Try again.");
        setSuccess(false);
      } finally {
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      let loop = setTimeout(() => {
        clearInterval(loop);
        navigate("/");
      }, [2000]);
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="fixed top-0 left-0 w-screen h-24 bg-white flex items-center px-2">
        <NavLink to={"/"}>
          <img
            className="aspect-square object-cover mx-10"
            src={logo}
            alt=""
            width={80}
            height={80}
          />
        </NavLink>
      </div>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p>Your Password Reset Token : {hashTokenId(tokenId)}</p>
        <p className="font-medium">
          NB:- Your new password will be automatically set to your account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              New Password:
            </label>
            <input
              type="password"
              placeholder="minimum 8 characters"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={newPassword}
              minLength={8}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700   
font-bold mb-2"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="same as new password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {isSuccess && (
            <p className="bg-green-100 text-green-600 ring-1 ring-green-500 w-full p-2 rounded-md my-3">
              Password has been changed
            </p>
          )}
          {errorMsg && (
            <p className="bg-red-100 text-red-600 ring-1 ring-red-500 w-full p-2 rounded-md my-3">
              {errorMsg}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center"
            disabled={load}
          >
            {load ? <LuLoader className="animate-spin" /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

const hashTokenId = (tokenId = "") => {
  let len = tokenId.length;
  if (len > 20) {
    return `${tokenId.slice(0, 5)}******${tokenId.slice(
      tokenId.length - 5,
      tokenId.length
    )}`;
  } else return `*** *** *** ***`;
};
export default ResetPasswordForm;
