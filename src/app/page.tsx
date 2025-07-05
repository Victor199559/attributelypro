// src/app/page.tsx
'use client';

import { NavigationBar } from '@/components/landing/NavigationBar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ComparisonSection } from '@/components/landing/ComparisonSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CTASection } from '@/components/landing/CTASection';
import { FooterSection } from '@/components/landing/FooterSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NavigationBar />
      <HeroSection />
      <ComparisonSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}