import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { HeaderChatbotTrigger } from '@/components/chatbot/HeaderChatbotTrigger';
import { MenuItem } from './types';
import {
  getVisibleDropdownItems,
  isDropdownItemPathActive,
  isMenuItemActive,
  isSubmenuItemPathActive,
} from './utils';
import type { SubmenuItem } from './types';

// Student login is now handled by our custom page

function renderMobileSubmenuItem(
  sub: SubmenuItem,
  parentDropdownKey: string,
  createLocaleUrl: (path: string) => string,
  pathname: string | null,
  locale: string,
  expandedNestedSubmenus: Record<string, boolean>,
  toggleNestedSubmenu: (key: string) => void,
  nestedSubmenuKey: (parentKey: string, itemKey: string) => string,
  onCloseMobileMenu: () => void,
): ReactNode {
  const itemKey = sub.key ?? sub.title;
  const nestedKey = nestedSubmenuKey(parentDropdownKey, itemKey);
  const isNestedActive = isSubmenuItemPathActive(sub, pathname, locale);

  if (sub.hasSubmenu && sub.submenuItems?.length) {
    const isNestedExpanded = expandedNestedSubmenus[nestedKey];
    return (
      <div key={nestedKey} className="mb-1 last:mb-0">
        <button
          type="button"
          onClick={() => toggleNestedSubmenu(nestedKey)}
          className={`w-full flex items-center justify-between py-2 px-2 text-sm transition-colors duration-200 rounded-lg text-left ${
            isNestedActive
              ? 'text-[#1F396D] bg-[#1F396D]/10 font-medium'
              : 'text-gray-700 hover:text-[#F16112] hover:bg-gray-50'
          }`}
        >
          <span>{sub.title}</span>
          {isNestedExpanded ? (
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
          )}
        </button>
        {isNestedExpanded && (
          <div className="ml-3 mt-0.5 mb-1 space-y-0.5 border-l-2 border-gray-200 pl-3">
            {sub.submenuItems.map((nested) => {
              const nestedHref = createLocaleUrl(nested.href);
              const isLinkActive = isSubmenuItemPathActive(nested, pathname, locale);
              return (
                <Link
                  key={nested.key ?? nested.title}
                  href={nestedHref}
                  prefetch={false}
                  className={`block py-2 px-2 text-sm transition-colors duration-200 rounded-lg ${
                    isLinkActive
                      ? 'text-[#1F396D] bg-[#1F396D]/10 font-medium'
                      : 'text-gray-600 hover:text-[#F16112] hover:bg-gray-50'
                  }`}
                  onClick={onCloseMobileMenu}
                >
                  <span className="block">{nested.title}</span>
                  {nested.description ? (
                    <span className="block text-xs text-gray-500 mt-0.5">
                      {nested.description}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const href = createLocaleUrl(sub.href);
  const isLinkActive = pathname?.startsWith(href);
  return (
    <Link
      key={itemKey}
      href={href}
      prefetch={false}
      className={`block py-2 px-2 text-sm transition-colors duration-200 rounded-lg ${
        isLinkActive
          ? 'text-[#1F396D] bg-[#1F396D]/10 font-medium'
          : 'text-gray-600 hover:text-[#F16112] hover:bg-gray-50'
      }`}
      onClick={onCloseMobileMenu}
    >
      {sub.title}
    </Link>
  );
}

interface MobileNavigationProps {
  menuItems: MenuItem[];
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
  createLocaleUrl: (path: string) => string;
  pathname: string | null;
  locale: string;
  cartItemCount: number;
  showCart: boolean;
}

export default function MobileNavigation({
  menuItems,
  mobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
  createLocaleUrl,
  pathname,
  locale,
  cartItemCount,
  showCart
}: MobileNavigationProps) {
  const [expandedDropdowns, setExpandedDropdowns] = useState<{ [key: string]: boolean }>({});
  const [expandedNestedSubmenus, setExpandedNestedSubmenus] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (key: string) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleNestedSubmenu = (key: string) => {
    setExpandedNestedSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const nestedSubmenuKey = (parentKey: string, itemKey: string) => `${parentKey}:${itemKey}`;

  const hasDropdownItems = (item: MenuItem) => {
    if (item.type !== 'dropdown' || !item.dropdown?.items) {
      return false;
    }
    return getVisibleDropdownItems(item.dropdown.items).length > 0;
  };

  // Reset dropdowns when menu closes
  useEffect(() => {
    if (!mobileMenuOpen) {
      setExpandedDropdowns({});
      setExpandedNestedSubmenus({});
    }
  }, [mobileMenuOpen]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const usableMenuItems = Array.isArray(menuItems) ? menuItems : [];
  const filteredMenuItems = usableMenuItems.filter(
    (item) => item.key !== 'enroll' && item.visible !== false
  );
  return (
    <>
      {/* Mobile menu button & cart icon */}
      <div className="lg:hidden flex items-center gap-1 z-[55] relative min-w-0">
        <HeaderChatbotTrigger variant="compact" />
        {showCart && (
          <Link
            href={createLocaleUrl('/cart')}
            prefetch={false}
            className="relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-gray-700 hover:text-[#F16112] transition-colors rounded-lg hover:bg-gray-50"
            onClick={onCloseMobileMenu}
            aria-label={cartItemCount > 0 ? `Shopping cart, ${cartItemCount} items` : 'Shopping cart'}
          >
            <ShoppingCart className="w-7 h-7" strokeWidth={2.25} aria-hidden />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#F16112] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium min-w-[1.25rem]" aria-hidden>
                {cartItemCount}
              </span>
            )}
          </Link>
        )}

        <button
          type="button"
          className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-lg border border-[#1F396D]/30 bg-[#1F396D]/5 text-[#1F396D] hover:bg-[#1F396D]/10 hover:border-[#1F396D]/45 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F16112] focus:ring-offset-2"
          onClick={onToggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7 shrink-0" strokeWidth={2.5} aria-hidden />
          ) : (
            <Menu className="w-7 h-7 shrink-0" strokeWidth={2.5} aria-hidden />
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[70]"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onCloseMobileMenu} />
          <div className="absolute inset-0 bg-white flex flex-col shadow-2xl w-screen h-screen">
            <div className="px-4 py-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
              <p className="text-lg font-semibold text-gray-900 m-0">Menu</p>
              <button
                type="button"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-gray-700 hover:text-[#F16112] transition-colors rounded-lg hover:bg-gray-100"
                onClick={onCloseMobileMenu}
                aria-label="Close menu"
              >
                <X className="w-7 h-7" strokeWidth={2.5} aria-hidden />
              </button>
            </div>

            <div className="px-4 py-6 pb-8 flex-1 overflow-y-auto">
              {filteredMenuItems.length > 0 ? (
                <>
                  {filteredMenuItems.map((item, index) => {
                    const isDropdown = hasDropdownItems(item);
                    const isExpanded = expandedDropdowns[item.key];
                    const visibleDropdownItems = isDropdown
                      ? getVisibleDropdownItems(item.dropdown?.items || [])
                      : [];
                    const isActive = isMenuItemActive(
                      item,
                      pathname,
                      locale
                    );

                    return (
                      <div key={item.key}>
                        {isDropdown ? (
                          <>
                            <button
                              type="button"
                              onClick={() => toggleDropdown(item.key)}
                              className={`w-full flex items-center justify-between font-medium py-3 px-2 transition-colors duration-200 rounded-lg text-left ${
                                isActive
                                  ? 'text-[#1F396D] bg-[#1F396D]/10'
                                  : 'text-gray-700 hover:text-[#F16112] hover:bg-gray-50'
                              }`}
                            >
                              <span>{item.label}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-5 h-5 flex-shrink-0" />
                              )}
                            </button>

                            {isExpanded && visibleDropdownItems.length > 0 && (
                              <div className="ml-4 mt-1 mb-2 space-y-1 border-l-2 border-gray-200 pl-4">
                                {visibleDropdownItems.map((dropdownItem) => {
                                  if (dropdownItem.hasSubmenu && dropdownItem.submenuItems?.length) {
                                    const hasNestedChild = dropdownItem.submenuItems.some(
                                      (sub) => sub.hasSubmenu && sub.submenuItems?.length,
                                    );

                                    if (hasNestedChild) {
                                      return (
                                        <div
                                          key={dropdownItem.key}
                                          className="mb-2 last:mb-0 space-y-0.5"
                                        >
                                          {dropdownItem.submenuItems.map((sub) =>
                                            renderMobileSubmenuItem(
                                              sub,
                                              dropdownItem.key,
                                              createLocaleUrl,
                                              pathname,
                                              locale,
                                              expandedNestedSubmenus,
                                              toggleNestedSubmenu,
                                              nestedSubmenuKey,
                                              onCloseMobileMenu,
                                            ),
                                          )}
                                        </div>
                                      );
                                    }

                                    const isFlyoutExpanded =
                                      expandedNestedSubmenus[dropdownItem.key];
                                    const isFlyoutActive = isDropdownItemPathActive(
                                      dropdownItem,
                                      pathname,
                                      locale,
                                    );

                                    return (
                                      <div key={dropdownItem.key} className="mb-1 last:mb-0">
                                        <div
                                          className={`flex items-center rounded-lg ${
                                            isFlyoutActive
                                              ? 'bg-[#1F396D]/10'
                                              : 'hover:bg-gray-50'
                                          }`}
                                        >
                                          <Link
                                            href={createLocaleUrl(dropdownItem.href)}
                                            prefetch={false}
                                            className={`flex-1 py-2 px-2 text-sm transition-colors duration-200 text-left ${
                                              isFlyoutActive
                                                ? 'text-[#1F396D] font-medium'
                                                : 'text-gray-700 hover:text-[#F16112]'
                                            }`}
                                            onClick={onCloseMobileMenu}
                                          >
                                            {dropdownItem.title}
                                          </Link>
                                          <button
                                            type="button"
                                            aria-expanded={isFlyoutExpanded}
                                            aria-label={`${isFlyoutExpanded ? 'Collapse' : 'Expand'} ${dropdownItem.title} grade levels`}
                                            onClick={() => toggleNestedSubmenu(dropdownItem.key)}
                                            className="p-2 text-gray-500 hover:text-[#1F396D]"
                                          >
                                            {isFlyoutExpanded ? (
                                              <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                            ) : (
                                              <ChevronRight className="w-4 h-4 flex-shrink-0" />
                                            )}
                                          </button>
                                        </div>
                                        {isFlyoutExpanded ? (
                                          <div className="ml-3 mt-0.5 mb-1 space-y-0.5 border-l-2 border-gray-200 pl-3">
                                            {dropdownItem.submenuItems.map((sub) => {
                                              const subHref = createLocaleUrl(sub.href);
                                              const isLinkActive = isSubmenuItemPathActive(
                                                sub,
                                                pathname,
                                                locale,
                                              );
                                              return (
                                                <Link
                                                  key={sub.key ?? sub.title}
                                                  href={subHref}
                                                  prefetch={false}
                                                  className={`block py-2 px-2 text-sm transition-colors duration-200 rounded-lg ${
                                                    isLinkActive
                                                      ? 'text-[#1F396D] bg-[#1F396D]/10 font-medium'
                                                      : 'text-gray-600 hover:text-[#F16112] hover:bg-gray-50'
                                                  }`}
                                                  onClick={onCloseMobileMenu}
                                                >
                                                  {sub.title}
                                                </Link>
                                              );
                                            })}
                                          </div>
                                        ) : null}
                                      </div>
                                    );
                                  }
                                  const isDropdownItemActive = pathname?.startsWith(
                                    createLocaleUrl(dropdownItem.href)
                                  );
                                  return (
                                    <Link
                                      key={dropdownItem.key}
                                      href={createLocaleUrl(dropdownItem.href)}
                                      prefetch={false}
                                      className={`block py-2 px-2 text-sm transition-colors duration-200 rounded-lg ${
                                        isDropdownItemActive
                                          ? 'text-[#1F396D] bg-[#1F396D]/10 font-medium'
                                          : 'text-gray-600 hover:text-[#F16112] hover:bg-gray-50'
                                      }`}
                                      onClick={onCloseMobileMenu}
                                    >
                                      {dropdownItem.title}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          // Prevent navigation for "Camps" menu item
                          item.key === 'camps' ? (
                            <span
                              className={`block font-medium py-3 px-2 transition-colors duration-200 rounded-lg cursor-default ${
                                isActive
                                  ? 'text-[#1F396D] bg-[#1F396D]/10'
                                  : 'text-gray-700 hover:text-[#F16112] hover:bg-gray-50'
                              }`}
                            >
                              {item.label}
                            </span>
                          ) : (
                            <Link
                              href={createLocaleUrl(item.href)}
                              prefetch={false}
                              className={`block font-medium py-3 px-2 transition-colors duration-200 rounded-lg ${
                                isActive
                                  ? 'text-[#1F396D] bg-[#1F396D]/10'
                                  : 'text-gray-700 hover:text-[#F16112] hover:bg-gray-50'
                              }`}
                              onClick={onCloseMobileMenu}
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                        {index < filteredMenuItems.length - 1 && (
                          <div className="border-b border-gray-200 my-1" />
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="text-gray-500 text-sm py-4">
                  Loading menu...
                </div>
              )}

              <Link
                href={createLocaleUrl('/enroll')}
                prefetch={false}
                className="block w-full mt-6 px-6 py-3 rounded-full font-medium text-center transition-all duration-300 bg-[#F16112] text-white hover:bg-[#F1894F] shadow-lg"
                onClick={onCloseMobileMenu}
              >
                Enroll Now
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <LocaleSwitcher />
              </div>

              <div className="mt-4 flex justify-end">
                <div className="flex shrink-0 items-center">
                  <HeaderChatbotTrigger variant="compact" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
