import React, { useEffect } from 'react';
import { Icons } from './Icon';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2 z-50 animate-fade-in border border-slate-700 dark:border-indigo-500">
      <Icons.Like className="w-4 h-4" />
      <span className="font-medium text-sm">{message}</span>
    </div>
  );
};

export default Toast;