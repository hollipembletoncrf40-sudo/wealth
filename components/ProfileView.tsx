import React, { useRef, useState } from 'react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Icons } from './Icon';

interface ProfileProps {
  user: User;
  onUpdateUser: (updatedUser: Partial<User>) => void;
  lang: Language;
}

const ProfileView: React.FC<ProfileProps> = ({ user, onUpdateUser, lang }) => {
  const t = TRANSLATIONS[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // In a real app, this would make an API call.
    // Here we just simulate a success state.
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in relative">
      
      {/* Toast Notification */}
      {isSaved && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-16 bg-green-500 text-white px-6 py-2 rounded-full shadow-lg flex items-center animate-fade-in z-50">
           <Icons.Like className="w-4 h-4 mr-2" />
           {t.savedSuccess}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 transition-colors">
        <div className="flex flex-col items-center mb-8">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50 dark:border-indigo-900 shadow-lg group-hover:opacity-90 transition-opacity" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
               <Icons.Search className="w-8 h-8 text-white" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            {t.uploadAvatar}
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Display Name</label>
              <input 
                type="text" 
                value={user.name}
                onChange={(e) => onUpdateUser({ name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Role/Title</label>
              <input 
                type="text" 
                value={user.role}
                onChange={(e) => onUpdateUser({ role: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.bio}</label>
            <textarea 
              rows={4}
              value={user.bio}
              onChange={(e) => onUpdateUser({ bio: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end">
             <button 
               onClick={handleSave}
               className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 dark:hover:bg-indigo-700 transition-all shadow-lg"
             >
               {t.saveProfile}
             </button>
          </div>
        </div>
      </div>

      <div className="bg-indigo-900 dark:bg-slate-800 text-white rounded-2xl p-6 shadow-lg border dark:border-slate-700">
        <h3 className="text-lg font-bold mb-4">Account Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
           <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">{user.stats.coursesSold}</div>
              <div className="text-xs text-indigo-200">Sales</div>
           </div>
           <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">${user.stats.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-indigo-200">Revenue</div>
           </div>
           <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">Top 5%</div>
              <div className="text-xs text-indigo-200">Rank</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;