'use client';

import { CheckCircle, AlertCircle, TrendingUp, Target } from 'lucide-react';
import { getScoreColor, getScoreBgColor } from '../lib/utils';
import type { AIFeedback } from '../lib/types';

interface AIResponseCardProps {
  feedback: AIFeedback;
  variant?: 'positive' | 'neutral' | 'constructive';
}

export function AIResponseCard({ feedback, variant = 'neutral' }: AIResponseCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'positive':
        return 'border-green-200 bg-green-50';
      case 'constructive':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-surface';
    }
  };

  const getVariantIcon = () => {
    switch (variant) {
      case 'positive':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'constructive':
        return <AlertCircle className="w-6 h-6 text-yellow-600" />;
      default:
        return <Target className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className={`card border-2 ${getVariantStyles()} max-w-4xl mx-auto`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        {getVariantIcon()}
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            AI Pitch Analysis
          </h3>
          <p className="text-text-secondary">
            Overall Score: <span className={`font-semibold ${getScoreColor(feedback.overallScore)}`}>
              {feedback.overallScore}/100
            </span>
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="font-semibold text-text-primary mb-2">Summary</h4>
        <p className="text-text-secondary">{feedback.summary}</p>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { key: 'clarity', label: 'Clarity', icon: '🎯' },
          { key: 'pacing', label: 'Pacing', icon: '⏱️' },
          { key: 'tone', label: 'Tone', icon: '🎵' },
          { key: 'content', label: 'Content', icon: '📝' },
        ].map(({ key, label, icon }) => {
          const score = feedback[key as keyof typeof feedback] as any;
          return (
            <div key={key} className="bg-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span>{icon}</span>
                  <span className="font-medium text-text-primary">{label}</span>
                </div>
                <span className={`font-semibold ${getScoreColor(score.score)}`}>
                  {score.score}/100
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    score.score >= 80 ? 'bg-green-500' :
                    score.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${score.score}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-text-secondary mb-2">{score.feedback}</p>
              
              {score.suggestions.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-text-primary mb-1">Suggestions:</p>
                  <ul className="text-xs text-text-secondary space-y-1">
                    {score.suggestions.map((suggestion: string, index: number) => (
                      <li key={index}>• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-800">Key Strengths</h4>
          </div>
          <ul className="space-y-2">
            {feedback.keyStrengths.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-green-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-800">Areas for Improvement</h4>
          </div>
          <ul className="space-y-2">
            {feedback.areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-blue-700">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-gray-200">
        <button className="btn-primary">
          Practice Again
        </button>
        <button className="btn-secondary">
          Save Feedback
        </button>
      </div>
    </div>
  );
}
