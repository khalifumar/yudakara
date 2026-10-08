import type { Metadata } from 'next';
import './globals.css';
import TopNoticeBar from '@/components/layout/TopNoticeBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AccessibilityWidget from '@/components/shared/AccessibilityWidget';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Yudakara — Marketplace Jasa Kreatif Budaya Tradisional Indonesia',
  description:
    'Platform penghubung seniman, dalang, penari, pembatik, dan pengrajin tradisional nusantara dengan industri kreatif modern berlandaskan standar Fair Pay dan perlindungan hak cipta.',
  keywords: [
    'Yudakara',
    'Budaya Indonesia',
    'Seni Tradisional',
    'Batik Tulis',
    'Wayang Kulit',
    'Tari Tradisional',
    'Konsultan Budaya',
    'Marketplace Jasa Seni',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-[#FAFBF8] text-[#192024] antialiased">
        {/* Top Info Bar */}
        <TopNoticeBar />

        {/* Floating Institutional Pill Navbar */}
        <Suspense fallback={<div className="h-20" />}>
          <Navbar />
        </Suspense>

        {/* Main Content Viewport */}
        <div className="flex-1">
          {children}
        </div>

        {/* Institutional Footer */}
        <Footer />

        {/* Floating Accessibility Control */}
        <AccessibilityWidget />
      </body>
    </html>
  );
}
