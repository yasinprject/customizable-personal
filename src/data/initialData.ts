export interface CommentItem {
  id: string;
  name: string;
  text: string;
  date: string;
}

export interface WorkItem {
  id: string;
  title: string;
  category: 'website' | 'app' | 'graphics' | 'video' | 'audio' | 'other';
  description: string;
  mediaType: 'image' | 'video_url' | 'audio_url' | 'youtube';
  mediaUrl: string;
  liveLink?: string;
  repoLink?: string;
  tags: string[];
  likesCount: number;
  viewsCount: number;
  createdAt: string;
  featured: boolean;
  comments: CommentItem[];
}

export interface PlatformSettings {
  ownerName: string;
  designation: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  themeColor: 'indigo' | 'emerald' | 'violet' | 'rose' | 'amber' | 'cyan';
  layoutMode: 'grid' | 'list';
  contactEmail: string;
  contactPhone: string;
  facebookUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  footerText: string;
  allowPublicComments: boolean;
  adminPin: string; // Default '1234' for easy access
  visitorCount: number;
}

export const DEFAULT_SETTINGS: PlatformSettings = {
  ownerName: "রাকিবুল হাসান (Rakibul Hasan)",
  designation: "ফুল-স্ট্যাক ওয়েব ও অ্যাপ ডেভেলপার, ডিজাইনার এবং ক্রিয়েটর",
  bio: "স্বাগতম আমার ব্যক্তিগত ডিজিটাল শোকেস প্ল্যাটফর্মে! এখানে আমি আমার তৈরি করা ওয়েবসাইট, মোবাইল অ্যাপ্লিকেশন, গ্রাফিক্স ডিজাইন, ভিডিও এডিটিং, অডিও প্রজেক্ট এবং সৃষ্টিশীল সকল কাজ এক জায়গায় শেয়ার করি। আপনি চাইলে কাজগুলো দেখতে পারেন, ফিডব্যাক জানাতে পারেন এবং লাইভ ডেমো যাচাই করতে পারেন।",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  coverUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80",
  themeColor: "indigo",
  layoutMode: "grid",
  contactEmail: "rakibul.creative@example.com",
  contactPhone: "+880 1712-345678",
  facebookUrl: "https://facebook.com",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com",
  footerText: "© ২০২৬ রাকিবুল হাসান। নিজস্ব প্ল্যাটফর্মে সর্বস্বত্ব সংরক্ষিত। তৈরি করা হয়েছে অত্যন্ত ভালোবাসার সাথে।",
  allowPublicComments: true,
  adminPin: "1234",
  visitorCount: 1420
};

export const DEFAULT_WORKS: WorkItem[] = [
  {
    id: "work-1",
    title: "ই-কমার্স মেগা শপ প্ল্যাটফর্ম (E-commerce Frontend & Backend)",
    category: "website",
    description: "সম্পূর্ণ রেসপন্সিভ এবং আধুনিক প্রযুক্তিতে তৈরি একটি ই-কমার্স ওয়েবসাইট। এতে রয়েছে রিয়েল-টাইম কার্ট সিস্টেম, পেমেন্ট গেটওয়ে ইন্টিগ্রেশন, ডায়নামিক প্রোডাক্ট ফিল্টারিং এবং একটি শক্তিশালী এডমিন ড্যাশবোর্ড।",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1556742049-0a5015e181e1?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://example.com/shop",
    repoLink: "https://github.com/example/e-commerce",
    tags: ["React", "Tailwind CSS", "Node.js", "MongoDB"],
    likesCount: 45,
    viewsCount: 320,
    createdAt: "২০২৬-০২-১০",
    featured: true,
    comments: [
      { id: "c1", name: "তানভীর আহমেদ", text: "ইউজার ইন্টারফেসটি অসাধারণ হয়েছে ভাই! ফিল্টারিং অনেক ফাস্ট কাজ করছে।", date: "২০২৬-০২-১১" },
      { id: "c2", name: "সাদিয়া ইসলাম", text: "খুব সুন্দর প্রজেক্ট। লাইভ লিংক কাজ করছে। শুভকামনা রইল।", date: "২০২৬-০২-১২" }
    ]
  },
  {
    id: "work-2",
    title: "স্মার্ট হেলথ ট্র্যাকার (Android & iOS App)",
    category: "app",
    description: "ব্যবহারকারীর দৈনন্দিন হাঁটার হিসাব, ক্যালোরি বার্ন, পানি পানের রিমাইন্ডার এবং হার্ট-রেট মনিটর করার জন্য একটি চমৎকার মোবাইল অ্যাপ্লিকেশন। ডার্ক মোড এবং চমৎকার এনিমেশন সমৃদ্ধ।",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://play.google.com/store/apps",
    tags: ["Flutter", "Dart", "Firebase", "HealthKit"],
    likesCount: 78,
    viewsCount: 512,
    createdAt: "২০২৬-০১-২৫",
    featured: true,
    comments: [
      { id: "c3", name: "মাহমুদুল হাসান", text: "অ্যাপটির ডিজাইন খুবই প্রিমিয়াম। এনিমেশনগুলো স্মুথ।", date: "২০২৬-০১-২৬" }
    ]
  },
  {
    id: "work-3",
    title: "ব্র্যান্ড আইডেন্টিটি ও লোগো ডিজাইন (Corporate Brandbook)",
    category: "graphics",
    description: "একটি স্বনামধন্য টেকনোলজি স্টার্টআপের জন্য তৈরি করা সম্পূর্ণ ব্র্যান্ড আইডেন্টিটি। এতে রয়েছে ভেক্টর লোগো, টাইপোগ্রাফি গাইডলাইন, বিজনেস কার্ড, এবং সোশ্যাল মিডিয়া কিট।",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    tags: ["Adobe Illustrator", "Photoshop", "Branding", "Vector"],
    likesCount: 62,
    viewsCount: 290,
    createdAt: "২০২৬-০২-০২",
    featured: false,
    comments: []
  },
  {
    id: "work-4",
    title: "সিনেমাটিক ট্রাভেল ভ্লগ - সুন্দরবন ও কক্সবাজার",
    category: "video",
    description: "ড্রোন শট, কালার গ্রেডিং এবং চমৎকার সাউন্ড ডিজাইনে তৈরি একটি সিনেমাটিক ভিডিও ডকুমেন্টারি। বাংলাদেশের প্রাকৃতিক সৌন্দর্য তুলে ধরার একটি ক্ষুদ্র প্রয়াস।",
    mediaType: "youtube",
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Safe placeholder embed URL
    tags: ["Premiere Pro", "After Effects", "Color Grading", "Cinematic"],
    likesCount: 110,
    viewsCount: 890,
    createdAt: "২০২৫-১২-১৫",
    featured: true,
    comments: [
      { id: "c4", name: "রাইসা চৌধুরী", text: "কালার গ্রেডিং জাস্ট ওয়াও! ব্যাকগ্রাউন্ড মিউজিক সিলেকশনও দারুণ।", date: "২০২৫-১২-১৬" }
    ]
  },
  {
    id: "work-5",
    title: "লোফি রিল্যাক্সিং অডিও ট্র্যাক (Lo-Fi Study Beats)",
    category: "audio",
    description: "কোডিং এবং পড়াশোনা করার সময় শোনার জন্য তৈরি করা আমার নিজস্ব মিউজিক প্রজেক্ট। এতে রয়েছে মন ভালো করা বিট এবং বৃষ্টির মৃদু শব্দ।",
    mediaType: "audio_url",
    mediaUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    tags: ["FL Studio", "Audio Mixing", "Lo-Fi", "Music"],
    likesCount: 89,
    viewsCount: 420,
    createdAt: "২০২৬-০২-০১",
    featured: false,
    comments: []
  },
  {
    id: "work-6",
    title: "পার্সোনাল পোর্টফোলিও ইউআই/ইউএক্স (Figma Prototype)",
    category: "graphics",
    description: "আধুনিক গ্লাস-মরফিজম (Glassmorphism) থিম ব্যবহার করে ফিগমাতে তৈরি করা একটি ফিউচারিস্টিক পোর্টফোলিও ডিজাইন। সম্পূর্ণ ইন্টারঅ্যাক্টিভ প্রোটোটাইপ।",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    liveLink: "https://figma.com",
    tags: ["Figma", "UI/UX", "Web Design", "Prototype"],
    likesCount: 34,
    viewsCount: 180,
    createdAt: "২০২৬-০২-০৮",
    featured: false,
    comments: []
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: "সকল কাজ (All)",
  website: "ওয়েবসাইট (Websites)",
  app: "অ্যাপস (Apps)",
  graphics: "গ্রাফিক্স ডিজাইন (Graphics)",
  video: "ভিডিও (Videos)",
  audio: "অডিও (Audio)",
  other: "অন্যান্য (Others)"
};

export const CATEGORY_ICONS: Record<string, string> = {
  website: "Globe",
  app: "Smartphone",
  graphics: "Palette",
  video: "Video",
  audio: "Music",
  other: "FolderPlus"
};

export const THEME_COLORS = {
  indigo: {
    primary: "bg-indigo-600 hover:bg-indigo-700",
    text: "text-indigo-600",
    border: "border-indigo-600",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    gradient: "from-indigo-600 to-violet-600",
    ring: "focus:ring-indigo-500",
    tabActive: "bg-indigo-600 text-white",
  },
  emerald: {
    primary: "bg-emerald-600 hover:bg-emerald-700",
    text: "text-emerald-600",
    border: "border-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    gradient: "from-emerald-600 to-teal-700",
    ring: "focus:ring-emerald-500",
    tabActive: "bg-emerald-600 text-white",
  },
  violet: {
    primary: "bg-violet-600 hover:bg-violet-700",
    text: "text-violet-600",
    border: "border-violet-600",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    gradient: "from-violet-600 to-purple-700",
    ring: "focus:ring-violet-500",
    tabActive: "bg-violet-600 text-white",
  },
  rose: {
    primary: "bg-rose-600 hover:bg-rose-700",
    text: "text-rose-600",
    border: "border-rose-600",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    gradient: "from-rose-600 to-pink-700",
    ring: "focus:ring-rose-500",
    tabActive: "bg-rose-600 text-white",
  },
  amber: {
    primary: "bg-amber-600 hover:bg-amber-700",
    text: "text-amber-600",
    border: "border-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    gradient: "from-amber-600 to-orange-600",
    ring: "focus:ring-amber-500",
    tabActive: "bg-amber-600 text-white",
  },
  cyan: {
    primary: "bg-cyan-600 hover:bg-cyan-700",
    text: "text-cyan-600",
    border: "border-cyan-600",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
    gradient: "from-cyan-600 to-blue-600",
    ring: "focus:ring-cyan-500",
    tabActive: "bg-cyan-600 text-white",
  }
};
