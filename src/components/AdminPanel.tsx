import React, { useState } from 'react';
import { 
  PlatformSettings, 
  WorkItem, 
  THEME_COLORS, 
  CATEGORY_LABELS 
} from '../data/initialData';
import { 
  Settings, 
  PlusCircle, 
  Database, 
  Sparkles, 
  Check, 
  AlertTriangle,
  RotateCcw,
  Palette,
  User
} from 'lucide-react';

interface AdminPanelProps {
  settings: PlatformSettings;
  onUpdateSettings: (newSettings: PlatformSettings) => void;
  onAddWork: (work: Omit<WorkItem, 'id' | 'likesCount' | 'viewsCount' | 'createdAt' | 'comments'>) => void;
  onResetData: () => void;
  onClearAllWorks: () => void;
  editingWork: WorkItem | null;
  onUpdateExistingWork: (work: WorkItem) => void;
  onCancelEdit: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  settings,
  onUpdateSettings,
  onAddWork,
  onResetData,
  onClearAllWorks,
  editingWork,
  onUpdateExistingWork,
  onCancelEdit
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'add_work' | 'database'>('profile');
  const [successMessage, setSuccessMessage] = useState('');

  // Profile Form Local State
  const [profName, setProfName] = useState(settings.ownerName);
  const [profDesig, setProfDesig] = useState(settings.designation);
  const [profBio, setProfBio] = useState(settings.bio);
  const [profAvatar, setProfAvatar] = useState(settings.avatarUrl);
  const [profCover, setProfCover] = useState(settings.coverUrl);
  const [profTheme, setProfTheme] = useState(settings.themeColor);
  const [profEmail, setProfEmail] = useState(settings.contactEmail);
  const [profPhone, setProfPhone] = useState(settings.contactPhone);
  const [profFb, setProfFb] = useState(settings.facebookUrl);
  const [profGithub, setProfGithub] = useState(settings.githubUrl);
  const [profLinkedin, setProfLinkedin] = useState(settings.linkedinUrl);
  const [profYoutube, setProfYoutube] = useState(settings.youtubeUrl);
  const [profFooter, setProfFooter] = useState(settings.footerText);

  // New Work Form Local State
  const [workTitle, setWorkTitle] = useState('');
  const [workCategory, setWorkCategory] = useState<'website' | 'app' | 'graphics' | 'video' | 'audio' | 'other'>('website');
  const [workDesc, setWorkDesc] = useState('');
  const [workMediaType, setWorkMediaType] = useState<'image' | 'video_url' | 'audio_url' | 'youtube'>('image');
  const [workMediaUrl, setWorkMediaUrl] = useState('');
  const [workLiveLink, setWorkLiveLink] = useState('');
  const [workRepoLink, setWorkRepoLink] = useState('');
  const [workTags, setWorkTags] = useState('');
  const [workFeatured, setWorkFeatured] = useState(false);

  // Effect to populate edit fields if editingWork changes
  React.useEffect(() => {
    if (editingWork) {
      setActiveTab('add_work');
      setWorkTitle(editingWork.title);
      setWorkCategory(editingWork.category);
      setWorkDesc(editingWork.description);
      setWorkMediaType(editingWork.mediaType);
      setWorkMediaUrl(editingWork.mediaUrl);
      setWorkLiveLink(editingWork.liveLink || '');
      setWorkRepoLink(editingWork.repoLink || '');
      setWorkTags(editingWork.tags ? editingWork.tags.join(', ') : '');
      setWorkFeatured(editingWork.featured);
    }
  }, [editingWork]);

  const showTemporaryNotice = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      ownerName: profName,
      designation: profDesig,
      bio: profBio,
      avatarUrl: profAvatar,
      coverUrl: profCover,
      themeColor: profTheme,
      contactEmail: profEmail,
      contactPhone: profPhone,
      facebookUrl: profFb,
      githubUrl: profGithub,
      linkedinUrl: profLinkedin,
      youtubeUrl: profYoutube,
      footerText: profFooter
    });
    showTemporaryNotice('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const handleWorkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workTitle.trim() || !workMediaUrl.trim()) {
      alert('অনুগ্রহ করে কাজের শিরোনাম এবং মিডিয়া URL প্রদান করুন।');
      return;
    }

    const tagsArray = workTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (editingWork) {
      // Update existing
      onUpdateExistingWork({
        ...editingWork,
        title: workTitle.trim(),
        category: workCategory,
        description: workDesc.trim(),
        mediaType: workMediaType,
        mediaUrl: workMediaUrl.trim(),
        liveLink: workLiveLink.trim() || undefined,
        repoLink: workRepoLink.trim() || undefined,
        tags: tagsArray,
        featured: workFeatured
      });
      showTemporaryNotice('প্রজেক্টটি সফলভাবে আপডেট করা হয়েছে!');
      onCancelEdit();
    } else {
      // Create new
      onAddWork({
        title: workTitle.trim(),
        category: workCategory,
        description: workDesc.trim(),
        mediaType: workMediaType,
        mediaUrl: workMediaUrl.trim(),
        liveLink: workLiveLink.trim() || undefined,
        repoLink: workRepoLink.trim() || undefined,
        tags: tagsArray,
        featured: workFeatured
      });
      showTemporaryNotice('নতুন কাজটি সফলভাবে আপনার প্ল্যাটফর্মে যুক্ত হয়েছে!');
    }

    // Reset local fields
    setWorkTitle('');
    setWorkDesc('');
    setWorkMediaUrl('');
    setWorkLiveLink('');
    setWorkRepoLink('');
    setWorkTags('');
    setWorkFeatured(false);
  };

  const fillSampleMediaUrl = (type: string) => {
    switch (type) {
      case 'image':
        setWorkMediaUrl('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80');
        break;
      case 'youtube':
        setWorkMediaUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
        break;
      case 'audio_url':
        setWorkMediaUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3');
        break;
      case 'video_url':
        setWorkMediaUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
        break;
    }
  };

  return (
    <div className="bg-amber-50/40 rounded-2xl p-6 md:p-8 border-2 border-amber-200 mb-8 shadow-sm overflow-hidden">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-amber-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-white p-1.5 rounded-lg shrink-0">
              <Settings className="w-5 h-5 animate-spin-slow" />
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">প্ল্যাটফর্ম সেটিংস ও এডমিন প্যানেল</h2>
          </div>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            এখান থেকে আপনি আপনার পুরো প্ল্যাটফর্মটি ইচ্ছামতো কাস্টমাইজ করতে পারবেন। সব পরিবর্তন সাথে সাথে সেভ হবে।
          </p>
        </div>

        {/* Temporary Feedback alert */}
        {successMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md animate-bounce flex items-center gap-1.5 self-stretch sm:self-auto text-center justify-center">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 bg-white/80 p-1.5 rounded-xl border border-amber-200/60 overflow-hidden">
        <button
          onClick={() => { setActiveTab('profile'); onCancelEdit(); }}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'profile' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-gray-700 hover:bg-amber-100/50'
          }`}
        >
          <User className="w-4 h-4 shrink-0" />
          <span className="truncate">১. প্রোফাইল ও থিম কাস্টমাইজ</span>
        </button>

        <button
          onClick={() => setActiveTab('add_work')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'add_work' 
              ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300' 
              : 'text-gray-700 hover:bg-amber-100/50'
          }`}
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">
            {editingWork ? '✏️ প্রজেক্ট এডিট করুন' : '২. নতুন কাজ যোগ করুন'}
          </span>
        </button>

        <button
          onClick={() => { setActiveTab('database'); onCancelEdit(); }}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'database' 
              ? 'bg-amber-500 text-white shadow-sm' 
              : 'text-gray-700 hover:bg-amber-100/50'
          }`}
        >
          <Database className="w-4 h-4 shrink-0" />
          <span className="truncate">৩. ডাটা ব্যাকআপ ও রিসেট</span>
        </button>
      </div>

      {/* TAB 1: Profile & Theme Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveSettings} className="space-y-6 bg-white p-5 md:p-6 rounded-xl border border-amber-100 animate-fade-in overflow-hidden">
          
          <div className="bg-amber-50 p-3 rounded-lg flex items-center gap-2 text-xs text-amber-900 font-medium">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>টিপস: আপনি আপনার নাম, উপাধি, নিজের সম্পর্কে যেকোনো তথ্য এবং সোশ্যাল লিংক এখানে পরিবর্তন করতে পারবেন।</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">প্ল্যাটফর্ম মালিকের নাম (Owner Name):</label>
              <input 
                type="text" 
                value={profName} 
                onChange={(e) => setProfName(e.target.value)} 
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="যেমন: রাকিবুল ইসলাম"
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">পেশা বা উপাধি (Designation):</label>
              <input 
                type="text" 
                value={profDesig} 
                onChange={(e) => setProfDesig(e.target.value)} 
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="যেমন: ফুল-স্ট্যাক ডেভেলপার ও ডিজাইনার"
              />
            </div>

            {/* Avatar URL */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                <span>প্রোফাইল ছবি URL (Avatar):</span>
                <span className="text-[10px] font-normal text-gray-400">যেকোনো ছবির ডিরেক্ট লিংক</span>
              </label>
              <input 
                type="text" 
                value={profAvatar} 
                onChange={(e) => setProfAvatar(e.target.value)} 
                className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none truncate"
              />
            </div>

            {/* Cover URL */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                <span>কভার ইমেজ URL (Cover):</span>
                <span className="text-[10px] font-normal text-gray-400">বড় রেজল্যুশনের ছবি</span>
              </label>
              <input 
                type="text" 
                value={profCover} 
                onChange={(e) => setProfCover(e.target.value)} 
                className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none truncate"
              />
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">আপনার সম্পর্কে (Bio / Introduction):</label>
              <textarea 
                rows={3}
                value={profBio} 
                onChange={(e) => setProfBio(e.target.value)} 
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                placeholder="স্বাগতম আমার ব্যক্তিগত প্ল্যাটফর্মে..."
              />
            </div>

            {/* Theme Color Selection */}
            <div className="md:col-span-2 pt-2 border-t border-gray-100 overflow-hidden">
              <label className="block text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>প্ল্যাটফর্মের থিম কালার কাস্টমাইজ করুন:</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {(Object.keys(THEME_COLORS) as Array<keyof typeof THEME_COLORS>).map((colorKey) => {
                  const isSelected = profTheme === colorKey;
                  const colorLabels: Record<string, string> = {
                    indigo: 'ইন্ডিগো ব্লু',
                    emerald: 'সবুজ (Emerald)',
                    violet: 'ভায়োলেট',
                    rose: 'গোলাপী (Rose)',
                    amber: 'সোনালী (Amber)',
                    cyan: 'সায়ান (Cyan)'
                  };

                  let bgClass = 'bg-indigo-600';
                  if (colorKey === 'emerald') bgClass = 'bg-emerald-600';
                  if (colorKey === 'violet') bgClass = 'bg-violet-600';
                  if (colorKey === 'rose') bgClass = 'bg-rose-600';
                  if (colorKey === 'amber') bgClass = 'bg-amber-600';
                  if (colorKey === 'cyan') bgClass = 'bg-cyan-600';

                  return (
                    <button
                      type="button"
                      key={colorKey}
                      onClick={() => setProfTheme(colorKey)}
                      className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1.5 cursor-pointer truncate ${
                        isSelected 
                          ? 'border-gray-900 bg-gray-50 ring-2 ring-gray-900 shadow-xs font-bold' 
                          : 'border-gray-200 hover:bg-gray-50 opacity-80'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full ${bgClass} block shadow-2xs shrink-0`}></span>
                      <span className="text-[11px] text-gray-800 truncate max-w-full">{colorLabels[colorKey] || colorKey}</span>
                      {isSelected && <span className="text-[9px] bg-gray-900 text-white px-1.5 py-0.2 rounded shrink-0">নির্বাচিত</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact Details */}
            <div className="md:col-span-2 pt-2 border-t border-gray-100 overflow-hidden">
              <span className="block text-xs font-bold text-gray-700 mb-3">যোগাযোগ ও সোশ্যাল মিডিয়া লিংক:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 truncate">ইমেইল ঠিকানা:</label>
                  <input type="email" value={profEmail} onChange={e => setProfEmail(e.target.value)} className="w-full p-2 text-xs border rounded" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 truncate">মোবাইল নম্বর:</label>
                  <input type="text" value={profPhone} onChange={e => setProfPhone(e.target.value)} className="w-full p-2 text-xs border rounded" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 truncate">Facebook URL:</label>
                  <input type="text" value={profFb} onChange={e => setProfFb(e.target.value)} className="w-full p-2 text-xs border rounded" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 truncate">GitHub URL:</label>
                  <input type="text" value={profGithub} onChange={e => setProfGithub(e.target.value)} className="w-full p-2 text-xs border rounded" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 truncate">LinkedIn URL:</label>
                  <input type="text" value={profLinkedin} onChange={e => setProfLinkedin(e.target.value)} className="w-full p-2 text-xs border rounded" />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-500 mb-1 truncate">YouTube URL:</label>
                  <input type="text" value={profYoutube} onChange={e => setProfYoutube(e.target.value)} className="w-full p-2 text-xs border rounded" />
                </div>
              </div>
            </div>

            {/* Footer Text */}
            <div className="md:col-span-2 pt-2 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 mb-1">ফুটার কপিরাইট টেক্সট (Footer Text):</label>
              <input 
                type="text" 
                value={profFooter} 
                onChange={(e) => setProfFooter(e.target.value)} 
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs md:text-sm shadow-md transition cursor-pointer"
            >
              💾 প্রোফাইল ও থিম আপডেট করুন
            </button>
          </div>

        </form>
      )}

      {/* TAB 2: Add New Subject / Work Form */}
      {activeTab === 'add_work' && (
        <form onSubmit={handleWorkSubmit} className="space-y-4 bg-white p-5 md:p-6 rounded-xl border border-amber-100 animate-fade-in overflow-hidden">
          
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 truncate">
            <h3 className="font-bold text-gray-900 text-sm md:text-base flex items-center gap-1.5 text-indigo-900 truncate">
              {editingWork ? '✏️ নির্বাচিত প্রজেক্ট পরিবর্তন করুন' : '✨ নতুন প্রজেক্ট/বিষয় যুক্ত করুন'}
            </h3>
            {editingWork && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="text-xs text-rose-600 hover:underline font-bold cursor-pointer shrink-0 ml-2"
              >
                এডিট বাতিল ✖
              </button>
            )}
          </div>

          <div className="bg-indigo-50/70 p-3 rounded-lg text-xs text-indigo-900 leading-relaxed">
            💡 <strong>নির্দেশনা:</strong> আপনি আপনার বানানো ওয়েবসাইট, অ্যাপস, গ্রাফিক্স ডিজাইন, ভিডিও বা অডিও ইত্যাদি যেকোনো কাজের মিডিয়া লিংক এখানে পেস্ট করতে পারবেন। ইউটিউব ভিডিও এম্বেড করতে চাইলে <strong>'YouTube Embed'</strong> নির্বাচন করুন।
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">কাজের শিরোনাম (Work Title) *</label>
              <input 
                type="text" 
                value={workTitle} 
                onChange={(e) => setWorkTitle(e.target.value)} 
                required
                placeholder="যেমন: ই-কমার্স ওয়েবসাইট ফ্রন্টএন্ড"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">ক্যাটাগরি বা বিষয় (Subject Category) *</label>
              <select
                value={workCategory}
                onChange={(e) => setWorkCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>)
                  .filter(k => k !== 'all')
                  .map(k => (
                    <option key={k} value={k}>
                      {CATEGORY_LABELS[k]}
                    </option>
                  ))}
              </select>
            </div>

            {/* Media Type */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">মিডিয়ার ধরন (Media Type) *</label>
              <select
                value={workMediaType}
                onChange={(e) => setWorkMediaType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium truncate max-w-full"
              >
                <option value="image">🖼️ সাধারণ ছবি (Image URL)</option>
                <option value="youtube">📺 ইউটিউব ভিডিও (YouTube Embed URL)</option>
                <option value="video_url">🎬 সরাসরি ভিডিও ফাইল (MP4 URL)</option>
                <option value="audio_url">🎵 অডিও ফাইল (MP3 URL)</option>
              </select>
              
              {/* Helpful auto filler */}
              <div className="mt-1 truncate max-w-full">
                <button
                  type="button"
                  onClick={() => fillSampleMediaUrl(workMediaType)}
                  className="text-[10px] text-indigo-600 hover:underline cursor-pointer font-medium inline-flex items-center gap-0.5 truncate max-w-full"
                >
                  ⚡ ডেমো একটি মিডিয়া URL বসাতে এখানে ক্লিক করুন
                </button>
              </div>
            </div>

            {/* Media URL */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">মিডিয়া লিংক (Media Link / URL) *</label>
              <input 
                type="text" 
                value={workMediaUrl} 
                onChange={(e) => setWorkMediaUrl(e.target.value)} 
                required
                placeholder="https://..."
                className="w-full px-3 py-2 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[10px] text-gray-400 mt-0.5 truncate">ছবির লিংক বা ইউটিউব এম্বেড লিংক দিন</p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">কাজের সংক্ষিপ্ত বিবরণ (Description):</label>
              <textarea 
                rows={2}
                value={workDesc} 
                onChange={(e) => setWorkDesc(e.target.value)} 
                placeholder="এই প্রজেক্টে কী কী ফিচার আছে, কোন কোন প্রযুক্তি ব্যবহার করা হয়েছে ইত্যাদি লিখুন..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Live Link */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">লাইভ ডেমো লিংক (Live Link - ঐচ্ছিক):</label>
              <input 
                type="text" 
                value={workLiveLink} 
                onChange={(e) => setWorkLiveLink(e.target.value)} 
                placeholder="https://example.com"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
              />
            </div>

            {/* Repo Link */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">সোর্স কোড লিংক (GitHub / Figma - ঐচ্ছিক):</label>
              <input 
                type="text" 
                value={workRepoLink} 
                onChange={(e) => setWorkRepoLink(e.target.value)} 
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 truncate">ট্যাগসমূহ (Tags - কমা দিয়ে লিখুন):</label>
              <input 
                type="text" 
                value={workTags} 
                onChange={(e) => setWorkTags(e.target.value)} 
                placeholder="React, Design, App, Video"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 truncate"
              />
              <p className="text-[10px] text-gray-400 mt-0.5 truncate">কমা দিয়ে আলাদা করুন</p>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center pt-5 overflow-hidden">
              <label className="inline-flex items-center gap-2 cursor-pointer truncate max-w-full">
                <input 
                  type="checkbox" 
                  checked={workFeatured} 
                  onChange={(e) => setWorkFeatured(e.target.checked)} 
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 shrink-0"
                />
                <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded truncate max-w-full">
                  ⭐ বিশেষ প্রজেক্ট হিসেবে মার্ক করুন (Featured)
                </span>
              </label>
            </div>

          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
            {editingWork && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold cursor-pointer shrink-0"
              >
                বাতিল করুন
              </button>
            )}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded-lg text-xs md:text-sm shadow-md transition cursor-pointer flex items-center gap-1.5 truncate"
            >
              <span className="truncate">{editingWork ? '💾 পরিবর্তন সংরক্ষণ করুন' : '🚀 প্রজেক্ট আপলোড করুন'}</span>
            </button>
          </div>

        </form>
      )}

      {/* TAB 3: Database & Reset */}
      {activeTab === 'database' && (
        <div className="space-y-4 bg-white p-5 md:p-6 rounded-xl border border-amber-100 animate-fade-in text-xs sm:text-sm overflow-hidden">
          <div className="p-3 bg-rose-50 text-rose-900 rounded-lg border border-rose-100 mb-4 overflow-hidden">
            <h4 className="font-bold mb-1 flex items-center gap-1 text-rose-800 truncate">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="truncate">সতর্কতা ও ডাটাবেস ব্যবস্থাপনা</span>
            </h4>
            <p className="text-xs leading-relaxed break-words">
              আপনার আপলোড করা সকল কাজ এবং সেটিংস আপনার ব্রাউজারের <strong>localStorage</strong>-এ অত্যন্ত সুরক্ষিতভাবে সংরক্ষিত আছে। আপনি চাইলে সবকিছু ডিফল্ট ডেমো ডাটাতে ফিরিয়ে নিতে পারেন অথবা সম্পূর্ণ খালি করে নতুন করে সাজাতে পারেন।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Reset to Default */}
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col justify-between items-start gap-3 overflow-hidden">
              <div>
                <h5 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1 truncate max-w-full">
                  <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="truncate">ডিফল্ট ডেমো ডাটা রিস্টোর করুন</span>
                </h5>
                <p className="text-xs text-gray-500 mt-1 break-words">
                  আপনার বর্তমান কাজগুলো মুছে যাবে এবং শুরুতে থাকা ৬টি সুন্দর ডেমো প্রজেক্ট পুনরায় চলে আসবে। এটি টেস্ট করার জন্য দারুণ।
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('আপনি কি নিশ্চিত যে ডেমো ডাটা রিস্টোর করতে চান? আপনার বর্তমান পরিবর্তনগুলো মুছে যাবে।')) {
                    onResetData();
                    showTemporaryNotice('ডিফল্ট ডেমো ডাটা সফলভাবে রিস্টোর হয়েছে!');
                  }
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs transition cursor-pointer self-start truncate max-w-full"
              >
                🔄 ডেমো ডাটাতে ফিরে যান
              </button>
            </div>

            {/* Clear All Works */}
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/30 flex flex-col justify-between items-start gap-3 overflow-hidden">
              <div>
                <h5 className="font-bold text-rose-900 text-xs sm:text-sm flex items-center gap-1 truncate max-w-full">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="truncate">সকল প্রজেক্ট মুছে ফেলুন (Clear All)</span>
                </h5>
                <p className="text-xs text-gray-500 mt-1 break-words">
                  আপনার প্ল্যাটফর্মের সকল কাজ (Websites, Apps, Design ইত্যাদি) একসাথে ডিলিট করে দিন। প্ল্যাটফর্মটি একদম খালি হয়ে যাবে।
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm('⚠️ চরম সতর্কতা! আপনি কি নিশ্চিত যে সমস্ত প্রজেক্ট একদম মুছে ফেলতে চান?')) {
                    onClearAllWorks();
                    showTemporaryNotice('সকল কাজ মুছে ফেলা হয়েছে। প্ল্যাটফর্ম এখন সম্পূর্ণ খালি।');
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition cursor-pointer self-start truncate max-w-full"
              >
                🗑️ সমস্ত কাজ মুছে ফেলুন
              </button>
            </div>

          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 text-center overflow-hidden">
            <p className="text-xs text-gray-400 truncate max-w-full">
              💡 <strong>ব্যক্তিগত প্ল্যাটফর্ম গ্যারান্টি:</strong> এডমিন প্যানেল শুধুমাত্র আপনার কাছেই থাকবে। সাধারণ দর্শকরা এই প্যানেলে কোনো পরিবর্তন করতে পারবে না।
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
