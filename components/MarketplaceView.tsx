import React, { useState } from 'react';
import { Course, Language } from '../types';
import { Icons } from './Icon';
import { TRANSLATIONS } from '../constants';

interface MarketplaceProps {
  courses: Course[];
  lang: Language;
  onAddCourse: (course: Course) => void;
  userParams: { name: string };
  onCourseClick: (course: Course) => void;
  onGetLink: (courseTitle: string) => void;
}

const MarketplaceView: React.FC<MarketplaceProps> = ({ courses, lang, onAddCourse, userParams, onCourseClick, onGetLink }) => {
  const t = TRANSLATIONS[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    commissionRate: '20',
    category: 'Newsletter',
  });

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      author: userParams.name,
      price: Number(newCourse.price),
      commissionRate: Number(newCourse.commissionRate),
      sales: 0,
      category: newCourse.category,
      rating: 5.0,
      imageUrl: `https://picsum.photos/400/250?random=${Date.now()}`,
      description: newCourse.description,
      fullDescription: newCourse.description, // Default full desc
      isUserCreated: true
    };
    onAddCourse(course);
    setShowCreateForm(false);
    setNewCourse({ title: '', description: '', price: '', commissionRate: '20', category: 'Newsletter' });
  };

  if (showCreateForm) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-8 transition-colors">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.createResource}</h2>
          <button onClick={() => setShowCreateForm(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <Icons.Close className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.resourceTitle}</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={newCourse.title}
              onChange={e => setNewCourse({...newCourse, title: e.target.value})}
              placeholder="e.g. 独立开发者周刊"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.category}</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={newCourse.category}
              onChange={e => setNewCourse({...newCourse, category: e.target.value})}
            >
              <option value="Newsletter">专栏 (Newsletter)</option>
              <option value="Course">课程 (Course)</option>
              <option value="E-Book">电子书 (E-Book)</option>
              <option value="Community">社群 (Community)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.price} ($)</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newCourse.price}
                onChange={e => setNewCourse({...newCourse, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.commission} (%)</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={newCourse.commissionRate}
                onChange={e => setNewCourse({...newCourse, commissionRate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.resourceDesc}</label>
            <textarea 
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={newCourse.description}
              onChange={e => setNewCourse({...newCourse, description: e.target.value})}
            ></textarea>
          </div>

          <div className="flex space-x-4 pt-4">
            <button 
              type="button" 
              onClick={() => setShowCreateForm(false)}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              {t.cancel}
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t.marketplace}</h2>
          <p className="text-slate-500 dark:text-slate-400">发现优质内容，分销赚取佣金。</p>
        </div>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder={t.search} 
              className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowCreateForm(true)}
            className="bg-slate-900 dark:bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium flex items-center hover:bg-slate-800 dark:hover:bg-indigo-700 transition-colors whitespace-nowrap shadow-lg"
          >
            <Icons.Plus className="w-4 h-4 mr-2" />
            {t.publish}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group flex flex-col cursor-pointer"
            onClick={() => onCourseClick(course)}
          >
            <div className="relative h-48 bg-slate-200 dark:bg-slate-700 overflow-hidden">
               <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur text-indigo-900 dark:text-indigo-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                 {course.category}
               </div>
               {course.isUserCreated && (
                 <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                   My Creation
                 </div>
               )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h3>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                 <span className="text-xs text-slate-500 dark:text-slate-400">By {course.author}</span>
                 {course.rating > 0 && (
                   <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-1.5 py-0.5 rounded text-xs font-semibold">
                     <span>★</span>
                     <span>{course.rating}</span>
                   </div>
                 )}
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{course.description}</p>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl mb-4 border border-slate-100 dark:border-slate-700">
                <div className="text-center">
                   <p className="text-xs text-slate-400">{t.price}</p>
                   <p className="font-bold text-slate-900 dark:text-white">${course.price}</p>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-600"></div>
                <div className="text-center">
                   <p className="text-xs text-slate-400">{t.commission}</p>
                   <p className="font-bold text-green-600 dark:text-green-400">{course.commissionRate}%</p>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-600"></div>
                <div className="text-center">
                   <p className="text-xs text-slate-400">{t.earn}</p>
                   <p className="font-bold text-indigo-600 dark:text-indigo-400">${(course.price * (course.commissionRate/100)).toFixed(0)}</p>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onGetLink(course.title);
                }}
                className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white py-2.5 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center justify-center hover:shadow-sm"
              >
                {t.getLink}
                <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceView;