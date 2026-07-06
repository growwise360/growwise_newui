import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import SearchBar from './SearchBar';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { HeaderChatbotTrigger } from '@/components/chatbot/HeaderChatbotTrigger';
import { useButtonTracking } from '@/lib/analytics/hooks';

interface UtilityIconsProps {
  cartItemCount: number;
  createLocaleUrl: (path: string) => string;
  showCart: boolean;
}

export default function UtilityIcons({ cartItemCount, createLocaleUrl, showCart }: UtilityIconsProps) {
  const { trackButtonClick } = useButtonTracking();
  // Student login is now handled by our custom page

  const handleAssessmentClick = () => {
    trackButtonClick('Book Assessment', 'header_navigation', {
      button_type: 'nav_button',
      button_variant: 'orange',
      destination: '/book-assessment',
    });
  };

  return (
    <div className="header-utilities relative z-0 hidden lg:flex items-center gap-2 flex-none">
      <div className="flex items-center gap-2">
        <div className="block">
          <SearchBar />
        </div>
        {showCart && (
          <Link 
            href={createLocaleUrl('/cart')} 
            prefetch={false}
            className="relative text-gray-700 hover:text-[#F16112] transition-colors"
            aria-label={cartItemCount > 0 ? `Shopping cart, ${cartItemCount} items` : 'Shopping cart'}
          >
            <ShoppingCart className="w-5 h-5" aria-hidden />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F16112] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium" aria-hidden>
                {cartItemCount}
              </span>
            )}
          </Link>
        )}
        <Link
          href={createLocaleUrl('/book-assessment')}
          prefetch={false}
          onClick={handleAssessmentClick}
          className="inline-flex whitespace-nowrap rounded-full bg-[#F16112] px-3 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#F1894F] hover:shadow-xl xl:px-4"
        >
          Book Assessment
        </Link>
        <div className="hidden xl:block">
          <HeaderChatbotTrigger />
        </div>

        <div className="hidden min-[1800px]:flex items-center gap-2">
          <Link
            href={createLocaleUrl('/student-login')}
            prefetch={false}
            className="px-4 py-2 rounded-full text-sm font-medium border border-[#1F396D] text-[#1F396D] hover:bg-[#1F396D] hover:text-white transition-all duration-300 whitespace-nowrap shadow-sm"
          >
            Student Login
          </Link>
        </div>
      </div>

      <div className="hidden 2xl:block">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
