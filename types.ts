export enum View {
  DASHBOARD = 'DASHBOARD',
  MARKETPLACE = 'MARKETPLACE',
  IDEAS = 'IDEAS',
  COMMUNITY = 'COMMUNITY',
  PROFILE = 'PROFILE',
  AI_COACH = 'AI_COACH',
  COURSE_DETAIL = 'COURSE_DETAIL',
  IDEA_DETAIL = 'IDEA_DETAIL'
}

export type Language = 'zh' | 'en';
export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  avatar: string;
  bio: string;
  role: string;
  stats: UserStats;
}

export interface Course {
  id: string;
  title: string;
  author: string;
  price: number;
  commissionRate: number; // Percentage, e.g., 20 for 20%
  sales: number;
  category: string;
  rating: number;
  imageUrl: string;
  description: string;
  fullDescription?: string;
  features?: string[];
  targetAudience?: string[];
  isUserCreated?: boolean;
}

export interface SopStep {
  title: string;
  description: string;
}

export interface Idea {
  id: string;
  title: string;
  author: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  investment: 'Low' | 'Medium' | 'High';
  likes: number;
  content: string;
  timestamp: string;
  // New fields for SOP/Sharing
  sop?: SopStep[];
  tools?: string[];
  monthlyRevenue?: string;
  validationTime?: string;
}

export interface Post {
  id: string;
  author: string;
  authorRole: string; // e.g., "Founder", "Freelancer"
  authorAvatar?: string;
  content: string;
  likes: number;
  isLiked?: boolean; // New: Track if current user liked it
  comments: number;
  timestamp: string;
  tags: string[];
}

export interface UserStats {
  totalEarnings: number;
  coursesSold: number;
  communityRank: string;
}