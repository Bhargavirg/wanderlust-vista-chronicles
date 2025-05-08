import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const MagazinePage = () => {
  // Array of page images
  const pages = [
    "/Green and White Simple Modern Nature Magazine Cover.jpg",
    "https://i.pinimg.com/736x/f1/ac/44/f1ac448a966f1290e21525fbad8bd25a.jpg",
    "https://i.pinimg.com/736x/3a/d6/d4/3ad6d40fff816678755dfc6b10d486d5.jpg",
    "https://i.pinimg.com/736x/cc/c6/6f/ccc66f8c0d207cce54974d9f22d131ee.jpg",
    "https://i.pinimg.com/736x/42/bf/89/42bf89c96e809e4b007bc88426a7e71c.jpg",
    "https://i.pinimg.com/736x/1d/4d/c0/1d4dc0519a7e98d6c8bd178fcb254a0c.jpg",
    "https://i.pinimg.com/736x/b0/bd/c4/b0bdc4b1c2895618c260405b01d2e320.jpg",
    "https://i.pinimg.com/736x/07/c1/bc/07c1bcd48cb14eb5d805b1ae0c95b8d1.jpg",
    "https://i.pinimg.com/736x/02/ac/b9/02acb9e1196d0c1c163a15b0381c64d5.jpg",
    "https://i.pinimg.com/736x/10/75/a9/1075a96e57ee76ef1fa27b85dde59d0b.jpg",
    "https://i.pinimg.com/736x/8c/6a/d2/8c6ad28e83c0b9e5f9168da64ae12f7c.jpg",
    "https://i.pinimg.com/736x/48/48/76/48487619f1621a01a49b9edbd0490478.jpg",
    "https://i.pinimg.com/736x/59/10/08/591008237cbffadc713786561e23f0e8.jpg",
    "https://i.pinimg.com/736x/ae/87/1a/ae871a9a7b1a5ed6b42febf430d2554f.jpg",
    "https://i.pinimg.com/736x/2e/0e/cc/2e0ecc0f472a751a0ab62b3188a0b7aa.jpg",
    "https://i.pinimg.com/736x/35/6d/30/356d30637d87c443a529d7920c241ef5.jpg",
    "https://i.pinimg.com/736x/3a/c6/5a/3ac65a36cb497b828d1c0cf8a1ef7b31.jpg",
    "https://i.pinimg.com/736x/8f/d0/37/8fd03762de5bc9c3e8d894bc104faebc.jpg",
    "https://i.pinimg.com/736x/ef/e4/d5/efe4d5939a012d93ca1a7fc4cdbd7766.jpg",
    "https://i.pinimg.com/736x/2a/d5/60/2ad560066a947f555764cfecdd13135f.jpg",
    "https://i.pinimg.com/736x/f5/ac/e8/f5ace868b0f334cc51bab649a24b6e8e.jpg",
    "https://i.pinimg.com/736x/60/a7/d9/60a7d993754c2e3589b01a941ab77853.jpg",
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev === pages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full h-full">
        <div className="relative w-full max-w-full h-full flex items-center justify-center">
          <img
            src={pages[currentPage]}
            alt={`Magazine Page ${currentPage + 1}`}
            className="w-full h-full object-contain"
            style={{ maxHeight: "100vh", maxWidth: "100vw" }}
          />
          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            aria-label="Previous Page"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            &#8592;
          </button>
          <button
            onClick={goToNext}
            aria-label="Next Page"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 rounded-full p-2 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            &#8594;
          </button>
        </div>
        {/* Slider indicator */}
        <div className="mt-4 flex space-x-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                index === currentPage
                  ? "bg-blue-600 dark:bg-blue-400"
                  : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MagazinePage;
