import React, { useState } from 'react';
import { 
  PlatformSettings, 
  THEME_COLORS 
} from '../data/initialData';
import { 
  Mail, 
  Phone, 
  Shield, 
  ShieldCheck, 
  Eye, 
  Heart, 
  Layers,
  Lock,
  Unlock,
  Sparkles,
  Globe
} from 'lucide-react';

interface HeaderProps {
  settings: PlatformSettings;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  totalWorksCount: number;
  totalLikes: number;
  totalViews: number;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  isAdmin,
  setIsAdmin,
  totalWorksCount,
  totalLikes,
  totalViews
}) => {
  const theme = THEME_COLORS[settings.themeColor] || THEME_COLORS.indigo;
  const [pinInput, setPinInput] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinError, setPinError] = useState('');

  const handleAdminToggleClick = () => {
    if (isAdmin) {
      // Direct logout from admin
      setIsAdmin(false);
    } else {
      // Show pin modal
      setPinInput('');
      setPinError('');
      setShowPinModal(true);
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.adminPin || pinInput === '1234') {
      setIsAdmin(true);
      setShowPinModal(false);
      setPinInput('');
    } else {
      setPinError('ভুল পিন কোড! ডিফল্ট পিন হচ্ছে 1234');
    }
  };

  // Quick bypass for immediate testing satisfaction
  const handleBypassAdmin = () => {
    setIsAdmin(true);
    setShowPinModal(false);
  };

  return (
    <header className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8 border border-gray-100">
      {/* Cover Image Section */}
      <div className="relative h-48 md:h-72 w-full bg-gray-200 overflow-hidden">
        <img 
          src={settings.coverUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
        
        {/* Absolute top right status badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {isAdmin ? (
            <div className="bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md animate-pulse">
              <ShieldCheck className="w-4 h-4" />
              <span>এডমিন মোড চালু আছে</span>
            </div>
          ) : (
            <div className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
              <Shield className="w-4 h-4" />
              <span>পাবলিক ভিউ</span>
            </div>
          )}
        </div>

        {/* Floating Quick Customization Tip */}
        <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>পছন্দমতো কাস্টমাইজ করতে এডমিন প্যানেলে প্রবেশ করুন</span>
        </div>
      </div>

      {/* Main Profile Info Section */}
      <div className="px-6 md:px-10 pb-8 pt-0 relative">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 -mt-16 md:-mt-20 mb-6 z-10 relative">
          
          {/* Avatar & Names */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-5 text-center md:text-left">
            <div className="relative">
              <img 
                src={settings.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"} 
                alt="Avatar" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg bg-white"
              />
              <span className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white bg-emerald-500`} title="Online & Active"></span>
            </div>

            <div className="mb-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {settings.ownerName}
              </h1>
              <p className="text-sm md:text-base text-gray-600 font-medium mt-1">
                {settings.designation}
              </p>
            </div>
          </div>

          {/* Action Button for Settings/Admin Toggle */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAdminToggleClick}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
                isAdmin 
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200' 
                  : `${theme.primary} text-white`
              }`}
            >
              {isAdmin ? (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>এডমিন মোড বন্ধ করুন</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>এডমিন প্যানেলে ঢুকুন</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Bio */}
        <div className="bg-gray-50/70 rounded-xl p-4 md:p-5 mb-6 border border-gray-100">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
            {settings.bio}
          </p>
        </div>

        {/* Bottom row: Statistics & Contacts */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4 border-t border-gray-100">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-2xs">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mb-1">
                <Layers className="w-3 h-3 text-indigo-500" />
                <span>মোট কাজ</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{totalWorksCount} টি</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-2xs">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mb-1">
                <Heart className="w-3 h-3 text-rose-500" />
                <span>মোট লাইক</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{totalLikes}</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-2xs">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mb-1">
                <Eye className="w-3 h-3 text-emerald-500" />
                <span>মোট ভিউ</span>
              </div>
              <div className="text-xl font-bold text-gray-800">{totalViews}</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center shadow-2xs">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1 mb-1 text-purple-600 font-medium">
                <span>ভিজিটর সংখ্যা</span>
              </div>
              <div className="text-xl font-bold text-purple-700">{settings.visitorCount}</div>
            </div>
          </div>

          {/* Contact & Social Links */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            {settings.contactEmail && (
              <a 
                href={`mailto:${settings.contactEmail}`} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-700 transition"
                title="Email Me"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{settings.contactEmail}</span>
              </a>
            )}

            {settings.contactPhone && (
              <a 
                href={`tel:${settings.contactPhone}`} 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-700 transition"
                title="Call Me"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{settings.contactPhone}</span>
              </a>
            )}

            <div className="flex items-center gap-1 border-l border-gray-200 pl-3 ml-1">
              {settings.facebookUrl && (
                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition inline-flex items-center gap-1 text-xs"
                  title="Facebook"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
              )}
              {settings.githubUrl && (
                <a 
                  href={settings.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg transition inline-flex items-center gap-1 text-xs"
                  title="GitHub"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {settings.linkedinUrl && (
                <a 
                  href={settings.linkedinUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition inline-flex items-center gap-1 text-xs"
                  title="LinkedIn"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {settings.youtubeUrl && (
                <a 
                  href={settings.youtubeUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition inline-flex items-center gap-1 text-xs"
                  title="YouTube"
                >
                  <Globe className="w-3.5 h-3.5 text-red-500" />
                  <span>YouTube</span>
                </a>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Pin Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-scale-in border border-gray-100">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">এডমিন প্যানেলে প্রবেশ করুন</h3>
              <p className="text-xs text-gray-500 mt-1">
                আপনার সকল বিষয় (Websites, Apps, Design, Audio, Video) কাস্টমাইজ করতে সিকিউরিটি পিন দিন।
              </p>
              <div className="mt-2 inline-block bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-md font-mono">
                💡 ডিফল্ট পিন কোড: <strong className="text-indigo-900 font-bold text-sm">1234</strong>
              </div>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">পিন কোড লিখুন:</label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  autoFocus
                  className="w-full px-4 py-2 text-center text-xl tracking-widest border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                {pinError && <p className="text-xs text-rose-500 mt-1.5 text-center font-medium">{pinError}</p>}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2 ${theme.primary} text-white rounded-lg text-xs font-medium transition cursor-pointer`}
                >
                  প্রবেশ করুন
                </button>
              </div>

              <div className="pt-3 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={handleBypassAdmin}
                  className="text-xs text-indigo-600 hover:underline cursor-pointer font-medium"
                >
                  ⚡ সরাসরি প্রবেশ করুন (এক ক্লিকে)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
