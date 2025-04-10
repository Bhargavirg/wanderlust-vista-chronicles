import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// Fix the import error by using the correct import for BlogPost
import BlogCard from "@/components/blog/BlogCard";
import { mockData } from "@/data/blogData";

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = mockData.posts.find((p) => p.id === postId);

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">Published on {post.date} in <span className="text-primary">{post.category}</span></p>
        </div>
        <img src={post.imageUrl} alt={post.title} className="w-full rounded-md mb-4" />
        <div className="prose dark:prose-invert max-w-none">
          <p>{post.content}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">More Like This</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockData.posts
              .filter((p) => p.category === post.category && p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
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
