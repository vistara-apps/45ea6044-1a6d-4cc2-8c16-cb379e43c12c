import OpenAI from 'openai';
import type { AIFeedback } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function analyzePitch(audioUrl: string, transcript?: string): Promise<AIFeedback> {
  try {
    // In a real implementation, you would:
    // 1. Convert audio to text using speech-to-text API
    // 2. Analyze the transcript for content, structure, and persuasiveness
    // 3. Analyze audio for pacing, tone, and clarity
    
    // For demo purposes, we'll simulate the analysis
    const mockTranscript = transcript || "Hello, I'm excited to present our innovative solution that addresses a critical market need...";
    
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an expert pitch coach and investor advisor. Analyze the following pitch transcript and provide detailed feedback on clarity, pacing, tone, and content. Return your analysis as a JSON object with the following structure:

{
  "overallScore": number (0-100),
  "clarity": {
    "score": number (0-100),
    "feedback": "string",
    "suggestions": ["string"]
  },
  "pacing": {
    "score": number (0-100),
    "feedback": "string", 
    "suggestions": ["string"]
  },
  "tone": {
    "score": number (0-100),
    "feedback": "string",
    "suggestions": ["string"]
  },
  "content": {
    "score": number (0-100),
    "feedback": "string",
    "suggestions": ["string"]
  },
  "summary": "string",
  "keyStrengths": ["string"],
  "areasForImprovement": ["string"]
}`
        },
        {
          role: "user",
          content: `Please analyze this pitch transcript: "${mockTranscript}"`
        }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from AI service');
    }

    try {
      return JSON.parse(response) as AIFeedback;
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Return mock feedback if parsing fails
      return getMockFeedback();
    }
  } catch (error) {
    console.error('AI analysis failed:', error);
    // Return mock feedback as fallback
    return getMockFeedback();
  }
}

function getMockFeedback(): AIFeedback {
  return {
    overallScore: 78,
    clarity: {
      score: 82,
      feedback: "Your message is generally clear and well-structured. You effectively communicate the core value proposition.",
      suggestions: [
        "Use more specific examples to illustrate your points",
        "Avoid technical jargon when possible",
        "Structure your key points with clear transitions"
      ]
    },
    pacing: {
      score: 75,
      feedback: "Good overall pacing with room for improvement. Some sections feel rushed while others could be more dynamic.",
      suggestions: [
        "Slow down during key value propositions",
        "Use strategic pauses for emphasis",
        "Vary your speaking rhythm to maintain engagement"
      ]
    },
    tone: {
      score: 80,
      feedback: "Confident and professional tone that builds credibility. Shows passion for the solution.",
      suggestions: [
        "Inject more enthusiasm when discussing market opportunity",
        "Use storytelling to create emotional connection",
        "Balance confidence with humility about challenges"
      ]
    },
    content: {
      score: 74,
      feedback: "Solid content structure covering key elements. Could strengthen the problem-solution fit and market validation.",
      suggestions: [
        "Lead with a more compelling hook or story",
        "Provide stronger evidence of market demand",
        "Include more specific traction metrics",
        "Clarify your competitive advantage"
      ]
    },
    summary: "This is a solid pitch with clear communication and professional delivery. The core value proposition comes through well, and you demonstrate good understanding of your market. Focus on strengthening your opening hook, providing more specific evidence of traction, and varying your pacing for maximum impact.",
    keyStrengths: [
      "Clear articulation of the problem and solution",
      "Professional and confident delivery",
      "Good understanding of target market",
      "Logical flow and structure"
    ],
    areasForImprovement: [
      "Strengthen opening hook to grab attention immediately",
      "Provide more specific metrics and validation",
      "Improve pacing with strategic pauses",
      "Add more compelling storytelling elements"
    ]
  };
}
