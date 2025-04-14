
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  showBackLink?: boolean;
  backTo?: string;
  showEditButton?: boolean;
  editUrl?: string;
  isAuthor?: boolean;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  showBackLink = false,
  backTo = "/dashboard",
  showEditButton = false,
  editUrl = "",
  isAuthor = false
}: PageHeaderProps) => {
  return (
    <div className="relative py-12 bg-cover bg-center" style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80)`
    }}>
      <div className="absolute left-0 top-0 h-full w-2 bg-yellow-400"></div>
      <div className="container relative">
        {showBackLink && (
          <Link to={backTo} className="absolute top-0 left-0">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        )}
        
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg opacity-90">{subtitle}</p>
          
          {showEditButton && isAuthor && editUrl && (
            <div className="mt-6">
              <Link to={editUrl}>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Content
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
