import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from '../components/ErrorBoundary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Coach - Your Personal AI Coaching Platform",
  description: "Transform your skills with personalized AI coaching. Get expert guidance on interviews, presentations, language learning, and more - available 24/7. Start your free trial today.",
  keywords: "AI coaching, personal development, interview preparation, presentation skills, language learning, professional coaching, AI mentor",
  authors: [{ name: "AI Coach Team" }],
  creator: "AI Coach",
  publisher: "AI Coach",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "AI Coach - Your Personal AI Coaching Platform",
    description: "Transform your skills with personalized AI coaching. Get expert guidance on interviews, presentations, language learning, and more - available 24/7.",
    url: '/',
    siteName: 'AI Coach',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Coach - Personal AI Coaching Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Coach - Your Personal AI Coaching Platform",
    description: "Transform your skills with personalized AI coaching. Get expert guidance on interviews, presentations, language learning, and more.",
    images: ['/og-image.png'],
    creator: '@aicoach',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
  