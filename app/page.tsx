'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { PitchRecorder } from '../components/PitchRecorder';
import { SoundscapeSelector } from '../components/SoundscapeSelector';
import { AIResponseCard } from '../components/AIResponseCard';
import { IntroductionForm } from '../components/IntroductionForm';
import { useMiniKit } from '@coinbase/minikit';

type TabType = 'practice' | 'soundscapes' | 'feedback' | 'introductions';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('practice');
  const [currentPitch, setCurrentPitch] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const { user } = useMiniKit();

  const handlePitchRecorded = (pitchData: string) => {
    setCurrentPitch(pitchData);
    setActiveTab('feedback');
  };

  const handleFeedbackReceived = (feedbackData: any) => {
    setFeedback(feedbackData);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <header className="bg-surface shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">PitchHarmony</h1>
                <p className="text-sm text-text-secondary">Soundscapes for Investors</p>
              </div>
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.displayName?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-text-secondary">
                    {user.displayName || 'User'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-surface border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex space-x-8">
              {[
                { id: 'practice', label: 'Practice', icon: '🎤' },
                { id: 'soundscapes', label: 'Soundscapes', icon: '🎵' },
                { id: 'feedback', label: 'Feedback', icon: '🤖' },
                { id: 'introductions', label: 'Introductions', icon: '🤝' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === 'practice' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  Perfect Your Pitch
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Record your pitch and get AI-powered feedback to improve your delivery, 
                  clarity, and investor appeal.
                </p>
              </div>
              <PitchRecorder onPitchRecorded={handlePitchRecorded} />
            </div>
          )}

          {activeTab === 'soundscapes' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  Ambient Soundscapes
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Choose from curated sound environments designed to reduce anxiety 
                  and enhance your focus during pitch practice.
                </p>
              </div>
              <SoundscapeSelector />
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  AI Feedback
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Get detailed insights on your pitch delivery, content structure, 
                  and persuasive impact.
                </p>
              </div>
              {feedback ? (
                <AIResponseCard feedback={feedback} variant="constructive" />
              ) : currentPitch ? (
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-text-secondary">Analyzing your pitch...</p>
                </div>
              ) : (
                <div className="text-center card max-w-md mx-auto">
                  <p className="text-text-secondary">
                    Record a pitch in the Practice tab to receive AI feedback.
                  </p>
                  <button
                    onClick={() => setActiveTab('practice')}
                    className="btn-primary mt-4"
                  >
                    Start Recording
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'introductions' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-text-primary mb-4">
                  Investor Introductions
                </h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                  Connect with relevant investors based on your pitch profile 
                  and funding needs.
                </p>
              </div>
              <IntroductionForm />
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-surface border-t border-gray-100 mt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <p className="text-text-secondary text-sm">
                © 2024 PitchHarmony. Tune Your Pitch, Amplify Your Credibility.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}
