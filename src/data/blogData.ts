
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Adding the missing content property
  description?: string;
  coverImage: string;
  screenSizeImage?: string;
  category: 'science' | 'technology' | 'history' | 'culture' | 'nature' | 'space' | 'wildlife' | 
    'travel' | 'marinelife' | 'monuments' | 'literature' | 'art' | 'flowers' | 'food' | 'anime' | 'politics' | 'sports' | 'stories' |
    'deep-earth-geology' | 'ancient-civilization' | 'climate' | 'psychology' | 'archaeology' | 'mythology' | 'business-economics' | 'music' | 'current-affairs';
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
        coverImage: "https://cdn.pixabay.com/photo/2019/11/26/19/57/animal-4655388_1280.jpg",
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
        title: "Animal kingdom hirarchy",
        excerpt: "Understanding the complex social structures of animal species.",
        coverImage: "https://i.pinimg.com/736x/eb/83/70/eb8370e5c5e9b2b5c0247e4cf7155031.jpg",
        category: "wildlife",
        author: {
          name: "Olivia Taylor",
          avatar: "https://i.pravatar.cc/150?img=27",
        },
        publishedAt: "2025-03-16T09:30:00Z",
      },
      {
        id: "23",
        title: "Snake Island: A Hidden Gem of Biodiversity",
        excerpt: "Discover the unique wildlife and ecosystems of this remote island.",
        coverImage: "https://cdn.pixabay.com/photo/2021/10/28/10/49/red-bellied-black-snake-6749361_1280.jpg",
        category: "wildlife",
        author: {
          name: "Olivia Taylor",
          avatar: "https://i.pravatar.cc/150?img=27",
        },
        publishedAt: "2025-03-16T09:30:00Z",
      },
      {
        id: "23",
        title: "Elephant Migration: Nature's Great Journey",
        excerpt: "Witnessing the majestic migration of elephants across the African savannah.",
        coverImage: "https://cdn.pixabay.com/photo/2020/01/02/14/53/elephant-4736008_1280.jpg",
        category: "wildlife",
        author: {
          name: "Olivia Taylor",
          avatar: "https://i.pravatar.cc/150?img=27",
        },
        publishedAt: "2025-03-16T09:30:00Z",
      },
      {
        id: "23",
        title: "Loin king of the jungle",
        excerpt: "Forests are home to many species of wildlife, including lions, tigers, and bears.",
        coverImage: "https://i.pinimg.com/736x/43/c2/c1/43c2c16d57298b41196c4562cb52f384.jpg",
        category: "wildlife",
        author: {
          name: "Olivia Taylor",
          avatar: "https://i.pravatar.cc/150?img=27",
        },
        publishedAt: "2025-03-16T09:30:00Z",
      },
    ],
    art: [
      {
        id: "24",
        title: "Impressionism: The Art Movement That Changed the World",
        excerpt: "Explore the origins and impact of Impressionism in the art world.",
        coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        category: "art",
        author: {
          name: "Anna Lee",
          avatar: "https://i.pravatar.cc/150?img=28",
          credentials: "Art Historian"
        },
        publishedAt: "2025-03-15T10:00:00Z",
      },
      {
        id: "24",
        title: "Impressionism: The Art Movement That Changed the World",
        excerpt: "Explore the origins and impact of Impressionism in the art world.",
        coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        category: "art",
        author: {
          name: "Anna Lee",
          avatar: "https://i.pravatar.cc/150?img=28",
          credentials: "Art Historian"
        },
        publishedAt: "2025-03-15T10:00:00Z",
      },
      {
        id: "24",
        title: "Impressionism: The Art Movement That Changed the World",
        excerpt: "Explore the origins and impact of Impressionism in the art world.",
        coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        category: "art",
        author: {
          name: "Anna Lee",
          avatar: "https://i.pravatar.cc/150?img=28",
          credentials: "Art Historian"
        },
        publishedAt: "2025-03-15T10:00:00Z",
      },
      {
        id: "24",
        title: "Impressionism: The Art Movement That Changed the World",
        excerpt: "Explore the origins and impact of Impressionism in the art world.",
        coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        category: "art",
        author: {
          name: "Anna Lee",
          avatar: "https://i.pravatar.cc/150?img=28",
          credentials: "Art Historian"
        },
        publishedAt: "2025-03-15T10:00:00Z",
      },
      {
        id: "24",
        title: "Impressionism: The Art Movement That Changed the World",
        excerpt: "Explore the origins and impact of Impressionism in the art world.",
        coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        category: "art",
        author: {
          name: "Anna Lee",
          avatar: "https://i.pravatar.cc/150?img=28",
          credentials: "Art Historian"
        },
        publishedAt: "2025-03-15T10:00:00Z",
      }
    ],
    flowers: [
      {
        id: "25",
        title: "The Language of Flowers: Meanings and Symbolism",
        excerpt: "Discover the hidden meanings behind popular flowers.",
        coverImage: "https://i.pinimg.com/736x/c6/e8/c8/c6e8c8621642ebb22c0372fe3ee9f53c.jpg",
        category: "flowers",
        author: {
          name: "Emily Clark",
          avatar: "https://i.pravatar.cc/150?img=29",
          credentials: "Botanist"
        },
        publishedAt: "2025-03-14T09:00:00Z",
      }
    ],
    anime: [
      {
        id: "26",
        title: "The Evolution of Anime: From Classic to Modern",
        excerpt: "A look at how anime has changed over the decades.",
        coverImage: "https://i.pinimg.com/736x/40/21/e0/4021e0512ac11ea228bacdc4e19f933d.jpg",
        category: "anime",
        author: {
          name: "Kenji Yamamoto",
          avatar: "https://i.pravatar.cc/150?img=30",
          credentials: "Anime Critic"
        },
        publishedAt: "2025-03-13T11:00:00Z",
      }
    ],
    politics: [
      {
        id: "27",
        title: "The Role of Democracy in Modern Society",
        excerpt: "Understanding the importance and challenges of democracy today.",
        coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
        category: "politics",
        author: {
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=31",
          credentials: "Political Scientist"
        },
        publishedAt: "2025-03-12T14:00:00Z",
      }
    ],
    sports: [
      {
        id: "28",
        title: "The Greatest Moments in Olympic History",
        excerpt: "Relive some of the most memorable Olympic events.",
        coverImage: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
        category: "sports",
        author: {
          name: "Michael Brown",
          avatar: "https://i.pravatar.cc/150?img=32",
          credentials: "Sports Analyst"
        },
        publishedAt: "2025-03-11T13:00:00Z",
      }
    ],
    stories: [
      {
        id: "29",
        title: "Folk Tales from Around the World",
        excerpt: "Explore traditional stories passed down through generations.",
        coverImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15",
        category: "stories",
        author: {
          name: "Laura Green",
          avatar: "https://i.pravatar.cc/150?img=33",
          credentials: "Storyteller"
        },
        publishedAt: "2025-03-10T12:00:00Z",
      }
    ],
    travel: [
      {
        id: "30",
        title: "Top Destinations for Adventure Travel",
        excerpt: "Discover exciting places for your next adventure.",
        coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        category: "travel",
        author: {
          name: "David Wilson",
          avatar: "https://i.pravatar.cc/150?img=34",
          credentials: "Travel Blogger"
        },
        publishedAt: "2025-03-09T11:00:00Z",
      }
    ],
    food: [
      {
        id: "31",
        title: "Exploring World Cuisines: A Culinary Journey",
        excerpt: "Taste the flavors of different cultures.",
        coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
        category: "food",
        author: {
          name: "Sophia Martinez",
          avatar: "https://i.pravatar.cc/150?img=35",
          credentials: "Chef"
        },
        publishedAt: "2025-03-08T10:00:00Z",
      }
    ],
    monuments: [
      {
        id: "32",
        title: "The Most Iconic Monuments Around the World",
        excerpt: "Discover the history behind famous landmarks.",
        coverImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        category: "monuments",
        author: {
          name: "James Anderson",
          avatar: "https://i.pravatar.cc/150?img=36",
          credentials: "Historian"
        },
        publishedAt: "2025-03-07T09:00:00Z",
      }
    ],
    marinelife: [
      {
        id: "33",
        title: "Coral Reefs: The Rainforests of the Sea",
        excerpt: "Explore the vibrant ecosystems of coral reefs.",
        coverImage: "https://i.pinimg.com/736x/e6/a7/87/e6a78748d900c1fa121f69829299ec21.jpg",
        category: "marinelife",
        author: {
          name: "Olivia White",
          avatar: "https://i.pravatar.cc/150?img=37",
          credentials: "Marine Biologist"
        },
        publishedAt: "2025-03-06T08:00:00Z",
      }
    ],
    literature: [
      {
        id: "34",
        title: "Classic Literature That Shaped the World",
        excerpt: "A look at timeless literary masterpieces.",
        coverImage: "https://i.pinimg.com/736x/4c/be/72/4cbe72bd4c75c1fa36fd416d1601c816.jpg",
        category: "literature",
        author: {
          name: "William Harris",
          avatar: "https://i.pravatar.cc/150?img=38",
          credentials: "Literary Critic"
        },
        publishedAt: "2025-03-05T10:00:00Z",
      }
    ],
    "deep-earth-geology": [
      {
        id: "35",
        title: "Exploring Earth's Core: What Lies Beneath",
        excerpt: "A journey into the layers of our planet and the forces that shape it.",
        coverImage: "https://cdn.pixabay.com/photo/2016/11/21/17/46/craters-1846775_1280.jpg",
        category: "deep-earth-geology",
        author: {
          name: "Dr. Robert Chen",
          avatar: "https://i.pravatar.cc/150?img=39",
          credentials: "Geophysicist"
        },
        publishedAt: "2025-03-04T14:30:00Z",
      }
    ],
    "ancient-civilization": [
      {
        id: "36",
        title: "Lost Cities: Rediscovering Ancient Wonders",
        excerpt: "Archaeological discoveries revealing secrets of long-forgotten human settlements.",
        coverImage: "https://cdn.pixabay.com/photo/2016/11/19/14/11/ancient-1839467_1280.jpg",
        category: "ancient-civilization",
        author: {
          name: "Dr. Maya Rodriguez",
          avatar: "https://i.pravatar.cc/150?img=40",
          credentials: "Archaeological Anthropologist"
        },
        publishedAt: "2025-03-03T09:45:00Z",
      }
    ],
    climate: [
      {
        id: "37",
        title: "Understanding Climate Systems and Weather Patterns",
        excerpt: "How global atmospheric circulation shapes our regional weather experiences.",
        coverImage: "https://cdn.pixabay.com/photo/2017/02/27/08/50/cyclone-2102397_1280.jpg",
        category: "climate",
        author: {
          name: "Dr. Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=41",
          credentials: "Climatologist"
        },
        publishedAt: "2025-03-02T11:20:00Z",
      }
    ],
    psychology: [
      {
        id: "38",
        title: "The Science of Happiness: Positive Psychology Explained",
        excerpt: "Research-backed approaches to improving wellbeing and life satisfaction.",
        coverImage: "https://cdn.pixabay.com/photo/2018/01/27/10/09/perception-3110812_1280.jpg",
        category: "psychology",
        author: {
          name: "Dr. David Kim",
          avatar: "https://i.pravatar.cc/150?img=42",
          credentials: "Clinical Psychologist"
        },
        publishedAt: "2025-03-01T16:15:00Z",
      }
    ],
    archaeology: [
      {
        id: "39",
        title: "Modern Methods in Archaeological Excavation",
        excerpt: "How technology is revolutionizing the discovery and preservation of historical sites.",
        coverImage: "https://cdn.pixabay.com/photo/2017/05/19/15/08/stonehenge-2326750_1280.jpg",
        category: "archaeology",
        author: {
          name: "Dr. Emily Carter",
          avatar: "https://i.pravatar.cc/150?img=43",
          credentials: "Field Archaeologist"
        },
        publishedAt: "2025-02-28T13:40:00Z",
      }
    ],
    mythology: [
      {
        id: "40",
        title: "Gods and Heroes: Comparative Mythology Across Cultures",
        excerpt: "Exploring common themes in mythological narratives from around the world.",
        coverImage: "https://cdn.pixabay.com/photo/2016/08/26/01/32/poseidon-1621062_1280.jpg",
        category: "mythology",
        author: {
          name: "Dr. Thomas Williams",
          avatar: "https://i.pravatar.cc/150?img=44",
          credentials: "Comparative Mythologist"
        },
        publishedAt: "2025-02-27T10:20:00Z",
      }
    ],
    "business-economics": [
      {
        id: "41",
        title: "Sustainable Business Practices in a Changing Economy",
        excerpt: "How companies are adapting to environmental challenges while maintaining profitability.",
        coverImage: "https://cdn.pixabay.com/photo/2018/02/08/10/22/desk-3139127_1280.jpg",
        category: "business-economics",
        author: {
          name: "Dr. Rebecca Lee",
          avatar: "https://i.pravatar.cc/150?img=45",
          credentials: "Economist"
        },
        publishedAt: "2025-02-26T14:10:00Z",
      }
    ],
    music: [
      {
        id: "42",
        title: "The Evolution of Musical Instruments Through History",
        excerpt: "From ancient flutes to digital synthesizers, exploring how we make music.",
        coverImage: "https://cdn.pixabay.com/photo/2022/08/31/20/47/concert-7424190_1280.jpg",
        category: "music",
        author: {
          name: "Dr. James Wilson",
          avatar: "https://i.pravatar.cc/150?img=46",
          credentials: "Musicologist"
        },
        publishedAt: "2025-02-25T09:30:00Z",
      }
    ],
    "current-affairs": [
      {
        id: "43",
        title: "Global Cooperation in an Age of Challenge",
        excerpt: "How nations are working together to address shared problems across borders.",
        coverImage: "https://cdn.pixabay.com/photo/2016/11/14/04/45/audience-1822866_1280.jpg",
        category: "current-affairs",
        author: {
          name: "Dr. Amina Hassan",
          avatar: "https://i.pravatar.cc/150?img=47",
          credentials: "International Relations Specialist"
        },
        publishedAt: "2025-02-24T11:45:00Z",
      }
    ]
  }
};
