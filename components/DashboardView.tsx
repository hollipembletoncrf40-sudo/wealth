import React from 'react';
import { Icons } from './Icon';
import { Course, Idea, Language, User } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  user: User;
  courses: Course[];
  topIdea: Idea;
  lang: Language;
  onReadIdea: (idea: Idea) => void;
}

const data = [
  { name: 'Mon', sales: 400 },
  { name: 'Tue', sales: 300 },
  { name: 'Wed', sales: 600 },
  { name: 'Thu', sales: 800 },
  { name: 'Fri', sales: 500 },
  { name: 'Sat', sales: 900 },
  { name: 'Sun', sales: 750 },
];

const DashboardView: React.FC<DashboardProps> = ({ user, courses, topIdea, lang, onReadIdea }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-indigo-100" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.welcome} {user.name}</h1>
            <p className="text-slate-500 dark:text-slate-400">{user.role}</p>
          </div>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center shadow-lg transition-all w-full md:w-auto justify-center">
          <Icons.Plus className="w-4 h-4 mr-2" />
          {t.quickPost}
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.earnings}</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">${user.stats.totalEarnings.toLocaleString()}</h3>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full mt-2 inline-block">+12.5%</span>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-full">
            <Icons.Money className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.sold}</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{user.stats.coursesSold}</h3>
            <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded-full mt-2 inline-block">Active</span>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
            <Icons.Market className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between transition-colors">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.rank}</p>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{user.stats.communityRank}</h3>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full mt-2 inline-block">Top 5%</span>
          </div>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-full">
            <Icons.Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t.earnings}</h3>
          <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dx={-10} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    color: '#1e293b'
                  }} 
                />
                <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Recommendation */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
              <Icons.Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold uppercase tracking-wider text-xs">{t.trending}</span>
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{topIdea.title}</h3>
            <p className="text-indigo-200 text-sm mb-6 line-clamp-4">{topIdea.content}</p>
          </div>
          <button 
            onClick={() => onReadIdea(topIdea)}
            className="w-full bg-white text-indigo-900 py-2.5 rounded-lg font-bold hover:bg-indigo-50 transition-colors z-10"
          >
            {t.readMore}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;