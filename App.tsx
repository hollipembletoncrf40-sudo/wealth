import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import MarketplaceView from './components/MarketplaceView';
import IdeasView from './components/IdeasView';
import CommunityView from './components/CommunityView';
import AICoachView from './components/AICoachView';
import ProfileView from './components/ProfileView';
import CourseDetailView from './components/CourseDetailView';
import IdeaDetailView from './components/IdeaDetailView';
import Toast from './components/Toast';
import { View, Language, User, Course, Theme, Post, Idea } from './types';
import { MOCK_USER, COURSES, IDEAS, POSTS, TRANSLATIONS } from './constants';
import { Icons } from './components/Icon';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<Language>('zh');
  const [theme, setTheme] = useState<Theme>('light');
  
  // App State
  const [user, setUser] = useState<User>(MOCK_USER);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [posts, setPosts] = useState<Post[]>(POSTS);
  
  // Navigation State
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleUpdateUser = (updatedUser: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    showToast(TRANSLATIONS[lang].savedSuccess);
  };

  const handleAddCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
    setCurrentView(View.MARKETPLACE);
    showToast(TRANSLATIONS[lang].submit + " Success");
  };

  const handleAddPost = (content: string, tags: string[]) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      content: content,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      tags: tags
    };
    setPosts(prev => [newPost, ...prev]);
    showToast(TRANSLATIONS[lang].publishPost + " Success");
  };

  const handleLikePost = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView(View.COURSE_DETAIL);
  };

  const handleIdeaClick = (idea: Idea) => {
    setSelectedIdea(idea);
    setCurrentView(View.IDEA_DETAIL);
  };

  const handleGetLink = (courseTitle: string) => {
     showToast(TRANSLATIONS[lang].copySuccess);
     // Logic to actually copy to clipboard could go here
     navigator.clipboard.writeText(`https://wealthflow.com/affiliate/${courseTitle.replace(/\s+/g, '-').toLowerCase()}?ref=${user.name}`);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return (
          <DashboardView 
            user={user} 
            courses={courses} 
            topIdea={IDEAS[0]} 
            lang={lang} 
            onReadIdea={handleIdeaClick}
          />
        );
      case View.MARKETPLACE:
        return (
          <MarketplaceView 
            courses={courses} 
            lang={lang} 
            onAddCourse={handleAddCourse} 
            userParams={{name: user.name}} 
            onCourseClick={handleCourseClick}
            onGetLink={handleGetLink}
          />
        );
      case View.COURSE_DETAIL:
        return selectedCourse ? (
          <CourseDetailView 
            course={selectedCourse} 
            lang={lang} 
            onBack={() => setCurrentView(View.MARKETPLACE)} 
            onGetLink={handleGetLink}
          />
        ) : <MarketplaceView courses={courses} lang={lang} onAddCourse={handleAddCourse} userParams={{name: user.name}} onCourseClick={handleCourseClick} onGetLink={handleGetLink} />;
      case View.IDEAS:
        return (
          <IdeasView 
            ideas={IDEAS} 
            lang={lang} 
            onIdeaClick={handleIdeaClick}
          />
        );
      case View.IDEA_DETAIL:
        return selectedIdea ? (
          <IdeaDetailView 
            idea={selectedIdea} 
            lang={lang} 
            onBack={() => setCurrentView(View.IDEAS)} 
            onShare={() => showToast(TRANSLATIONS[lang].copySuccess)}
          />
        ) : <IdeasView ideas={IDEAS} lang={lang} onIdeaClick={handleIdeaClick} />;
      case View.COMMUNITY:
        return <CommunityView posts={posts} lang={lang} onAddPost={handleAddPost} onLikePost={handleLikePost} user={user} />;
      case View.AI_COACH:
        return <AICoachView lang={lang} />;
      case View.PROFILE:
        return <ProfileView user={user} onUpdateUser={handleUpdateUser} lang={lang} />;
      default:
        return <DashboardView user={user} courses={courses} topIdea={IDEAS[0]} lang={lang} onReadIdea={handleIdeaClick} />;
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="flex h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 overflow-hidden transition-colors duration-300">
        <Sidebar 
          currentView={currentView} 
          setView={(view) => {
            setCurrentView(view);
            // Reset selection when changing main tabs
            if (view !== View.COURSE_DETAIL && view !== View.IDEA_DETAIL) {
              setSelectedCourse(null);
              setSelectedIdea(null);
            }
          }} 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          lang={lang}
          setLang={setLang}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Toast Container */}
          {toastMessage && (
            <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
          )}

          {/* Mobile Header Trigger */}
          <div className="lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="font-bold text-lg text-slate-900 dark:text-white">WealthFlow</span>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
              <Icons.Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            <div className="max-w-7xl mx-auto h-full pb-20">
              {renderView()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;