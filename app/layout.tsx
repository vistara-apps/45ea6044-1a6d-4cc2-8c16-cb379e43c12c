import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitchHarmony - Soundscapes for Investors',
  description: 'Tune Your Pitch, Amplify Your Credibility',
  openGraph: {
    title: 'PitchHarmony',
    description: 'Soundscapes for Investors: Tune Your Pitch, Amplify Your Credibility',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/og-image.png',
    'fc:frame:button:1': 'Start Pitching',
    'fc:frame:button:1:action': 'post',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
