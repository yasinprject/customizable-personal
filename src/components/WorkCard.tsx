import React, { useState } from 'react';
import { WorkItem, CATEGORY_LABELS } from '../data/initialData';
import { 
  Heart, 
  Eye, 
  ExternalLink, 
  Code, 
  MessageSquare, 
  Trash2, 
  Edit3, 
  Send,
  Calendar,
  Tag
} from 'lucide-react';

interface WorkCardProps {
  work: WorkItem;
  isAdmin: boolean;
  onLike: (id: string) => void;
  onAddComment: (id: string, name: string, text: string) => void;
  onDelete: (id: string) => void;
  onEdit: (work: WorkItem) => void;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  work,
  isAdmin,
  onLike,
  onAddComment,
  onDelete,
  onEdit,
}) => {
  const [commenterName, setCommenterName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [likedLocal, setLikedLocal] = useState(false);

  // Category specific styles
  const getCategoryBadge = (cat: string) => {
    switch(cat) {
      case 'website':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'app':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'graphics':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'video':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'audio':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    }
  };

  const handleLikeClick = () => {
    onLike(work.id);
    setLikedLocal(true);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const name = commenterName.trim() || 'শুভাকাঙ্ক্ষী (Visitor)';
    onAddComment(work.id, name, commentText.trim());
    setCommentText('');
    setCommenterName('');
  };

  // Convert embed youtube URL if necessary
  const getCleanEmbedUrl = (url: string) => {
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    return url;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-full group relative">
      
      {/* Admin Action Overlay */}
      {isAdmin && (
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-lg shadow-md border border-amber-200 animate-fade-in">
          <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded mr-1">এডমিন কন্ট্রোল</span>
          <button
            onClick={() => onEdit(work)}
            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition cursor-pointer"
            title="কাজটি এডিট করুন"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (window.confirm(`আপনি কি নিশ্চিত যে "${work.title}" প্রজেক্টটি মুছে ফেলতে চান?`)) {
                onDelete(work.id);
              }
            }}
            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
            title="কাজটি মুছে ফেলুন"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Media Rendering Section */}
      <div className="relative w-full bg-gray-50 border-b border-gray-100 overflow-hidden">
        
        {/* Category Floating Tag */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs backdrop-blur-xs ${getCategoryBadge(work.category)}`}>
            {CATEGORY_LABELS[work.category]?.split(' ')[0] || work.category}
          </span>
        </div>

        {/* Render based on mediaType */}
        {work.mediaType === 'image' && (
          <div className="h-56 sm:h-64 overflow-hidden relative">
            <img 
              src={work.mediaUrl || "https://images.unsplash.com/photo-1556742049-0a5015e181e1?auto=format&fit=crop&w=800&q=80"} 
              alt={work.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                // Fallback image if user entered invalid URL
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        )}

        {work.mediaType === 'youtube' && (
          <div className="h-56 sm:h-64 w-full relative">
            <iframe
              src={getCleanEmbedUrl(work.mediaUrl)}
              title={work.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {work.mediaType === 'video_url' && (
          <div className="h-56 sm:h-64 w-full bg-black flex items-center justify-center overflow-hidden">
            <video 
              controls 
              className="w-full h-full object-contain max-h-64"
              src={work.mediaUrl}
            >
              আপনার ব্রাউজার ভিডিও সমর্থন করে না।
            </video>
          </div>
        )}

        {work.mediaType === 'audio_url' && (
          <div className="h-56 sm:h-64 w-full bg-gradient-to-br from-purple-100 to-indigo-50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md mb-4 animate-bounce">
              🎵
            </div>
            <p className="text-xs text-purple-900 font-medium mb-3 truncate max-w-full px-4">{work.title}</p>
            <audio controls className="w-full max-w-xs" src={work.mediaUrl}>
              আপনার ব্রাউজার অডিও সমর্থন করে না।
            </audio>
          </div>
        )}

        {/* Featured corner ribbon */}
        {work.featured && (
          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
            <span>⭐ বিশেষ প্রজেক্ট</span>
          </div>
        )}

      </div>

      {/* Details Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Title & Date */}
          <div className="mb-2">
            <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1 truncate">
              <Calendar className="w-3 h-3 shrink-0" />
              <span className="truncate">প্রকাশের তারিখ: {work.createdAt || 'সম্প্রতি'}</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-snug hover:text-indigo-600 transition">
              {work.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {work.description}
          </p>

          {/* Tags */}
          {work.tags && work.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4 overflow-hidden max-h-16">
              {work.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="inline-flex items-center gap-0.5 text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded truncate max-w-full"
                >
                  <Tag className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                  <span className="truncate">{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Links & Action buttons */}
        <div>
          {/* Action links row */}
          {(work.liveLink || work.repoLink) && (
            <div className="flex flex-wrap items-center gap-2 pt-3 pb-3 border-t border-gray-50">
              {work.liveLink && (
                <a
                  href={work.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg transition truncate max-w-full"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">লাইভ দেখুন</span>
                </a>
              )}
              {work.repoLink && (
                <a
                  href={work.repoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg transition truncate max-w-full"
                >
                  <Code className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">সোর্স কোড</span>
                </a>
              )}
            </div>
          )}

          {/* Footer Metrics Row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-gray-500 text-xs">
            
            {/* Interactive Like Button */}
            <button
              onClick={handleLikeClick}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full transition cursor-pointer ${
                likedLocal 
                  ? 'bg-rose-50 text-rose-600 font-bold' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="লাইক দিন"
            >
              <Heart className={`w-4 h-4 shrink-0 ${likedLocal ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{work.likesCount}</span>
            </button>

            {/* Views static display */}
            <div className="inline-flex items-center gap-1 text-gray-500 truncate">
              <Eye className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate">{work.viewsCount} ভিউ</span>
            </div>

            {/* Comments Toggle Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full transition cursor-pointer shrink-0 ${
                showComments ? 'bg-indigo-50 text-indigo-600 font-medium' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>{work.comments ? work.comments.length : 0} মন্তব্য</span>
            </button>

          </div>

          {/* Expandable Comments & Feedback Box */}
          {showComments && (
            <div className="mt-3 pt-3 border-t border-dashed border-gray-200 bg-gray-50/50 -mx-5 -mb-5 p-5">
              <h4 className="text-xs font-bold text-gray-800 mb-2.5">প্রজেক্ট নিয়ে মন্তব্য ও মতামত</h4>

              {/* List existing comments */}
              {work.comments && work.comments.length > 0 ? (
                <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-1">
                  {work.comments.map(c => (
                    <div key={c.id} className="bg-white p-2 rounded-lg border border-gray-100 text-xs">
                      <div className="flex items-center justify-between mb-1 text-[10px] text-gray-400">
                        <span className="font-bold text-gray-700 truncate max-w-[120px]">{c.name}</span>
                        <span className="shrink-0">{c.date}</span>
                      </div>
                      <p className="text-gray-600 break-words">{c.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-gray-400 italic mb-3">এখনো কোনো মন্তব্য নেই। আপনিই প্রথম মতামত জানান!</p>
              )}

              {/* Add comment form */}
              <form onSubmit={handleCommentSubmit} className="space-y-2 pt-1">
                <input
                  type="text"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  placeholder="আপনার নাম (ঐচ্ছিক)"
                  className="w-full px-2.5 py-1 text-xs bg-white border border-gray-200 rounded focus:outline-none focus:border-indigo-400"
                />
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="চমৎকার কাজ! মতামত লিখুন..."
                    required
                    className="flex-1 px-2.5 py-1 text-xs bg-white border border-gray-200 rounded focus:outline-none focus:border-indigo-400"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-medium flex items-center justify-center transition cursor-pointer shrink-0"
                    title="প্রেরণ করুন"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
