import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/restorephotos"); // Replace with the actual route for the restore photo page
  };

  return (
    <div className="flex justify-center items-center  pt-36">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-[90%] max-w-[500px]">
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your payment. Your credits have been added, and you can now restore your photos.
        </p>
        <button
          onClick={handleRedirect}
          className="w-full bg-black text-white py-2 rounded-lg text-lg hover:opacity-80"
        >
          Go to Restore Photos
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
