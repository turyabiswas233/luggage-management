import React from "react";

function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  font-sans">
      <h1 className="text-9xl font-bold text-red-500">404</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 mt-2">
        Sorry, the page you are looking for could not be found.
      </p>
      <a href="/" className="mt-4 text-lg text-red-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
}

export default ErrorPage;
