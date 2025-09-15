'use client';

import { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { SOUNDSCAPES } from '../lib/constants';

interface SoundscapeSelectorProps {
  variant?: 'grid' | 'list';
}

export function SoundscapeSelector({ variant = 'grid' }: SoundscapeSelectorProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({});

  const togglePlayback = (soundscape: typeof SOUNDSCAPES[0]) => {
    if (playingId === soundscape.id) {
      // Stop current playback
      if (audioElements[soundscape.id]) {
        audioElements[soundscape.id].pause();
        audioElements[soundscape.id].currentTime = 0;
      }
      setPlayingId(null);
    } else {
      // Stop any currently playing audio
      if (playingId && audioElements[playingId]) {
        audioElements[playingId].pause();
        audioElements[playingId].currentTime = 0;
      }

      // Start new playback
      let audio = audioElements[soundscape.id];
      if (!audio) {
        audio = new Audio(soundscape.audioUrl);
        audio.loop = true;
        audio.volume = 0.6;
        
        audio.onended = () => {
          setPlayingId(null);
        };

        setAudioElements(prev => ({
          ...prev,
          [soundscape.id]: audio
        }));
      }

      audio.play().catch(console.error);
      setPlayingId(soundscape.id);
    }
  };

  const containerClasses = variant === 'grid' 
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
    : 'space-y-4';

  return (
    <div className="max-w-4xl mx-auto">
      <div className={containerClasses}>
        {SOUNDSCAPES.map((soundscape) => (
          <div
            key={soundscape.id}
            className={`card hover:shadow-lg transition-all duration-300 ${
              playingId === soundscape.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Play Button */}
              <button
                onClick={() => togglePlayback(soundscape)}
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                  playingId === soundscape.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {playingId === soundscape.id ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {soundscape.name}
                  </h3>
                  {playingId === soundscape.id && (
                    <div className="flex items-center space-x-1 text-primary">
                      <Volume2 className="w-4 h-4" />
                      <span className="text-sm">Playing</span>
                    </div>
                  )}
                </div>
                
                <p className="text-text-secondary mb-3">
                  {soundscape.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {soundscape.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visual Indicator */}
              <div className={`w-4 h-16 rounded-full ${soundscape.color} flex-shrink-0`}>
                {playingId === soundscape.id && (
                  <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <div className="card max-w-2xl mx-auto bg-blue-50">
          <h4 className="font-semibold text-text-primary mb-2">
            How to Use Soundscapes
          </h4>
          <p className="text-sm text-text-secondary">
            Select a soundscape that matches your mood and practice environment. 
            These ambient sounds are designed to reduce anxiety and improve focus 
            during pitch preparation. You can play them in the background while recording 
            or practicing your pitch.
          </p>
        </div>
      </div>
    </div>
  );
}
