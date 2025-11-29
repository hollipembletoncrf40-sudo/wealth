import React from 'react';
import { Idea, Language } from '../types';
import { Icons } from './Icon';
import { TRANSLATIONS } from '../constants';

interface IdeaDetailProps {
  idea: Idea;
  lang: Language;
  onBack: () => void;
  onShare: () => void;
}

const IdeaDetailView: React.FC<IdeaDetailProps> = ({ idea, lang, onBack, onShare }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="animate-fade-in pb-10">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <Icons.ArrowRight className="w-4 h-4 mr-1 rotate-180" />
        {t.back}
      </button>

      {/* Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
             <div className="flex items-center space-x-2 mb-3">
               <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                  ${idea.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                    idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
               `}>
                 {idea.difficulty}
               </span>
               <span className="text-slate-400 text-sm">• {idea.timestamp}</span>
             </div>
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{idea.title}</h1>
             <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{idea.content}</p>
             
             <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center space-x-2">
                   <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
                     {idea.author.substring(0,2)}
                   </div>
                   <span className="text-sm font-medium text-slate-900 dark:text-white">{idea.author}</span>
                </div>
             </div>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
             <button 
                onClick={onShare}
                className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none"
             >
               <Icons.Share className="w-4 h-4 mr-2" />
               {t.share}
             </button>
             <button className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center">
               <Icons.Like className="w-4 h-4 mr-2" />
               {idea.likes} Likes
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main SOP Content */}
        <div className="lg:col-span-2 space-y-8">
          {idea.sop ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Icons.Dashboard className="w-6 h-6 mr-2 text-indigo-500" />
                {t.sopTitle}
              </h2>
              <div className="space-y-8">
                {idea.sop.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold border border-indigo-200 dark:border-indigo-700">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm text-center py-20">
               <p className="text-slate-500">该思路暂无详细 SOP，请咨询 AI 教练获取更多建议。</p>
             </div>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
           {/* Revenue & Stats */}
           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12"></div>
             <h3 className="font-bold text-lg mb-4 relative z-10">{t.revenue}</h3>
             <div className="text-3xl font-bold text-green-400 mb-1 relative z-10">{idea.monthlyRevenue || 'TBD'}</div>
             <p className="text-indigo-200 text-sm mb-6 relative z-10">Estimated Monthly</p>
             
             <div className="h-px bg-white/10 w-full mb-4"></div>
             
             <h3 className="font-bold text-sm text-indigo-200 mb-2 relative z-10">{t.timeToValidate}</h3>
             <p className="font-medium relative z-10">{idea.validationTime || 'Unknown'}</p>
           </div>

           {/* Tools */}
           {idea.tools && (
             <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
               <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                 <Icons.Trend className="w-5 h-5 mr-2 text-indigo-500" />
                 {t.toolsUsed}
               </h3>
               <div className="flex flex-wrap gap-2">
                 {idea.tools.map((tool, i) => (
                   <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-600">
                     {tool}
                   </span>
                 ))}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailView;