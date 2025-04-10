
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { mockData } from "@/data/blogData";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  
  // Fix: Access the posts from the byCategory object, combining all categories
  const allPosts = Object.values(mockData.byCategory).flat();
  // Also include featured and recent posts to ensure we find all posts
  const combinedPosts = [mockData.featured, ...mockData.recent, ...allPosts];
  // Remove duplicates by ID
  const uniquePosts = Array.from(new Map(combinedPosts.map(post => [post.id, post])).values());
  // Find the post by ID
  const post = uniquePosts.find((p) => p.id === postId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-6 px-4">
          <div className="text-center text-gray-500 py-12">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p>Sorry, the post you are looking for could not be found.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Find related posts with the same category
  const relatedPosts = uniquePosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Published on {new Date(post.publishedAt).toLocaleDateString()} in <span className="text-primary">{post.category}</span>
          </p>
        </div>
        <img src={post.coverImage} alt={post.title} className="w-full rounded-md mb-4" />
        <div className="prose dark:prose-invert max-w-none">
          <p>{post.excerpt}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">More Like This</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
