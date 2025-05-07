
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { searchContent } from '@/services/contentService';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (term: string) => {
    try {
      setLoading(true);
      const results = await searchContent(term);
      setSearchResults(results || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: 'Search Error',
        description: 'Failed to load search results',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      performSearch(searchTerm);
      
      // Update URL with the new search term
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('q', searchTerm);
      window.history.pushState({}, '', `?${newSearchParams.toString()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto flex-1 py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {query ? `Search Results for "${query}"` : 'Search'}
          </h1>
          
          <form onSubmit={handleSearch} className="flex items-center gap-2 max-w-lg">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
                placeholder="Search for content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded-t-md w-full"></div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-md">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Found {searchResults.length} results</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We couldn't find any content matching "{query}". Try using different keywords or browse our categories.
            </p>
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
