import React from 'react';
import { WorkItem, CATEGORY_LABELS } from '../data/initialData';
import { PieChart, Sparkles, Trophy } from 'lucide-react';

interface StatsDashboardProps {
  works: WorkItem[];
  themeColor: string;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ works }) => {
  const totalWorks = works.length;

  // Group counts by category
  const counts: Record<string, number> = {
    website: 0,
    app: 0,
    graphics: 0,
    video: 0,
    audio: 0,
    other: 0,
  };

  works.forEach(w => {
    if (counts[w.category] !== undefined) {
      counts[w.category]++;
    } else {
      counts.other = (counts.other || 0) + 1;
    }
  });

  const categories = ['website', 'app', 'graphics', 'video', 'audio', 'other'];
  
  // Find highest category for highlight
  let topCat = 'website';
  let maxCount = -1;
  categories.forEach(c => {
    if (counts[c] > maxCount) {
      maxCount = counts[c];
      topCat = c;
    }
  });

  const categoryColors: Record<string, string> = {
    website: 'bg-indigo-500 text-indigo-700',
    app: 'bg-emerald-500 text-emerald-700',
    graphics: 'bg-amber-500 text-amber-700',
    video: 'bg-rose-500 text-rose-700',
    audio: 'bg-purple-500 text-purple-700',
    other: 'bg-cyan-500 text-cyan-700',
  };

  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base md:text-lg">বিষয়ভিত্তিক কাজের পরিসংখ্যান</h3>
            <p className="text-xs text-gray-500">আপনার তৈরি সকল বিষয়ের আনুপাতিক বিশ্লেষণ</p>
          </div>
        </div>

        {totalWorks > 0 && maxCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>শীর্ষ বিষয়: {CATEGORY_LABELS[topCat]?.split(' ')[0]} ({maxCount}টি)</span>
          </div>
        )}
      </div>

      {totalWorks === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">
          কোনো কাজ এখনো যুক্ত করা হয়নি। এডমিন প্যানেল থেকে নতুন কাজ যোগ করুন।
        </div>
      ) : (
        <div className="space-y-4">
          {/* Visual multi-color bar */}
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex gap-0.5">
            {categories.map(cat => {
              const count = counts[cat] || 0;
              if (count === 0) return null;
              const percentage = (count / totalWorks) * 100;
              const colorBg = categoryColors[cat]?.split(' ')[0] || 'bg-gray-500';
              return (
                <div 
                  key={cat} 
                  style={{ width: `${percentage}%` }} 
                  className={`${colorBg} h-full transition-all duration-500`} 
                  title={`${CATEGORY_LABELS[cat]}: ${count}টি (${percentage.toFixed(0)}%)`}
                />
              );
            })}
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
            {categories.map(cat => {
              const count = counts[cat] || 0;
              const percentage = totalWorks > 0 ? ((count / totalWorks) * 100).toFixed(0) : 0;
              const badgeTextColor = categoryColors[cat]?.split(' ')[1] || 'text-gray-700';
              const dotColorBg = categoryColors[cat]?.split(' ')[0] || 'bg-gray-500';

              return (
                <div 
                  key={cat} 
                  className={`p-3 rounded-xl border transition-all ${
                    count > 0 ? 'bg-gray-50/50 border-gray-200 hover:border-gray-300' : 'bg-white border-gray-100 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 text-xs text-gray-600 font-medium truncate">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColorBg} shrink-0`}></span>
                    <span className="truncate">{CATEGORY_LABELS[cat]?.split(' ')[0]}</span>
                  </div>
                  
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-lg font-bold text-gray-900">{count}</span>
                    <span className={`text-xs font-semibold ${badgeTextColor}`}>{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-3 rounded-xl flex items-center justify-between text-xs text-indigo-900 mt-2">
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>আপনার প্ল্যাটফর্মে আপনি যেকোনো ক্যাটাগরিতে আনলিমিটেড কাজ আপলোড করতে পারবেন।</span>
            </div>
            <span className="font-bold bg-white/80 px-2 py-0.5 rounded text-[10px]">সবকিছু এক ঠিকানায়</span>
          </div>

        </div>
      )}
    </div>
  );
};
