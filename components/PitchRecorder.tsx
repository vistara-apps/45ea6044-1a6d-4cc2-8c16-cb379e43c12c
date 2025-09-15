'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RotateCcw } from 'lucide-react';
import { formatDuration } from '../lib/utils';
import type { RecordingState } from '../lib/types';

interface PitchRecorderProps {
  onPitchRecorded: (pitchData: string) => void;
  variant?: 'idle' | 'recording' | 'processing' | 'finished';
}

export function PitchRecorder({ onPitchRecorded, variant = 'idle' }: PitchRecorderProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isProcessing: false,
    duration: 0
  });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setRecordingState(prev => ({
          ...prev,
          isRecording: false,
          recordingUrl: audioUrl
        }));

        // Simulate processing and trigger callback
        setTimeout(() => {
          onPitchRecorded(audioUrl);
        }, 1000);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingState(prev => ({
        ...prev,
        isRecording: true,
        duration: 0
      }));

      // Start timer
      intervalRef.current = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const playRecording = () => {
    if (recordingState.recordingUrl && !isPlaying) {
      const audio = new Audio(recordingState.recordingUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resetRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    setRecordingState({
      isRecording: false,
      isProcessing: false,
      duration: 0
    });
    setIsPlaying(false);
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        {/* Recording Visualization */}
        <div className="relative">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
            recordingState.isRecording 
              ? 'bg-red-100 animate-pulse' 
              : recordingState.recordingUrl 
                ? 'bg-green-100' 
                : 'bg-gray-100'
          }`}>
            {recordingState.isRecording ? (
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                <Mic className="w-8 h-8 text-white" />
              </div>
            ) : recordingState.recordingUrl ? (
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                <Mic className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          
          {recordingState.isRecording && (
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-red-300 animate-ping"></div>
          )}
        </div>

        {/* Timer */}
        <div className="text-2xl font-mono text-text-primary">
          {formatDuration(recordingState.duration)}
        </div>

        {/* Status Text */}
        <div className="text-text-secondary">
          {recordingState.isRecording ? (
            <p>Recording your pitch... Speak clearly and confidently!</p>
          ) : recordingState.recordingUrl ? (
            <p>Recording complete! Review your pitch or record again.</p>
          ) : (
            <p>Ready to record your pitch? Click the button below to start.</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!recordingState.isRecording && !recordingState.recordingUrl && (
            <button
              onClick={startRecording}
              className="btn-primary flex items-center space-x-2"
            >
              <Mic className="w-5 h-5" />
              <span>Start Recording</span>
            </button>
          )}

          {recordingState.isRecording && (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Square className="w-5 h-5" />
              <span>Stop Recording</span>
            </button>
          )}

          {recordingState.recordingUrl && (
            <>
              <button
                onClick={isPlaying ? pausePlayback : playRecording}
                className="btn-secondary flex items-center space-x-2"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Play</span>
                  </>
                )}
              </button>
              
              <button
                onClick={resetRecording}
                className="btn-secondary flex items-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Record Again</span>
              </button>
            </>
          )}
        </div>

        {/* Tips */}
        {!recordingState.isRecording && !recordingState.recordingUrl && (
          <div className="bg-blue-50 rounded-lg p-4 text-left">
            <h4 className="font-semibold text-text-primary mb-2">Recording Tips:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Find a quiet environment</li>
              <li>• Speak clearly and at a moderate pace</li>
              <li>• Keep your pitch between 1-3 minutes</li>
              <li>• Practice your key points beforehand</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
