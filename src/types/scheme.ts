export interface Scheme {
  id: string;
  title: string;
  description: string;
  category: SchemeCategory;
  eligibility: string[];
  applicationDeadline: Date;
  launchDate: Date;
  status: SchemeStatus;
  documents: Document[];
  applyLink: string;
  isVerified: boolean;
  aiVerificationScore: number;
  location: string[];
  beneficiaryCount?: number;
  tags: string[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'doc' | 'image';
}

export type SchemeCategory = 
  | 'education' 
  | 'health' 
  | 'agriculture' 
  | 'rural-development' 
  | 'women-empowerment' 
  | 'employment' 
  | 'housing' 
  | 'financial-inclusion'
  | 'skill-development'
  | 'senior-citizen'
  | 'disability-support';

export type SchemeStatus = 'upcoming' | 'active' | 'expired' | 'closed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  preferences: UserPreferences;
}

export interface UserPreferences {
  categories: SchemeCategory[];
  locations: string[];
  language: 'en' | 'hi' | 'regional';
  notifications: boolean;
}

export interface VoiceQuery {
  id: string;
  query: string;
  language: 'en' | 'hi';
  response: string;
  timestamp: Date;
  schemes: Scheme[];
}