export const SUBSCRIPTION_TIERS = {
  'sound-check': {
    name: 'Sound Check',
    price: 19,
    features: [
      'Basic pitch recording',
      '3 AI feedback sessions per month',
      'Access to 5 soundscapes',
      'Basic pitch templates'
    ]
  },
  'pitch-perfect': {
    name: 'Pitch Perfect',
    price: 49,
    features: [
      'Unlimited pitch recording',
      'Advanced AI feedback',
      'Custom soundscape creation',
      'Advanced pitch templates',
      'Performance analytics'
    ]
  },
  'investor-ready': {
    name: 'Investor Ready',
    price: 99,
    features: [
      'Everything in Pitch Perfect',
      'Priority support',
      'Exclusive soundscapes',
      'Investor introduction platform',
      'Personal pitch coach sessions'
    ]
  }
} as const;

export const SOUNDSCAPES = [
  {
    id: 'focus-flow',
    name: 'Focus Flow',
    description: 'Gentle ambient sounds to enhance concentration',
    audioUrl: '/audio/focus-flow.mp3',
    tags: ['focus', 'ambient', 'productivity'],
    color: 'bg-blue-100'
  },
  {
    id: 'investor-calm',
    name: 'Investor Calm',
    description: 'Sophisticated background for confident delivery',
    audioUrl: '/audio/investor-calm.mp3',
    tags: ['confidence', 'professional', 'calm'],
    color: 'bg-green-100'
  },
  {
    id: 'creative-spark',
    name: 'Creative Spark',
    description: 'Inspiring sounds to boost creative thinking',
    audioUrl: '/audio/creative-spark.mp3',
    tags: ['creativity', 'inspiration', 'energy'],
    color: 'bg-purple-100'
  },
  {
    id: 'boardroom-ready',
    name: 'Boardroom Ready',
    description: 'Executive-level ambiance for high-stakes pitches',
    audioUrl: '/audio/boardroom-ready.mp3',
    tags: ['executive', 'professional', 'authority'],
    color: 'bg-gray-100'
  }
];

export const PITCH_TEMPLATES = [
  {
    id: 'elevator-pitch',
    name: 'Elevator Pitch',
    description: '30-60 second compelling introduction',
    structure: [
      'Hook/Problem Statement',
      'Solution Overview',
      'Market Opportunity',
      'Call to Action'
    ]
  },
  {
    id: 'investor-deck',
    name: 'Investor Deck Pitch',
    description: '10-15 minute comprehensive presentation',
    structure: [
      'Problem & Market Size',
      'Solution & Product Demo',
      'Business Model',
      'Traction & Metrics',
      'Team & Funding Ask'
    ]
  },
  {
    id: 'demo-day',
    name: 'Demo Day Pitch',
    description: '3-5 minute high-impact presentation',
    structure: [
      'Compelling Hook',
      'Problem & Solution',
      'Traction Highlights',
      'Funding & Vision'
    ]
  }
];
