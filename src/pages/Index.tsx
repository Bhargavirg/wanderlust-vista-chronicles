
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeaturedSection from "@/components/home/FeaturedSection";
import CategorySection from "@/components/home/CategorySection";
import { BlogPost } from "@/components/blog/BlogCard";

// Mock data - in a real app this would come from an API
const mockData: {
  featured: BlogPost;
  recent: BlogPost[];
  byCategory: Record<string, BlogPost[]>;
} = {
  featured: {
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
  },
  recent: [
    {
      id: "2",
      title: "Mastering the Art of Sourdough Bread",
      excerpt: "Learn the techniques and secrets to bake the perfect crusty sourdough bread at home.",
      coverImage: "https://images.unsplash.com/photo-1555951015-6da899b5c2cd",
      category: "food",
      author: {
        name: "Emma Thompson",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      publishedAt: "2025-04-06T09:30:00Z",
    },
    {
      id: "3",
      title: "Breathtaking Aurora Borealis Photography Tips",
      excerpt: "How to capture the magical Northern Lights with any camera - settings, timing, and composition.",
      coverImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
      category: "space",
      author: {
        name: "Lars Petersen",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      publishedAt: "2025-04-05T18:45:00Z",
    },
    {
      id: "4",
      title: "The Secret Life of Monarch Butterflies",
      excerpt: "Following the incredible migration journey of one of nature's most resilient creatures.",
      coverImage: "https://images.unsplash.com/photo-1534706936160-d5ee67737249",
      category: "wildlife",
      author: {
        name: "Maria Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      publishedAt: "2025-04-04T14:20:00Z",
    },
  ],
  byCategory: {
    food: [
      {
        id: "5",
        title: "The Ultimate Guide to Italian Pasta",
        excerpt: "From spaghetti to pappardelle, discover the rich world of authentic Italian pasta.",
        coverImage: "https://images.unsplash.com/photo-1579684947550-22e945225d9a",
        category: "food",
        author: {
          name: "Marco Rossi",
          avatar: "https://i.pravatar.cc/150?img=8",
        },
        publishedAt: "2025-04-03T11:15:00Z",
      },
      {
        id: "6",
        title: "Street Food Delights from Southeast Asia",
        excerpt: "A culinary tour of the most delicious street foods from Thailand to Vietnam.",
        coverImage: "https://images.unsplash.com/photo-1552914953-938eef0ce926",
        category: "food",
        author: {
          name: "Priya Patel",
          avatar: "https://i.pravatar.cc/150?img=9",
        },
        publishedAt: "2025-04-02T08:45:00Z",
      },
      {
        id: "7",
        title: "The Art of French Pastry",
        excerpt: "Learn the techniques behind perfect croissants, éclairs, and macarons.",
        coverImage: "https://images.unsplash.com/photo-1607478900766-efe13248b125",
        category: "food",
        author: {
          name: "Sophie Dubois",
          avatar: "https://i.pravatar.cc/150?img=4",
        },
        publishedAt: "2025-04-01T16:30:00Z",
      },
      {
        id: "8",
        title: "Farm-to-Table: Growing Your Own Ingredients",
        excerpt: "How to create a sustainable kitchen garden that provides fresh produce year-round.",
        coverImage: "https://images.unsplash.com/photo-1565592409308-6d3c0a4de2da",
        category: "food",
        author: {
          name: "James Wilson",
          avatar: "https://i.pravatar.cc/150?img=7",
        },
        publishedAt: "2025-03-31T10:20:00Z",
      },
    ],
    travel: [
      {
        id: "9",
        title: "Hidden Beaches of Southeast Asia",
        excerpt: "Discover pristine shores away from the crowds in Thailand, Indonesia, and the Philippines.",
        coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        category: "travel",
        author: {
          name: "Alex Johnson",
          avatar: "https://i.pravatar.cc/150?img=13",
        },
        publishedAt: "2025-03-30T09:10:00Z",
      },
      {
        id: "10",
        title: "A Week in the Heart of the Amazon Rainforest",
        excerpt: "An eco-tourism adventure into the world's most biodiverse ecosystem.",
        coverImage: "https://images.unsplash.com/photo-1569097756865-19de5f64d335",
        category: "travel",
        author: {
          name: "Isabella Santos",
          avatar: "https://i.pravatar.cc/150?img=14",
        },
        publishedAt: "2025-03-29T14:25:00Z",
      },
      {
        id: "11",
        title: "The Ancient Ruins of Petra: A Traveler's Guide",
        excerpt: "Exploring Jordan's most famous archaeological site and how to make the most of your visit.",
        coverImage: "https://images.unsplash.com/photo-1575881875475-31023242e3f9",
        category: "travel",
        author: {
          name: "Omar Hassan",
          avatar: "https://i.pravatar.cc/150?img=15",
        },
        publishedAt: "2025-03-28T12:40:00Z",
      },
    ],
    nature: [
      {
        id: "12",
        title: "The Healing Power of Forest Bathing",
        excerpt: "How immersing yourself in nature can reduce stress and improve your health.",
        coverImage: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d",
        category: "nature",
        author: {
          name: "Naoko Yamada",
          avatar: "https://i.pravatar.cc/150?img=16",
        },
        publishedAt: "2025-03-27T15:35:00Z",
      },
      {
        id: "13",
        title: "Alpine Wildflowers: A Photographer's Guide",
        excerpt: "Tips for capturing the fleeting beauty of high mountain meadows in bloom.",
        coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
        category: "nature",
        author: {
          name: "Thomas Schmidt",
          avatar: "https://i.pravatar.cc/150?img=17",
        },
        publishedAt: "2025-03-26T11:25:00Z",
      },
      {
        id: "14",
        title: "The World's Most Spectacular Waterfalls",
        excerpt: "From Angel Falls to Victoria Falls, discovering the planet's most impressive cascades.",
        coverImage: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9",
        category: "nature",
        author: {
          name: "Elena Costa",
          avatar: "https://i.pravatar.cc/150?img=18",
        },
        publishedAt: "2025-03-25T16:50:00Z",
      },
    ],
    flowers: [
      {
        id: "15",
        title: "The Art of Japanese Ikebana",
        excerpt: "Exploring the ancient Japanese tradition of flower arrangement as meditation.",
        coverImage: "https://images.unsplash.com/photo-1463554050456-f2ed7d3fec09",
        category: "flowers",
        author: {
          name: "Yuki Tanaka",
          avatar: "https://i.pravatar.cc/150?img=19",
        },
        publishedAt: "2025-03-24T09:15:00Z",
      },
      {
        id: "16",
        title: "Growing Rare Orchids at Home",
        excerpt: "Tips and tricks for cultivating exotic orchid species in your indoor garden.",
        coverImage: "https://images.unsplash.com/photo-1566984464528-6ca41b4b8b5e",
        category: "flowers",
        author: {
          name: "Grace Chen",
          avatar: "https://i.pravatar.cc/150?img=20",
        },
        publishedAt: "2025-03-23T13:40:00Z",
      },
      {
        id: "17",
        title: "The World's Most Beautiful Botanical Gardens",
        excerpt: "A tour of extraordinary flower collections from Singapore to London.",
        coverImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        category: "flowers",
        author: {
          name: "Daniel Miller",
          avatar: "https://i.pravatar.cc/150?img=21",
        },
        publishedAt: "2025-03-22T10:30:00Z",
      },
    ],
    space: [
      {
        id: "18",
        title: "Backyard Astronomy: Spotting Planets with Binoculars",
        excerpt: "How to observe Jupiter, Saturn, and Mars without expensive equipment.",
        coverImage: "https://images.unsplash.com/photo-1543722530-d2c3201371e7",
        category: "space",
        author: {
          name: "Carl Anderson",
          avatar: "https://i.pravatar.cc/150?img=22",
        },
        publishedAt: "2025-03-21T19:20:00Z",
      },
      {
        id: "19",
        title: "The New Space Race: Private Companies Reaching for the Stars",
        excerpt: "How SpaceX, Blue Origin, and others are revolutionizing space exploration.",
        coverImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2",
        category: "space",
        author: {
          name: "Sophia Wang",
          avatar: "https://i.pravatar.cc/150?img=23",
        },
        publishedAt: "2025-03-20T15:15:00Z",
      },
      {
        id: "20",
        title: "Incredible Images from the James Webb Space Telescope",
        excerpt: "The most breathtaking views of our universe captured by NASA's latest marvel.",
        coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
        category: "space",
        author: {
          name: "Neil Richards",
          avatar: "https://i.pravatar.cc/150?img=24",
        },
        publishedAt: "2025-03-19T11:45:00Z",
      },
    ],
    wildlife: [
      {
        id: "21",
        title: "The Secret Life of Urban Foxes",
        excerpt: "How these adaptable predators are thriving in cities around the world.",
        coverImage: "https://images.unsplash.com/photo-1616627052149-22c4329f9ccc",
        category: "wildlife",
        author: {
          name: "Jessica Brown",
          avatar: "https://i.pravatar.cc/150?img=25",
        },
        publishedAt: "2025-03-18T14:10:00Z",
      },
      {
        id: "22",
        title: "Conservation Success Stories: Species Brought Back from the Brink",
        excerpt: "How dedicated efforts have saved endangered animals around the globe.",
        coverImage: "https://images.unsplash.com/photo-1503656142023-618e7d1f435a",
        category: "wildlife",
        author: {
          name: "Mark Davis",
          avatar: "https://i.pravatar.cc/150?img=26",
        },
        publishedAt: "2025-03-17T10:50:00Z",
      },
      {
        id: "23",
        title: "Underwater Wonders: The Great Barrier Reef",
        excerpt: "Exploring the incredible diversity of the world's largest coral reef ecosystem.",
        coverImage: "https://images.unsplash.com/photo-1613339027862-359bdff064b4",
        category: "wildlife",
        author: {
          name: "Olivia Taylor",
          avatar: "https://i.pravatar.cc/150?img=27",
        },
        publishedAt: "2025-03-16T09:30:00Z",
      },
    ],
  },
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="pb-4 md:pb-8">
          <section className="bg-muted py-12 md:py-24">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Discover Amazing Stories
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Explore captivating blogs across food, travel, nature, and more. 
                  Share your own adventures with the world.
                </p>
              </div>
            </div>
          </section>
          
          <FeaturedSection 
            featuredPost={mockData.featured} 
            recentPosts={mockData.recent} 
          />
          
          {Object.entries(mockData.byCategory).map(([category, posts]) => (
            <CategorySection
              key={category}
              title={`${category.charAt(0).toUpperCase() + category.slice(1)} Blogs`}
              category={category as 'food' | 'travel' | 'nature' | 'flowers' | 'space' | 'wildlife'}
              posts={posts}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
