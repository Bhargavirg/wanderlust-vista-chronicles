
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryBadge from "@/components/blog/CategoryBadge";
import { BlogPost } from "@/components/blog/BlogCard";

// Mock data - in a real app this would come from an API
const mockPosts: Record<string, BlogPost & { content: string }> = {
  "1": {
    id: "1",
    title: "The Hidden Treasures of Kyoto's Ancient Temples",
    excerpt: "Discover the serene beauty and rich history of Kyoto's most sacred sites, far from the tourist crowds.",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    category: "travel",
    author: {
      name: "Hiroshi Nakamura",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    publishedAt: "2025-04-07T10:00:00Z",
    content: `
      <p class="mb-4">Far from the bustling crowds of tourists that flock to Kyoto's famous golden temples and bamboo groves, there exists a world of serene, hidden sanctuaries that have witnessed centuries of Japanese history unfold. These lesser-known temples offer not just spiritual solace but a glimpse into Japan's rich cultural heritage, architectural brilliance, and philosophical traditions.</p>
      
      <h2 class="text-2xl font-semibold my-6">The Hidden Path to Hōnen-in</h2>
      
      <p class="mb-4">Tucked away in the eastern foothills of Kyoto, Hōnen-in Temple remains one of the city's best-kept secrets. The approach to this temple is through a moss-covered gate, beyond which lies a garden of such exquisite tranquility that visitors often find themselves whispering without being prompted.</p>
      
      <p class="mb-4">The temple is named after the founder of the Jōdo (Pure Land) sect of Buddhism, and its grounds reflect the philosophical principles he espoused: simplicity, mindfulness, and the appreciation of impermanence. Two sand mounds greet visitors at the entrance, raked daily by monks into patterns that symbolize purification.</p>
      
      <figure class="my-6">
        <img src="https://images.unsplash.com/photo-1480796927426-f609979314bd" alt="Zen garden at a temple" class="rounded-md w-full" />
        <figcaption class="text-sm text-muted-foreground text-center mt-2">The meticulously maintained sand patterns change with the seasons, reflecting the Buddhist concept of impermanence.</figcaption>
      </figure>
      
      <h2 class="text-2xl font-semibold my-6">Daigo-ji: The Emperor's Escape</h2>
      
      <p class="mb-4">While more tourists are discovering Daigo-ji since it appeared in a popular TV drama, few venture beyond its famous Benten pond to explore the upper temple area. A 2.5-kilometer hike up a forested mountainside leads to Kami-Daigo (Upper Daigo), where Emperor Saga retreated in the 9th century.</p>
      
      <p class="mb-4">The upper complex houses some of Japan's oldest wooden structures and a five-story pagoda that has withstood earthquakes, wars, and the passage of time since its construction in 951 CE. The view from the upper temple encompasses all of Kyoto, offering a perspective that few tourists ever experience.</p>
      
      <h2 class="text-2xl font-semibold my-6">The Living Traditions of Zuiganji</h2>
      
      <p class="mb-4">While technically located in Matsushima rather than Kyoto, no exploration of Japan's hidden temple treasures would be complete without mentioning Zuiganji. This temple complex demonstrates how Buddhist traditions remain living practices rather than mere historical artifacts.</p>
      
      <p class="mb-4">Visitors who arrive early might witness morning meditation sessions, where contemporary practitioners continue traditions established centuries ago. The temple grounds include caves that were used by monks for meditation during the 12th century, offering a tangible connection to Japan's spiritual past.</p>
      
      <figure class="my-6">
        <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186" alt="Temple interior" class="rounded-md w-full" />
        <figcaption class="text-sm text-muted-foreground text-center mt-2">The interior architecture features intricate wood carvings and painted panels that have been maintained by generations of artisans.</figcaption>
      </figure>
      
      <h2 class="text-2xl font-semibold my-6">Practical Tips for Temple Exploration</h2>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Visit during weekdays and arrive early in the morning to experience the truest sense of tranquility.</li>
        <li class="mb-2">Respect silence and photography restrictions, especially in temple interiors.</li>
        <li class="mb-2">Consider hiring a local guide who can explain the historical and philosophical significance of the architectural elements.</li>
        <li class="mb-2">Many hidden temples require modest entrance fees that help with preservation efforts.</li>
        <li class="mb-2">Comfortable walking shoes are essential, as many of these sites involve walking on uneven terrain.</li>
      </ul>
      
      <p class="mb-4">The true treasure of Kyoto's hidden temples isn't just their aesthetic beauty or historical significance—it's the opportunity they provide for contemporary visitors to step outside the rush of modern life and into a space where time moves differently. In these sacred spaces, the boundaries between past and present, between art and spirituality, seem to dissolve.</p>
      
      <p>As you plan your next visit to Kyoto, consider leaving room in your itinerary for discovery. The most meaningful experiences often come not from checking famous sites off a list, but from those quiet moments when you stumble upon something unexpected—a moss-covered Buddha statue, a garden of impossible perfection, or a moment of clarity in a temple that has been waiting centuries for your arrival.</p>
    `,
  },
};

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<(BlogPost & { content: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    if (postId && mockPosts[postId]) {
      setPost(mockPosts[postId]);
    }
    setLoading(false);
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6">The post you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article>
          <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-12">
              <div className="max-w-4xl mx-auto w-full">
                <CategoryBadge category={post.category} size="lg" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4">{post.title}</h1>
                <div className="flex items-center mt-6">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <div className="ml-3">
                    <p className="text-white font-medium">{post.author.name}</p>
                    <p className="text-white/80 text-sm">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container py-12">
            <div className="max-w-3xl mx-auto">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
