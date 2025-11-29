import React, { useState } from 'react';
import { Idea, Language } from '../types';
import { Icons } from './Icon';
import { generateBusinessIdea } from '../services/geminiService';
import { TRANSLATIONS } from '../constants';

interface IdeasProps {
  ideas: Idea[];
  lang: Language;
  onIdeaClick: (idea: Idea) => void;
}

const IdeasView: React.FC<IdeasProps> = ({ ideas, lang, onIdeaClick }) => {
  const t = TRANSLATIONS[lang];
  const [localIdeas, setLocalIdeas] = useState<Idea[]>(ideas);
  const [nicheInput, setNicheInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<{title: string, description: string, difficulty: string, firstStep: string} | null>(null);

  const handleGenerate = async () => {
    if (!nicheInput) return;
    setIsGenerating(true);
    setGeneratedResult(null);
    try {
      const jsonStr = await generateBusinessIdea(nicheInput, lang);
      const parsed = JSON.parse(jsonStr);
      setGeneratedResult(parsed);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Generator Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/20">
            <Icons.Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">{t.genIdea}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">Find Your Next Goldmine</h2>
          <p className="text-indigo-100 text-lg">输入任何利基市场或兴趣，AI 为您生成变现策略。</p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="text" 
              value={nicheInput}
              onChange={(e) => setNicheInput(e.target.value)}
              placeholder="e.g. 机械键盘, 宠物心理学, 露营..." 
              className="flex-1 px-5 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors disabled:opacity-70 flex items-center justify-center whitespace-nowrap shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Icons.Trend className="w-4 h-4 mr-2 animate-spin" />
                  {t.analyzing}
                </>
              ) : t.genIdea}
            </button>
          </div>

          {generatedResult && (
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-left border border-white/20 mt-6 animate-fade-in shadow-lg">
              <div className="flex justify-between items-start">
                 <h3 className="text-xl font-bold mb-2">{generatedResult.title}</h3>
                 <span className="bg-white/20 px-2 py-1 rounded text-xs uppercase tracking-wide border border-white/10">{generatedResult.difficulty}</span>
              </div>
              <p className="text-indigo-50 mb-4">{generatedResult.description}</p>
              <div className="bg-indigo-900/50 p-4 rounded-lg border border-indigo-500/30">
                <span className="text-indigo-300 text-xs uppercase font-bold tracking-wider">{t.firstStep}</span>
                <p className="text-white mt-1">{generatedResult.firstStep}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ideas Feed */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <Icons.Trend className="w-5 h-5 mr-2 text-indigo-600" />
          {t.ideas} <span className="text-slate-400 text-sm font-normal ml-2">(SOP & Cases)</span>
        </h3>
        
        <div className="grid gap-4">
          {localIdeas.map((idea) => (
            <div 
              key={idea.id} 
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-indigo-100 dark:hover:border-indigo-900 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => onIdeaClick(idea)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 font-bold group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 transition-colors">
                     {idea.author.substring(0,2)}
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{idea.title}</h4>
                     <p className="text-xs text-slate-400">by {idea.author} • {idea.timestamp}</p>
                   </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium
                    ${idea.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                      idea.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
                  `}>
                    {idea.difficulty}
                  </span>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{idea.content}</p>
              
              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-4">
                <div className="flex space-x-2">
                   {idea.tags.map(tag => (
                     <span key={tag} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer transition-colors">#{tag}</span>
                   ))}
                </div>
                <div className="flex items-center space-x-4">
                   <button className="flex items-center space-x-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                     <Icons.Like className="w-4 h-4" />
                     <span className="text-sm font-medium">{idea.likes}</span>
                   </button>
                   <button className="text-indigo-600 dark:text-indigo-400 text-sm font-bold flex items-center hover:underline">
                     {t.readMore} <Icons.ArrowRight className="w-3 h-3 ml-1" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeasView;