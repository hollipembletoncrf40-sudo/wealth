import React from 'react';
import { View, Language, Theme } from '../types';
import { Icons } from './Icon';
import { TRANSLATIONS } from '../constants';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen, lang, setLang, theme, toggleTheme }) => {
  const t = TRANSLATIONS[lang];
  
  const menuItems = [
    { id: View.DASHBOARD, label: t.dashboard, icon: Icons.Dashboard },
    { id: View.MARKETPLACE, label: t.marketplace, icon: Icons.Market },
    { id: View.IDEAS, label: t.ideas, icon: Icons.Idea },
    { id: View.COMMUNITY, label: t.community, icon: Icons.Community },
    { id: View.AI_COACH, label: t.aiCoach, icon: Icons.AI },
    { id: View.PROFILE, label: t.profile, icon: Icons.Profile },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 dark:bg-black text-white z-30 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static flex flex-col border-r border-slate-800 dark:border-slate-800
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Icons.Trend className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">WealthFlow</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400">
            <Icons.Close className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setView(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${currentView === item.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className={`w-5 h-5 ${currentView === item.id ? 'animate-pulse' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="p-4 m-4 bg-slate-800 dark:bg-slate-900 rounded-xl border border-slate-700">
           {/* Language Switch */}
           <div className="flex bg-slate-900 dark:bg-black rounded-lg p-1 mb-4">
             <button 
               onClick={() => setLang('zh')}
               className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${lang === 'zh' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
             >
               中文
             </button>
             <button 
               onClick={() => setLang('en')}
               className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-colors ${lang === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
             >
               EN
             </button>
           </div>

           {/* Theme Toggle */}
           <button 
             onClick={toggleTheme}
             className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-slate-900 dark:bg-black text-slate-400 hover:text-white text-xs font-medium transition-colors mb-4"
           >
              {theme === 'dark' ? (
                <>
                  <Icons.Idea className="w-4 h-4" />
                  <span>{t.lightMode}</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                  <span>{t.darkMode}</span>
                </>
              )}
           </button>

          <p className="text-xs text-slate-400 mb-1">{t.earnings}</p>
          <p className="text-xl font-bold text-green-400">$12,450.00</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;