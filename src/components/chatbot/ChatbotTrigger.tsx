'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { ChatbotAiSparkIcon } from './ChatbotAiSparkIcon';

type ChatbotTriggerProps = {
  onClick: () => void;
  variant?: 'header' | 'compact';
};

export function ChatbotTrigger({ onClick, variant = 'header' }: ChatbotTriggerProps) {
  const t = useTranslations();
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'rounded-full bg-gradient-to-r from-[#1F396D] to-[#F16112] p-[1.5px] shadow-sm',
        isCompact && 'shrink-0',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={t('chatbot.openChat')}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full bg-white font-bold text-[#1F396D] transition-colors hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D] focus-visible:ring-offset-2',
          isCompact
            ? 'min-h-[36px] px-2.5 py-1.5 text-xs'
            : 'min-h-[36px] whitespace-nowrap px-3 py-2 text-sm lg:px-4',
        )}
      >
        <ChatbotAiSparkIcon
          className={cn(
            'shrink-0 text-[#1F396D]',
            isCompact ? 'h-4 w-4' : 'h-[18px] w-[18px]',
          )}
        />
        <span>{isCompact ? t('chatbot.triggerLabel') : t('chatbot.title')}</span>
      </button>
    </div>
  );
}
