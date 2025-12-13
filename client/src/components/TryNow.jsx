import React from "react";

const TryNow = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-7 text-center">
          Remove Image Background
        </h2>

        <p className="text-gray-500 mb-8 text-center">
          Get a transparent background for any image
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-4">
          <input type="file" id="upload2" hidden accept="image/*" />

          <label
            htmlFor="upload2"
            className="bg-indigo-600 hover:bg-700 text-white font-semibold py-3 px-6 rounded-full text-lg cursor-pointer"
          >
            Upload Image
          </label>

          <p className="text-gray-500 text-sm">
            or drop a file, paste image or{" "}
            <a href="#" className="text-blue-500 underline">
              URL
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default TryNow;
