'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchHeaderRequested } from '@/store/slices/headerSlice';
import { useCart } from '@/components/gw/CartContext';
import { useDropdownState, useMobileMenu } from './hooks';
import {
  createLocaleUrl,
  getVisibleMenuItems,
  isCartHiddenOnPath,
  mergeRoboticsCampNavMenu,
  normalizeAcademicMathNav,
} from './utils';
import { DEFAULT_HEADER_DATA, FALLBACK_MENU_ITEMS } from './constants';
import TopBar from './TopBar';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';

export default function Header() {
  const locale = useLocale();
  const { state: cartState } = useCart();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const header = useAppSelector((s) => s.header.data);

  // Custom hooks for state management
  const {
    openDropdowns,
    openSubmenus,
    openDropdown,
    scheduleCloseDropdown,
    toggleDropdown,
    closeAllDropdowns,
    onSubmenuToggle,
    onSubmenuEnter,
    onSubmenuLeave
  } = useDropdownState();

  const {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  } = useMobileMenu();

  // Get menu items from Redux store (backend); fallback to frontend when missing
  const allMenuItems = header?.menuItems?.length ? header.menuItems : FALLBACK_MENU_ITEMS;
  const menuItems = getVisibleMenuItems(
    mergeRoboticsCampNavMenu(normalizeAcademicMathNav(allMenuItems), pathname),
  );

  // Create locale-aware URL helper
  const createLocaleUrlHelper = (path: string) => createLocaleUrl(path, locale);
  const showCart = !isCartHiddenOnPath(pathname);

  // Fetch header data if not available
  useEffect(() => {
    if (!header) dispatch(fetchHeaderRequested());
  }, [dispatch, header]);

  useEffect(() => {
    const headerEl = document.querySelector('.header-root');
    if (!headerEl) return;

    const onScroll = () => {
      headerEl.classList.toggle('header-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Get header data with fallbacks
  const topPhone = header?.topBar.phone ?? DEFAULT_HEADER_DATA.topBar.phone;
  const topEmail = header?.topBar.email ?? DEFAULT_HEADER_DATA.topBar.email;
  const topAddress = header?.topBar.address ?? DEFAULT_HEADER_DATA.topBar.address;
  const followLabel = header?.topBar.followLabel ?? DEFAULT_HEADER_DATA.topBar.followLabel;
  const social = header?.topBar.social ?? DEFAULT_HEADER_DATA.topBar.social;
  const footerHelper = header?.footerHelper ?? DEFAULT_HEADER_DATA.footerHelper;
  const footerContactCta = header?.footerContactCta ?? DEFAULT_HEADER_DATA.footerContactCta;

  return (
    <header className="header-root">
      {/* Top Header Bar — desktop/tablet only; reduces mobile header stack height */}
      <div className="max-md:hidden">
        <TopBar
          phone={topPhone}
          email={topEmail}
          address={topAddress}
          followLabel={followLabel}
          social={social}
        />
      </div>

      {/* Main Navigation */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 overflow-x-clip">
        <div className="header-mainrow lg:flex-nowrap">
          {/* Logo — flex-shrink-0 keeps the logo visible when nav is long */}
          <div className="header-logo-wrap">
            <Link href={createLocaleUrlHelper('/')} prefetch={false} className="cursor-pointer" aria-label="GrowWise home">
              <Image
                src="/assets/growwise-logo.png"
                alt="GrowWise"
                className="header-logo"
                width={230}
                height={90}
                sizes="(max-width: 640px) 120px, 280px"
                fetchPriority="low"
              />
            </Link>
            <p className="header-logo-slogan" aria-label="Education First Always. business second.">
              <span className="header-logo-slogan-primary">Education First Always.</span>
              <span className="header-logo-slogan-secondary">business second.</span>
            </p>
          </div>

          {/* Desktop Navigation */}
          <Navigation
            menuItems={menuItems}
            openDropdowns={openDropdowns}
            openSubmenus={openSubmenus}
            onDropdownEnter={openDropdown}
            onDropdownLeave={scheduleCloseDropdown}
            onDropdownToggle={toggleDropdown}
            onDropdownNavigate={closeAllDropdowns}
            onSubmenuToggle={onSubmenuToggle}
            onSubmenuEnter={onSubmenuEnter}
            onSubmenuLeave={onSubmenuLeave}
            createLocaleUrl={createLocaleUrlHelper}
            pathname={pathname}
            locale={locale}
            cartItemCount={cartState.itemCount}
            showCart={showCart}
            footerHelper={footerHelper}
            footerContactCta={footerContactCta}
          />

          {/* Mobile Navigation */}
          <MobileNavigation
            menuItems={menuItems}
            mobileMenuOpen={mobileMenuOpen}
            onToggleMobileMenu={toggleMobileMenu}
            onCloseMobileMenu={closeMobileMenu}
            createLocaleUrl={createLocaleUrlHelper}
            pathname={pathname}
            locale={locale}
            cartItemCount={cartState.itemCount}
            showCart={showCart}
          />
        </div>
      </div>
    </header>
  );
}
