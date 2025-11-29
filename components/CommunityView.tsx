import React, { useState } from 'react';
import { Post, Language, User } from '../types';
import { Icons } from './Icon';
import { TRANSLATIONS } from '../constants';

interface CommunityProps {
  posts: Post[];
  lang: Language;
  onAddPost: (content: string, tags: string[]) => void;
  onLikePost: (id: string) => void;
  user: User;
}

const CommunityView: React.FC<CommunityProps> = ({ posts, lang, onAddPost, onLikePost, user }) => {
  const t = TRANSLATIONS[lang];
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState('');
  
  const handlePublish = () => {
    if (!newContent.trim()) return;
    onAddPost(newContent, ['#General']); // Default tag for now
    setNewContent('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.community}</h2>
           <p className="text-slate-500 dark:text-slate-400">与志同道合的构建者连接、协作、成长。</p>
        </div>
        <button 
          onClick={() => setIsCreating(!isCreating)}
          className="bg-slate-900 dark:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors shadow-md"
        >
          {isCreating ? <Icons.Close className="w-4 h-4 mr-2" /> : <Icons.Plus className="w-4 h-4 mr-2" />}
          {isCreating ? t.cancel : t.quickPost}
        </button>
      </div>

      {/* Create Post Area */}
      {isCreating && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 animate-fade-in">
          <div className="flex space-x-4">
             <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
             <div className="flex-1">
                <textarea 
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none min-h-[100px] text-slate-900 dark:text-white"
                  placeholder={t.postPlaceholder}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-3">
                  <button 
                    onClick={handlePublish}
                    disabled={!newContent.trim()}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t.publishPost}
                  </button>
                </div>
             </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
             <div className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                  {post.authorAvatar ? (
                    <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {post.author[0]}
                    </div>
                  )}
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white mr-2">{post.author}</span>
                      <span className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">{post.authorRole}</span>
                    </div>
                    <span className="text-xs text-slate-400">{post.timestamp}</span>
                 </div>
                 <p className="text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">{post.content}</p>
                 <div className="flex items-center space-x-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">{tag}</span>
                    ))}
                 </div>
                 
                 <div className="flex items-center space-x-6 text-slate-500 dark:text-slate-400">
                   <button 
                     onClick={() => onLikePost(post.id)}
                     className={`flex items-center space-x-1.5 transition-colors group ${post.isLiked ? 'text-pink-500' : 'hover:text-pink-500'}`}
                   >
                     <Icons.Like className={`w-4 h-4 group-hover:scale-110 transition-transform ${post.isLiked ? 'fill-current' : ''}`} />
                     <span className="text-sm">{post.likes}</span>
                   </button>
                   <button className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
                     <Icons.Comment className="w-4 h-4 group-hover:scale-110 transition-transform" />
                     <span className="text-sm">{post.comments}</span>
                   </button>
                   <button className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-auto">
                     <Icons.Share className="w-4 h-4" />
                   </button>
                 </div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityView;