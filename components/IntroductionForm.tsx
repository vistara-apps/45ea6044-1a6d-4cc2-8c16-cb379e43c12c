'use client';

import { useState } from 'react';
import { Send, User, Building, DollarSign } from 'lucide-react';

interface IntroductionFormProps {
  variant?: 'new' | 'submitted';
}

interface FormData {
  companyName: string;
  industry: string;
  fundingStage: string;
  fundingAmount: string;
  pitchSummary: string;
  investorPreferences: string;
}

export function IntroductionForm({ variant = 'new' }: IntroductionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    industry: '',
    fundingStage: '',
    fundingAmount: '',
    pitchSummary: '',
    investorPreferences: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(variant === 'submitted');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Introduction Request Submitted!
        </h3>
        <p className="text-text-secondary mb-6">
          We're matching you with relevant investors based on your profile. 
          You'll receive notifications when investors express interest.
        </p>
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-text-primary mb-2">What's Next?</h4>
          <ul className="text-sm text-text-secondary text-left space-y-1">
            <li>• We'll review your pitch and company profile</li>
            <li>• Match you with investors in your industry and stage</li>
            <li>• Facilitate introductions with interested parties</li>
            <li>• Provide updates on introduction status</li>
          </ul>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-secondary mt-4"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          Request Investor Introduction
        </h3>
        <p className="text-text-secondary">
          Tell us about your company and funding needs to get matched with relevant investors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>Company Information</span>
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="input-field"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Industry *
            </label>
            <select
              required
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="input-field"
            >
              <option value="">Select your industry</option>
              <option value="fintech">FinTech</option>
              <option value="healthtech">HealthTech</option>
              <option value="edtech">EdTech</option>
              <option value="saas">SaaS</option>
              <option value="ecommerce">E-commerce</option>
              <option value="ai-ml">AI/ML</option>
              <option value="blockchain">Blockchain</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Funding Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-text-primary flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Funding Details</span>
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Funding Stage *
            </label>
            <select
              required
              value={formData.fundingStage}
              onChange={(e) => handleInputChange('fundingStage', e.target.value)}
              className="input-field"
            >
              <option value="">Select funding stage</option>
              <option value="pre-seed">Pre-Seed</option>
              <option value="seed">Seed</option>
              <option value="series-a">Series A</option>
              <option value="series-b">Series B</option>
              <option value="series-c">Series C+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Funding Amount *
            </label>
            <select
              required
              value={formData.fundingAmount}
              onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
              className="input-field"
            >
              <option value="">Select funding amount</option>
              <option value="under-100k">Under $100K</option>
              <option value="100k-500k">$100K - $500K</option>
              <option value="500k-1m">$500K - $1M</option>
              <option value="1m-5m">$1M - $5M</option>
              <option value="5m-10m">$5M - $10M</option>
              <option value="over-10m">Over $10M</option>
            </select>
          </div>
        </div>

        {/* Pitch Summary */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Pitch Summary *
          </label>
          <textarea
            required
            rows={4}
            value={formData.pitchSummary}
            onChange={(e) => handleInputChange('pitchSummary', e.target.value)}
            className="input-field resize-none"
            placeholder="Briefly describe your company, product, and value proposition..."
          />
        </div>

        {/* Investor Preferences */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Investor Preferences
          </label>
          <textarea
            rows={3}
            value={formData.investorPreferences}
            onChange={(e) => handleInputChange('investorPreferences', e.target.value)}
            className="input-field resize-none"
            placeholder="Any specific investor preferences or requirements? (Optional)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Request Introduction</span>
            </>
          )}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-text-primary mb-2">How It Works</h4>
        <ul className="text-sm text-text-secondary space-y-1">
          <li>• We match you with investors based on your industry and stage</li>
          <li>• Investors review your pitch summary and company profile</li>
          <li>• Interested investors can request a full pitch presentation</li>
          <li>• We facilitate the introduction and initial communication</li>
        </ul>
      </div>
    </div>
  );
}
