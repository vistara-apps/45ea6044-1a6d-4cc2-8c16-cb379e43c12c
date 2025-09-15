export interface User {
  userId: string;
  farcasterId: string;
  email?: string;
  subscriptionTier: 'sound-check' | 'pitch-perfect' | 'investor-ready';
  createdAt: Date;
}

export interface Pitch {
  pitchId: string;
  userId: string;
  title: string;
  script: string;
  recordingUrl?: string;
  feedback?: AIFeedback;
  createdAt: Date;
}

export interface Soundscape {
  soundscapeId: string;
  name: string;
  description: string;
  audioUrl: string;
  tags: string[];
  customizationOptions?: Record<string, any>;
}

export interface IntroductionRequest {
  requestId: string;
  pitcherUserId: string;
  investorUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

export interface AIFeedback {
  overallScore: number;
  clarity: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  pacing: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  tone: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  content: {
    score: number;
    feedback: string;
    suggestions: string[];
  };
  summary: string;
  keyStrengths: string[];
  areasForImprovement: string[];
}

export interface RecordingState {
  isRecording: boolean;
  isProcessing: boolean;
  recordingUrl?: string;
  duration: number;
}
