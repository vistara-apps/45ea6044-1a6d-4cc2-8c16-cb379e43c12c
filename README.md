# PitchHarmony - Soundscapes for Investors

A Base Mini App that helps early-stage founders perfect their pitches through AI feedback and curated ambient soundscapes.

## Features

- **Guided Pitch Framework**: Structured templates for different pitch scenarios
- **AI Pitch Feedback**: Actionable insights on delivery, clarity, and impact
- **Ambient Soundscapes**: Customizable sound environments to manage anxiety and enhance focus
- **Micro-Introduction Platform**: Facilitates targeted introductions to relevant investors

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Blockchain**: Base (via MiniKit)
- **Identity**: OnchainKit
- **AI**: OpenAI/OpenRouter
- **TypeScript**: Full type safety

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pitchharmony
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key  
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKit and OnchainKit providers
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AppShell.tsx       # Main app container
│   ├── PitchRecorder.tsx  # Audio recording component
│   ├── SoundscapeSelector.tsx # Ambient sound selection
│   ├── AIResponseCard.tsx # AI feedback display
│   └── IntroductionForm.tsx # Investor introduction form
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # App constants
│   ├── utils.ts          # Utility functions
│   └── ai-service.ts     # AI analysis service
└── public/               # Static assets
    └── manifest.json     # Base Mini App manifest
```

## Key Components

### PitchRecorder
- Records audio pitches using Web Audio API
- Provides visual feedback during recording
- Handles playback and re-recording functionality

### AIResponseCard
- Displays comprehensive AI feedback
- Shows scores for clarity, pacing, tone, and content
- Provides actionable suggestions for improvement

### SoundscapeSelector
- Curated ambient soundscapes for focus and calm
- Background audio playback during practice
- Customizable sound environments

### IntroductionForm
- Collects company and funding information
- Matches founders with relevant investors
- Facilitates introduction requests

## Design System

The app uses a cohesive design system with:

- **Colors**: Primary blue, accent orange, neutral grays
- **Typography**: Clean, readable font hierarchy
- **Components**: Consistent button styles, cards, and form elements
- **Motion**: Smooth transitions and micro-interactions

## Base Mini App Integration

- **MiniKit Provider**: Handles Base chain connection and user identity
- **OnchainKit**: Provides wallet and identity components
- **Frame Actions**: In-app recording, soundscape playback, feedback requests
- **Social Integration**: Leverages Farcaster identity and social primitives

## Development

### Adding New Features

1. Define types in `lib/types.ts`
2. Add constants to `lib/constants.ts`
3. Create components in `components/`
4. Update main page in `app/page.tsx`

### Styling Guidelines

- Use Tailwind CSS classes
- Follow the design token system
- Maintain mobile-first responsive design
- Use consistent spacing and colors

### AI Integration

The AI service (`lib/ai-service.ts`) handles:
- Speech-to-text conversion
- Content analysis and scoring
- Feedback generation
- Suggestion recommendations

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - Railway
   - Custom server

3. **Configure environment variables** in your deployment platform

4. **Update manifest.json** with your production URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
