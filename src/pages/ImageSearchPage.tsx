
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ImageSearchEngine from "@/components/Visual hunt/ImageSearchEngine";

const ImageSearchPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ImageSearchEngine />
      </main>
      <Footer />
    </div>
  );
};

export default ImageSearchPage;
