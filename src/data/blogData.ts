export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: 'science' | 'technology' | 'history' | 'culture' | 'nature' | 'space' | 'wildlife' | 
    'travel' | 'marinelife' | 'monuments' | 'literature' | 'art' | 'flowers' | 'food' | 'anime' | 'politics' | 'sports' | 'stories';
  subCategory?: string; // For more specific categorization
  author: {
    name: string;
    avatar: string;
    credentials?: string; // Academic credentials or expertise
  };
  publishedAt: string;
  updatedAt?: string; // Adding this property to fix the TypeScript error
  mainContentData?: string; // Adding this to store the main content
  educationalContent?: {
    difficulty: "beginner" | "intermediate" | "advanced";
    ageGroup?: string;
    learningObjectives?: string[];
    keywords?: string[];
  };
}

export interface BlogData {
  featured: BlogPost;
  recent: BlogPost[];
  byCategory: Record<string, BlogPost[]>;
}

// Mock data - in a real app this would come from an API
export const mockData: BlogData = {
  featured: {
    id: "1",
    title: "The Hidden Wonders of the Amazon Rainforest",
    excerpt: "Explore the incredible biodiversity and ecological importance of Earth's largest rainforest ecosystem.",
    coverImage: "https://images.unsplash.com/photo-1569097756865-19de5f64d335",
    category: "nature",
    subCategory: "ecosystems",
    author: {
      name: "Dr. Isabella Santos",
      avatar: "https://i.pravatar.cc/150?img=14",
      credentials: "Ph.D. in Tropical Ecology"
    },
    publishedAt: "2025-04-07T10:00:00Z",
    educationalContent: {
      difficulty: "intermediate",
      ageGroup: "12+",
      learningObjectives: [
        "Understand the importance of rainforest ecosystems",
        "Identify key species in the Amazon rainforest",
        "Recognize threats to biodiversity"
      ]
    }
  },
  recent: [
    {
      id: "2",
      title: "The Future of Quantum Computing Explained",
      excerpt: "How quantum computers work and why they'll revolutionize technology, medicine, and scientific discovery.",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      category: "technology",
      author: {
        name: "Dr. Emma Thompson",
        avatar: "https://i.pravatar.cc/150?img=5",
        credentials: "Quantum Computing Researcher"
      },
      publishedAt: "2025-04-06T09:30:00Z",
    },
    {
      id: "3",
      title: "Exploring Mars: The Latest Discoveries",
      excerpt: "What NASA's Perseverance rover and Ingenuity helicopter are teaching us about the red planet.",
      coverImage: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9",
      category: "space",
      author: {
        name: "Dr. Lars Petersen",
        avatar: "https://i.pravatar.cc/150?img=12",
        credentials: "Planetary Scientist"
      },
      publishedAt: "2025-04-05T18:45:00Z",
    },
    {
      id: "4",
      title: "The Ancient Civilizations of Mesopotamia",
      excerpt: "Discover the cradle of civilization and the birth of writing, agriculture, and urban society.",
      coverImage: "https://images.unsplash.com/photo-1473177104440-ffee2f376098",
      category: "history",
      author: {
        name: "Prof. Maria Rodriguez",
        avatar: "https://i.pravatar.cc/150?img=3",
        credentials: "Professor of Ancient History"
      },
      publishedAt: "2025-04-04T14:20:00Z",
    },
  ],
  byCategory: {
    science: [
      {
        id: "5",
        title: "The Building Blocks of Life: DNA Decoded",
        excerpt: "Understanding the genetic code that makes us who we are, and how CRISPR is changing our ability to modify it.",
        coverImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69",
        category: "science",
        subCategory: "genetics",
        author: {
          name: "Dr. Marco Rossi",
          avatar: "https://i.pravatar.cc/150?img=8",
          credentials: "Geneticist"
        },
        publishedAt: "2025-04-03T11:15:00Z",
      },
      {
        id: "6",
        title: "The Fascinating World of Deep Sea Creatures",
        excerpt: "Exploring the bizarre and beautiful organisms that thrive in the ocean's darkest depths.",
        coverImage: "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10",
        category: "science",
        subCategory: "marine-biology",
        author: {
          name: "Dr. Priya Patel",
          avatar: "https://i.pravatar.cc/150?img=9",
          credentials: "Marine Biologist"
        },
        publishedAt: "2025-04-02T08:45:00Z",
      },
      {
        id: "7",
        title: "Climate Change: Understanding the Science",
        excerpt: "The evidence, causes, and projected impacts of global climate change explained.",
        coverImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d",
        category: "science",
        subCategory: "climate",
        author: {
          name: "Dr. Sophie Dubois",
          avatar: "https://i.pravatar.cc/150?img=4",
          credentials: "Climate Scientist"
        },
        publishedAt: "2025-04-01T16:30:00Z",
      },
      {
        id: "8",
        title: "Inside the Human Brain: How Memory Works",
        excerpt: "The neuroscience behind how we form, store, and recall memories.",
        coverImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc",
        category: "science",
        subCategory: "neuroscience",
        author: {
          name: "Dr. James Wilson",
          avatar: "https://i.pravatar.cc/150?img=7",
          credentials: "Neuroscientist"
        },
        publishedAt: "2025-03-31T10:20:00Z",
      },
    ],
    technology: [
      {
        id: "9",
        title: "Artificial Intelligence: Past, Present, and Future",
        excerpt: "The evolution of AI from early computing to modern machine learning and beyond.",
        coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        category: "technology",
        subCategory: "artificial-intelligence",
        author: {
          name: "Dr. Alex Johnson",
          avatar: "https://i.pravatar.cc/150?img=13",
          credentials: "AI Researcher"
        },
        publishedAt: "2025-03-30T09:10:00Z",
      },
      {
        id: "10",
        title: "Sustainable Technology: Innovations for a Greener Future",
        excerpt: "How technology is helping address climate change and environmental challenges.",
        coverImage: "https://images.unsplash.com/photo-1473181488821-2d23949a045a",
        category: "technology",
        subCategory: "sustainable-tech",
        author: {
          name: "Dr. Omar Hassan",
          avatar: "https://i.pravatar.cc/150?img=15",
          credentials: "Environmental Engineer"
        },
        publishedAt: "2025-03-29T14:25:00Z",
      },
      {
        id: "11",
        title: "The Internet of Things: Our Connected World",
        excerpt: "How smart devices are transforming our homes, cities, and daily lives.",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
        category: "technology",
        subCategory: "iot",
        author: {
          name: "Dr. Thomas Schmidt",
          avatar: "https://i.pravatar.cc/150?img=17",
          credentials: "Computer Scientist"
        },
        publishedAt: "2025-03-28T12:40:00Z",
      },
    ],
    history: [
      {
        id: "12",
        title: "The Rise and Fall of Ancient Rome",
        excerpt: "How a small Italian village became the center of the Western world, and why it eventually collapsed.",
        coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
        category: "history",
        subCategory: "ancient-civilizations",
        author: {
          name: "Prof. Naoko Yamada",
          avatar: "https://i.pravatar.cc/150?img=16",
          credentials: "Classical Historian"
        },
        publishedAt: "2025-03-27T15:35:00Z",
      },
      {
        id: "13",
        title: "The Age of Exploration: When Europe Discovered the World",
        excerpt: "The voyages, technologies, and motivations behind history's greatest era of discovery.",
        coverImage: "https://images.unsplash.com/photo-1526259037230-f4f3e391cec9",
        category: "history",
        subCategory: "exploration",
        author: {
          name: "Dr. Elena Costa",
          avatar: "https://i.pravatar.cc/150?img=18",
          credentials: "Maritime Historian"
        },
        publishedAt: "2025-03-26T11:25:00Z",
      },
      {
        id: "14",
        title: "World War II: Causes, Events, and Aftermath",
        excerpt: "Understanding the most destructive conflict in human history and its lasting impact.",
        coverImage: "https://images.unsplash.com/photo-1580130379624-3a069adbf8bc",
        category: "history",
        subCategory: "modern-history",
        author: {
          name: "Prof. Daniel Miller",
          avatar: "https://i.pravatar.cc/150?img=21",
          credentials: "Professor of Military History"
        },
        publishedAt: "2025-03-25T16:50:00Z",
      },
    ],
    culture: [
      {
        id: "15",
        title: "The Art of Japanese Minimalism",
        excerpt: "How the philosophy of 'less is more' shapes Japanese design, architecture, and daily life.",
        coverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
        category: "culture",
        subCategory: "philosophy",
        author: {
          name: "Dr. Yuki Tanaka",
          avatar: "https://i.pravatar.cc/150?img=19",
          credentials: "Cultural Anthropologist"
        },
        publishedAt: "2025-03-24T09:15:00Z",
      },
      {
        id: "16",
        title: "Indigenous Music Around the World",
        excerpt: "Exploring traditional musical forms and instruments from global indigenous cultures.",
        coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        category: "culture",
        subCategory: "music",
        author: {
          name: "Prof. Grace Chen",
          avatar: "https://i.pravatar.cc/150?img=20",
          credentials: "Ethnomusicologist"
        },
        publishedAt: "2025-03-23T13:40:00Z",
      },
      {
        id: "17",
        title: "Food as Cultural Identity: What We Eat and Why",
        excerpt: "How culinary traditions reflect history, geography, and cultural values.",
        coverImage: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
        category: "culture",
        subCategory: "food",
        author: {
          name: "Dr. Carl Anderson",
          avatar: "https://i.pravatar.cc/150?img=22",
          credentials: "Food Historian"
        },
        publishedAt: "2025-03-22T10:30:00Z",
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
