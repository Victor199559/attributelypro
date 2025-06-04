'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Scale, Users, Globe } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to AttributelyPro
            </Link>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">AttributelyPro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl mb-6">
              <Scale className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">Last updated: January 2025</p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            
            {/* 1. Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-purple-600" />
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using AttributelyPro ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. 
                AttributelyPro is an AI-powered marketing attribution platform that helps businesses optimize their advertising campaigns across multiple platforms.
              </p>
            </section>

            {/* 2. Description of Service */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-purple-600" />
                2. Description of Service
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                AttributelyPro provides marketing attribution analytics, campaign optimization, and cross-platform insights through our web-based platform. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Cross-platform campaign attribution and analytics</li>
                <li>AI-powered optimization recommendations</li>
                <li>Real-time performance tracking and reporting</li>
                <li>Integration with major advertising platforms (Meta, Google, TikTok, YouTube)</li>
                <li>Fraud detection and traffic quality analysis</li>
              </ul>
            </section>

            {/* 3. User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of the Service, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Promptly updating your account information</li>
              </ul>
            </section>

            {/* 4. Data and Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data and Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                We take data privacy seriously. All campaign data you connect to AttributelyPro remains your property. 
                We use this data solely to provide attribution analytics and optimization insights. 
                We do not share, sell, or use your data for any purpose other than providing our services. 
                For detailed information about our data practices, please review our Privacy Policy.
              </p>
            </section>

            {/* 5. Acceptable Use */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Reverse engineer or attempt to extract source code</li>
              </ul>
            </section>

            {/* 6. Subscription and Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Subscription and Payments</h2>
              <p className="text-gray-700 leading-relaxed">
                AttributelyPro offers both free and paid subscription plans. Paid subscriptions are billed in advance on a monthly or annual basis. 
                You may cancel your subscription at any time. Cancellations take effect at the end of the current billing period. 
                No refunds are provided for partial months or years.
              </p>
            </section>

            {/* 7. Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service and its original content, features, and functionality are and will remain the exclusive property of AttributelyPro. 
                The Service is protected by copyright, trademark, and other laws. You may not copy, modify, distribute, sell, or lease any part of our Service.
              </p>
            </section>

            {/* 8. Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall AttributelyPro be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                resulting from your use of the Service.
              </p>
            </section>

            {/* 9. Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, 
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            {/* 10. Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-purple-600" />
                Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@attributelypro.com</p>
                <p><strong>Website:</strong> https://attributelypro.vercel.app</p>
                <p><strong>Address:</strong> Valencia, Los Ríos, Ecuador</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="border-t pt-8 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
                  ← Back to AttributelyPro
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-700">
                  Privacy Policy
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                © 2025 AttributelyPro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}