import { useState, useEffect } from 'react';
import { 
  DEFAULT_SETTINGS, 
  DEFAULT_WORKS, 
  PlatformSettings, 
  WorkItem, 
  CATEGORY_LABELS, 
  THEME_COLORS 
} from './data/initialData';
import { Header } from './components/Header';
import { StatsDashboard } from './components/StatsDashboard';
import { WorkCard } from './components/WorkCard';
import { AdminPanel } from './components/AdminPanel';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Layers,
  Lock
} from 'lucide-react';

export default function App() {
  // --- 1. Load Initial State from LocalStorage or Defaults ---
  const [settings, setSettings] = useState<PlatformSettings>(() => {
    const saved = localStorage.getItem('SHOWCASE_SETTINGS');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) { console.error(e); }
    }
    return DEFAULT_SETTINGS;
  });

  const [works, setWorks] = useState<WorkItem[]>(() => {
    const saved = localStorage.getItem('SHOWCASE_WORKS');
    if (saved) {
      try { return JSON.parse(saved); } catch(e) { console.error(e); }
    }
    return DEFAULT_WORKS;
  });

  // Admin access state
  const [isAdmin, setIsAdmin] = useState<boolean>(true); // Default true so the user instantly sees the customizable Settings and Admin Panel!
  
  // Search & Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Editing state
  const [editingWork, setEditingWork] = useState<WorkItem | null>(null);

  // Layout mode override locally
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');

  // --- 2. Auto Sync with LocalStorage ---
  useEffect(() => {
    localStorage.setItem('SHOWCASE_SETTINGS', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('SHOWCASE_WORKS', JSON.stringify(works));
  }, [works]);

  // Simulate unique visitor counter slightly incrementing on initial session
  useEffect(() => {
    const timer = setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        visitorCount: prev.visitorCount + 1
      }));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // --- 3. Handlers for Admin Operations ---
  const handleUpdateSettings = (newSettings: PlatformSettings) => {
    setSettings(newSettings);
  };

  const handleAddWork = (newWorkData: Omit<WorkItem, 'id' | 'likesCount' | 'viewsCount' | 'createdAt' | 'comments'>) => {
    const newItem: WorkItem = {
      ...newWorkData,
      id: `work-${Date.now()}`,
      likesCount: Math.floor(Math.random() * 10) + 1, // small base likes
      viewsCount: Math.floor(Math.random() * 50) + 15,
      createdAt: new Date().toISOString().split('T')[0],
      comments: []
    };
    setWorks(prev => [newItem, ...prev]);
  };

  const handleUpdateExistingWork = (updatedWork: WorkItem) => {
    setWorks(prev => prev.map(w => w.id === updatedWork.id ? updatedWork : w));
    setEditingWork(null);
  };

  const handleDeleteWork = (id: string) => {
    setWorks(prev => prev.filter(w => w.id !== id));
  };

  const handleResetData = () => {
    setWorks(DEFAULT_WORKS);
    setSettings(DEFAULT_SETTINGS);
    setEditingWork(null);
  };

  const handleClearAllWorks = () => {
    setWorks([]);
    setEditingWork(null);
  };

  // --- 4. Handlers for Visitors Interactive Operations ---
  const handleLike = (id: string) => {
    setWorks(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, likesCount: w.likesCount + 1 };
      }
      return w;
    }));
  };

  const handleAddComment = (id: string, name: string, text: string) => {
    const newComment = {
      id: `comm-${Date.now()}`,
      name,
      text,
      date: new Date().toISOString().split('T')[0]
    };
    setWorks(prev => prev.map(w => {
      if (w.id === id) {
        return {
          ...w,
          comments: [...(w.comments || []), newComment]
        };
      }
      return w;
    }));
  };

  // --- 5. Filtering Logic ---
  const filteredWorks = works.filter(w => {
    const matchesCategory = selectedCategory === 'all' || w.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      w.title.toLowerCase().includes(q) || 
      w.description.toLowerCase().includes(q) ||
      (w.tags && w.tags.some(t => t.toLowerCase().includes(q)));
    
    return matchesCategory && matchesQuery;
  });

  // Calculate totals
  const totalLikes = works.reduce((sum, w) => sum + (w.likesCount || 0), 0);
  const totalViews = works.reduce((sum, w) => sum + (w.viewsCount || 0), 0);
  const currentTheme = THEME_COLORS[settings.themeColor] || THEME_COLORS.indigo;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/80 font-sans antialiased text-gray-900 overflow-hidden">
      
      {/* Top Welcome / Guidance Notification Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white text-xs py-2 px-4 text-center shadow-xs relative z-40 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 overflow-hidden">
          <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded text-[10px] uppercase shrink-0">
            ব্যক্তিগত শোকেস
          </span>
          <p className="truncate max-w-full">
            স্বাগতম! আপনি আপনার বানানো <strong>ওয়েবসাইট, অ্যাপস, গ্রাফিক্স, ভিডিও, অডিও</strong> সবকিছু এখানে শেয়ার ও কাস্টমাইজ করতে পারেন।
          </p>
          <button
            onClick={() => {
              setIsAdmin(true);
              const el = document.getElementById('admin-settings-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="underline font-bold text-amber-300 hover:text-amber-100 transition cursor-pointer shrink-0 ml-1"
          >
            সেটিংস প্যানেলে যান ⚙️
          </button>
        </div>
      </div>

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        
        {/* 1. Header & Profile Component */}
        <Header 
          settings={settings}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          totalWorksCount={works.length}
          totalLikes={totalLikes}
          totalViews={totalViews}
        />

        {/* 2. Admin Settings Panel (Only visible if isAdmin is enabled) */}
        {isAdmin && (
          <div id="admin-settings-section" className="scroll-mt-4 overflow-hidden">
            <AdminPanel 
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onAddWork={handleAddWork}
              onResetData={handleResetData}
              onClearAllWorks={handleClearAllWorks}
              editingWork={editingWork}
              onUpdateExistingWork={handleUpdateExistingWork}
              onCancelEdit={() => setEditingWork(null)}
            />
          </div>
        )}

        {/* Admin notice shortcut for those browsing without admin panel active */}
        {!isAdmin && (
          <div className="bg-amber-50 rounded-xl p-3 mb-6 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-2 overflow-hidden text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs text-amber-900 font-medium truncate max-w-full">
              <Lock className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="truncate">আপনার ছবি, নাম, এবং নতুন কাজ আপলোড করতে চান? এডমিন মোড চালু করুন।</span>
            </div>
            <button
              onClick={() => setIsAdmin(true)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1 rounded-lg text-xs shadow-2xs transition cursor-pointer shrink-0"
            >
              🔑 এডমিন প্যানেল খুলুন
            </button>
          </div>
        )}

        {/* 3. Graphical Statistics Breakdown Dashboard */}
        <StatsDashboard 
          works={works} 
          themeColor={settings.themeColor} 
        />

        {/* 4. Subject Navigation Filters & Search Header */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6 overflow-hidden">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100 overflow-hidden">
            <div className="overflow-hidden">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2 truncate max-w-full">
                <span className="truncate">আমার শেয়ার করা প্রজেক্টসমূহ</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0">
                  {filteredWorks.length} টি
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 truncate max-w-full">
                ক্যাটাগরিতে ক্লিক করে অথবা সার্চ বারে লিখে আপনার পছন্দের কাজ খুঁজে নিন
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-72 shrink-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম বা ট্যাগ লিখে খুঁজুন..."
                className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-gray-600"
                >
                  ✖
                </button>
              )}
            </div>
          </div>

          {/* Subject Categories Pills Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-4 overflow-hidden">
            <span className="text-xs text-gray-400 mr-1 flex items-center gap-1 shrink-0 font-medium">
              <Filter className="w-3 h-3" />
              <span>ফিল্টার:</span>
            </span>

            {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((catKey) => {
              const isSelected = selectedCategory === catKey;
              const count = catKey === 'all' 
                ? works.length 
                : works.filter(w => w.category === catKey).length;

              return (
                <button
                  type="button"
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 truncate max-w-full ${
                    isSelected 
                      ? `${currentTheme.primary} text-white shadow-2xs font-bold` 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  <span className="truncate">{CATEGORY_LABELS[catKey]}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Grid / List Mode local toggle */}
            <div className="ml-auto hidden sm:flex items-center gap-1 border-l border-gray-200 pl-3 shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition ${layoutMode === 'grid' ? 'bg-gray-200 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                title="গ্রিড ভিউ"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('list')}
                className={`p-1.5 rounded-lg transition ${layoutMode === 'list' ? 'bg-gray-200 text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                title="লিস্ট ভিউ"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Active Search hint notice */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex items-center justify-between bg-indigo-50 text-indigo-900 text-xs px-4 py-2 rounded-xl mb-6 overflow-hidden">
            <span className="truncate max-w-full">
              ফিল্টার প্রয়োগ করা হয়েছে: {selectedCategory !== 'all' ? `"${CATEGORY_LABELS[selectedCategory]}"` : ''} {searchQuery ? `শব্দগুচ্ছ "${searchQuery}"` : ''} ({filteredWorks.length}টি ফলাফল পাওয়া গেছে)
            </span>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-indigo-700 hover:underline font-bold shrink-0 ml-2 cursor-pointer"
            >
              ফিল্টার মুছুন
            </button>
          </div>
        )}

        {/* 5. Render Portfolio Works Showcase */}
        {filteredWorks.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 my-4 shadow-2xs overflow-hidden">
            <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-800">কোনো কাজ খুঁজে পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto break-words">
              আপনার নির্বাচিত ক্যাটাগরি বা সার্চ কিওয়ার্ডের সাথে মিল রেখে কোনো প্রজেক্ট পাওয়া যায়নি। এডমিন প্যানেল থেকে নতুন কাজ যোগ করুন অথবা অন্য কোনো ফিল্টার নির্বাচন করুন।
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition cursor-pointer inline-flex items-center gap-1 truncate max-w-full"
            >
              সকল কাজ একসাথে দেখুন
            </button>
          </div>
        ) : (
          <div className={
            layoutMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" 
              : "space-y-4 animate-fade-in"
          }>
            {filteredWorks.map((workItem) => (
              <WorkCard 
                key={workItem.id}
                work={workItem}
                isAdmin={isAdmin}
                onLike={handleLike}
                onAddComment={handleAddComment}
                onDelete={handleDeleteWork}
                onEdit={(w) => {
                  setEditingWork(w);
                  setIsAdmin(true);
                  const el = document.getElementById('admin-settings-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8 text-center text-xs text-gray-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-2 overflow-hidden">
          <p className="font-medium text-gray-700 truncate max-w-full">
            {settings.footerText || "© ২০২৬ রাকিবুল হাসান। নিজস্ব প্ল্যাটফর্মে সর্বস্বত্ব সংরক্ষিত।"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400">
            <span>সবগুলো বিষয়ে আপলোড সুবিধা</span>
            <span>•</span>
            <span>রিয়েল-টাইম কাস্টমাইজেশন</span>
            <span>•</span>
            <span>১০০% রেসপন্সিভ ডিজাইন</span>
          </div>
          <p className="text-[10px] text-indigo-500/80 mt-4 break-words">
            Built beautifully using React, Vite & Tailwind CSS. Ready to showcase Websites, Mobile Apps, Graphics Design, Audio, Video & more.
          </p>
        </div>
      </footer>

    </div>
  );
}
