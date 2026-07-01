'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Zap } from 'lucide-react';
import Image from 'next/image';

interface PartnerReferralCardProps {
  partner: {
    name: string;
    displayName: string;
    code: string;
    benefit: string;
  };
}

export default function PartnerReferralCard({ partner }: PartnerReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(partner.code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    const el = document.createElement('textarea');
    el.value = partner.code;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderPartnerLogo = () => {
    switch (partner.name.toLowerCase()) {
      case 'velp':
        return (
          <div className="inline-flex items-center justify-center rounded-xl bg-[#21104F] px-7 py-3 text-2xl font-extrabold lowercase tracking-tight text-white shadow-md">
            velp
            <span className="absolute right-3 top-2 h-2 w-2 rounded-full bg-[#F16112]" aria-hidden />
            <span className="absolute right-2 top-4 h-1.5 w-1.5 rounded-full bg-[#35B6A5]" aria-hidden />
            <span className="absolute right-5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#F4C542]" aria-hidden />
          </div>
        );
      case 'activityhero':
        return (
          <span className="text-center text-2xl font-extrabold tracking-tight">
            <span className="text-[#2767B2]">Activity</span>
            <span className="text-[#F16112]">Hero</span>
          </span>
        );
      case '6crickets':
        return (
          <span className="flex items-center gap-3">
            <Image
              src="https://www.6crickets.com/_assets/images/fav.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="text-2xl font-extrabold tracking-tight text-[#263B70]">6crickets</span>
          </span>
        );
      default:
        return <span className="text-xl font-bold">{partner.name}</span>;
    }
  };

  return (
    <div className="mb-8 w-full">
      <Card className="border-2 border-[#F16112]/20 bg-gradient-to-br from-[#FFF7ED] via-white to-[#F8FAFF] shadow-lg overflow-hidden">
        <CardContent className="p-6 sm:p-8 md:p-10">
          {/* Partner Logo/Name */}
          <div className="mb-6 flex justify-center">
            {renderPartnerLogo()}
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-[#F16112]/20 to-transparent" />

          {/* Welcome Text */}
          <h3 className="mb-6 text-center text-2xl sm:text-3xl font-bold text-[#1F396D]">
            {partner.displayName}
          </h3>

          {/* Partner Code Section */}
          <div className="mb-8 rounded-xl bg-white border-2 border-[#1F396D]/10 p-6 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
              Your Exclusive Partner Code
            </p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-3xl sm:text-4xl font-bold text-[#F16112] tracking-wider">
                {partner.code}
              </code>
              <Button
                type="button"
                onClick={handleCopyCode}
                variant="outline"
                size="sm"
                className="flex-shrink-0 border-[#F16112] text-[#F16112] hover:bg-[#F16112]/10 h-10 w-10 p-0 rounded-lg"
                aria-label={`Copy code ${partner.code}`}
              >
                {copied ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="mt-2 text-sm font-medium text-green-600">Copied!</p>
            )}
          </div>

          {/* Benefit Text */}
          <div className="mb-6 rounded-lg bg-[#F16112]/5 border border-[#F16112]/20 p-4">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 flex-shrink-0 text-[#F16112] mt-0.5" />
              <p className="text-sm sm:text-base font-semibold text-gray-800">
                {partner.benefit}
              </p>
            </div>
          </div>

          {/* Reassurance Line */}
          <p className="text-center text-xs sm:text-sm text-gray-600 leading-relaxed">
            Book your free assessment first. Your partner benefit will be applied after enrollment confirmation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
