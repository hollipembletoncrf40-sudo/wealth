import React from 'react';
import { Course, Language } from '../types';
import { Icons } from './Icon';
import { TRANSLATIONS } from '../constants';

interface CourseDetailProps {
  course: Course;
  lang: Language;
  onBack: () => void;
  onGetLink: (courseTitle: string) => void;
}

const CourseDetailView: React.FC<CourseDetailProps> = ({ course, lang, onBack, onGetLink }) => {
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

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Hero Section */}
        <div className="h-64 relative bg-slate-200 dark:bg-slate-700">
          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-8">
              <span className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-lg">
                {course.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 shadow-sm">{course.title}</h1>
              <div className="flex items-center text-slate-200 space-x-4">
                <span>By {course.author}</span>
                <span className="flex items-center"><span className="text-yellow-400 mr-1">★</span> {course.rating}</span>
                <span>{course.sales} Students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 p-8 border-r border-slate-100 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t.courseDetails}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 whitespace-pre-wrap">
              {course.fullDescription || course.description}
            </p>

            {course.features && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Icons.Sparkles className="w-5 h-5 mr-2 text-indigo-500" />
                  {t.features}
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.targetAudience && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                  <Icons.Users className="w-5 h-5 mr-2 text-indigo-500" />
                  {t.targetAudience}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {course.targetAudience.map((audience, index) => (
                    <span key={index} className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-sm">
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="p-8 bg-slate-50 dark:bg-slate-800/50">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">{t.price}</span>
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">${course.price}</span>
                </div>
                <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">{t.commission}</span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">{course.commissionRate}%</span>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-slate-900 dark:text-white">{t.earn} / Sale</span>
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${(course.price * (course.commissionRate/100)).toFixed(0)}</span>
                </div>

                <button 
                  onClick={() => onGetLink(course.title)}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center group"
                >
                  <Icons.Share className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  {t.getLink}
                </button>
                <p className="text-xs text-center text-slate-400 mt-3">Promote and earn immediately</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;