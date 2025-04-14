
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="relative py-12 bg-cover bg-center" style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`
    }}>
      <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400"></div>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg opacity-90">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
