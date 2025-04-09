
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/home/FeaturedSection";
import Hero from "@/components/home/Hero";
import CategoriesList from "@/components/home/CategoriesList";
import { mockData } from "@/data/blogData";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="pb-4 md:pb-8">
          <Hero />
          
          <FeaturedSection 
            featuredPost={mockData.featured} 
            recentPosts={mockData.recent} 
          />
          
          <CategoriesList blogData={mockData} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
