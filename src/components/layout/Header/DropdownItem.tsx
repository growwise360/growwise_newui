import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { DropdownItem as DropdownItemType, SubmenuItem } from './types';
import { ICON_MAP } from './constants';
import { isSubmenuItemPathActive } from './utils';

interface DropdownItemProps {
  item: DropdownItemType;
  isActive: boolean;
  hasSubmenu: boolean;
  isSubmenuOpen: boolean;
  onItemClick: () => void;
  onSubmenuToggle: (key: string) => void;
  onSubmenuEnter: (key: string) => void;
  onSubmenuLeave: (key: string) => void;
  createLocaleUrl: (path: string) => string;
  pathname: string | null;
  locale: string;
  openSubmenus: { [key: string]: boolean };
  variant: 'blue' | 'orange';
}

export default function DropdownItem({
  item,
  isActive,
  hasSubmenu,
  isSubmenuOpen,
  onItemClick,
  onSubmenuToggle,
  onSubmenuEnter,
  onSubmenuLeave,
  createLocaleUrl,
  pathname,
  locale,
  openSubmenus,
  variant,
}: DropdownItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP] || ICON_MAP.Calculator;
  const colors = {
    blue: { primary: '#1F396D', secondary: '#F16112' },
    orange: { primary: '#F16112', secondary: '#1F396D' },
  }[variant];

  const isHighlighted = isActive || (hasSubmenu && isSubmenuOpen) || isHovered;
  const isAcademicSummer = item.emphasis === 'academicSummer';

  /** Flyout parent with a real destination: title navigates; chevron toggles grades. */
  const submenuWithHubLink = hasSubmenu && Boolean(item.href?.trim());
  const hubHref = submenuWithHubLink ? createLocaleUrl(item.href) : null;

  const handleSubmenuOnlyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmenuToggle(item.key);
  };

  const rowMouseHandlers = {
    onMouseEnter: () => {
      setIsHovered(true);
      if (hasSubmenu) {
        onSubmenuEnter(item.key);
      }
    },
    onMouseLeave: () => {
      setIsHovered(false);
      if (hasSubmenu) {
        onSubmenuLeave(item.key);
      }
    },
  };

  const linkClassName = isAcademicSummer
    ? `group mx-2 my-0.5 rounded-md transition-all duration-300 cursor-pointer outline-none w-full block border border-[#F16112]/30 bg-gradient-to-br from-[#fff7ed] to-white ${
        isHighlighted ? 'shadow-sm ring-1 ring-[#F16112]/20' : 'hover:bg-[#fff7ed]'
      }`
    : `group mx-2 my-0.5 rounded-xl transition-all duration-300 cursor-pointer border-0 outline-none w-full ${
        isHighlighted
          ? 'bg-gradient-to-r from-[#1F396D]/10 to-[#F16112]/10 text-[#1F396D] shadow-inner'
          : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 text-gray-700'
      }`;

  const rowBody = (
    <>
      <div
        className={`relative p-2.5 rounded-xl transition-all duration-300 ${
          isHighlighted
            ? `bg-gradient-to-r ${item.gradient} shadow-lg`
            : isAcademicSummer
              ? 'bg-[#F16112]/10 group-hover:bg-[#F16112]/15'
              : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-gray-100'
        }`}
      >
        <IconComponent
          className={`w-5 h-5 transition-colors duration-300 ${
            isHighlighted
              ? 'text-white'
              : isAcademicSummer
                ? 'text-[#1F396D]'
                : 'text-gray-600 group-hover:text-gray-700'
          }`}
        />
      </div>

      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`font-semibold text-base transition-colors duration-300 flex items-center flex-wrap gap-1.5 ${
              isAcademicSummer ? 'text-[#1F396D]' : 'text-gray-900'
            }`}
          >
            {item.title}
            {item.badge ? (
              <span className="inline-flex items-center rounded-full bg-[#F16112] px-1.5 py-0.5 text-[9px] font-semibold leading-none text-white">
                {item.badge}
              </span>
            ) : null}
          </span>
        </div>
        <p
          className={`text-sm mt-1 transition-colors duration-300 ${
            isAcademicSummer ? 'text-slate-600' : 'text-gray-500 group-hover:text-gray-600'
          }`}
        >
          {item.description}
        </p>
      </div>
    </>
  );

  const chevronButton = hasSubmenu ? (
    <button
      type="button"
      aria-expanded={isSubmenuOpen}
      aria-label={`${isSubmenuOpen ? 'Hide' : 'Show'} ${item.title} grade levels`}
      className="shrink-0 p-2 mr-1 rounded-lg text-gray-400 hover:text-[#1F396D] hover:bg-gray-100 transition-colors"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmenuToggle(item.key);
      }}
    >
      <ChevronRight
        className={`w-4 h-4 transition-all duration-300 ${
          isSubmenuOpen ? 'text-[#1F396D] translate-x-0.5' : 'group-hover:translate-x-0.5'
        }`}
      />
    </button>
  ) : null;

  return (
    <div className="relative">
      {submenuWithHubLink && hubHref ? (
        <div className={`group flex items-center w-full ${linkClassName}`} {...rowMouseHandlers}>
          <Link href={hubHref} onClick={onItemClick} className="flex flex-1 items-center gap-4 px-4 py-2 min-w-0">
            {rowBody}
          </Link>
          {chevronButton}
        </div>
      ) : (
        <Link
          href={hasSubmenu ? '#' : createLocaleUrl(item.href)}
          onClick={hasSubmenu ? handleSubmenuOnlyClick : onItemClick}
          className={linkClassName}
          {...rowMouseHandlers}
        >
          <div className="flex items-center gap-4 px-4 py-2 w-full">
            {rowBody}
            {hasSubmenu && !submenuWithHubLink ? (
              <ChevronRight
                className={`w-4 h-4 transition-all duration-300 shrink-0 ${
                  isSubmenuOpen
                    ? 'text-[#1F396D] transform translate-x-1'
                    : 'text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1'
                }`}
              />
            ) : null}
          </div>
        </Link>
      )}

      {hasSubmenu && item.submenuItems && isSubmenuOpen ? (
        <Submenu
          parentItem={item}
          items={item.submenuItems}
          onItemClick={onItemClick}
          onSubmenuEnter={onSubmenuEnter}
          onSubmenuLeave={onSubmenuLeave}
          onSubmenuToggle={onSubmenuToggle}
          createLocaleUrl={createLocaleUrl}
          pathname={pathname}
          locale={locale}
          openSubmenus={openSubmenus}
          colors={colors}
        />
      ) : null}
    </div>
  );
}

interface SubmenuProps {
  parentItem: DropdownItemType;
  items: SubmenuItem[];
  onItemClick: () => void;
  onSubmenuEnter: (key: string) => void;
  onSubmenuLeave: (key: string) => void;
  onSubmenuToggle: (key: string) => void;
  createLocaleUrl: (path: string) => string;
  pathname: string | null;
  locale: string;
  openSubmenus: { [key: string]: boolean };
  colors: { primary: string; secondary: string };
}

function Submenu({
  parentItem,
  items,
  onItemClick,
  onSubmenuEnter,
  onSubmenuLeave,
  onSubmenuToggle,
  createLocaleUrl,
  pathname,
  locale,
  openSubmenus,
  colors,
}: SubmenuProps) {
  const headerTitle = parentItem.submenuHeaderTitle ?? parentItem.title;
  const headerSubtitle = parentItem.submenuHeaderSubtitle ?? 'Select your subject';

  return (
    <div
      className="absolute left-full top-0 ml-2 w-72 bg-white border-2 border-gray-200 shadow-[0px_20px_60px_rgba(31,57,109,0.2)] rounded-2xl overflow-visible ring-1 ring-gray-200 z-[55]"
      onMouseEnter={() => onSubmenuEnter(parentItem.key)}
      onMouseLeave={() => onSubmenuLeave(parentItem.key)}
    >
      <div className="px-4 py-3 bg-gradient-to-r from-[#1F396D]/5 to-[#F16112]/5 border-b border-gray-100 rounded-t-2xl overflow-hidden">
        {parentItem.href ? (
          <Link
            href={createLocaleUrl(parentItem.href)}
            onClick={onItemClick}
            className="block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#1F396D]/40"
          >
            <div className="font-semibold text-gray-900 text-sm hover:text-[#1F396D]">
              {headerTitle}
            </div>
            <p className="text-xs text-gray-600 mt-0.5">{headerSubtitle}</p>
          </Link>
        ) : (
          <>
            <div className="font-semibold text-gray-900 text-sm">{headerTitle}</div>
            <p className="text-xs text-gray-600 mt-0.5">{headerSubtitle}</p>
          </>
        )}
      </div>

      <div className="py-1 overflow-visible rounded-b-2xl bg-white">
        {items
          .filter((subItem) => subItem.visible !== false)
          .map((subItem, subIndex) => (
            <SubmenuItemRow
              key={subItem.key ?? subItem.title}
              subItem={subItem}
              subIndex={subIndex}
              totalItems={items.filter((i) => i.visible !== false).length}
              onItemClick={onItemClick}
              onSubmenuEnter={onSubmenuEnter}
              onSubmenuLeave={onSubmenuLeave}
              onSubmenuToggle={onSubmenuToggle}
              createLocaleUrl={createLocaleUrl}
              pathname={pathname}
              locale={locale}
              openSubmenus={openSubmenus}
              colors={colors}
            />
          ))}
      </div>
    </div>
  );
}

interface SubmenuItemRowProps {
  subItem: SubmenuItem;
  subIndex: number;
  totalItems: number;
  onItemClick: () => void;
  onSubmenuEnter: (key: string) => void;
  onSubmenuLeave: (key: string) => void;
  onSubmenuToggle: (key: string) => void;
  createLocaleUrl: (path: string) => string;
  pathname: string | null;
  locale: string;
  openSubmenus: { [key: string]: boolean };
  colors: { primary: string; secondary: string };
}

function SubmenuItemRow({
  subItem,
  subIndex,
  totalItems,
  onItemClick,
  onSubmenuEnter,
  onSubmenuLeave,
  onSubmenuToggle,
  createLocaleUrl,
  pathname,
  locale,
  openSubmenus,
  colors,
}: SubmenuItemRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const itemKey = subItem.key ?? subItem.title;
  const hasNested = Boolean(subItem.hasSubmenu && subItem.submenuItems?.length);
  const isNestedOpen = hasNested && openSubmenus[itemKey];
  const isActive = isSubmenuItemPathActive(subItem, pathname, locale);
  const isHighlighted = isActive || isHovered || (hasNested && isNestedOpen);

  const SubIconComponent =
    ICON_MAP[subItem.icon as keyof typeof ICON_MAP] || ICON_MAP.Calculator;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasNested) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSubmenuToggle(itemKey);
    }
  };

  const rowContent = (
    <div className="flex items-center gap-3 px-4 py-2 w-full">
      <div
        className={`p-2 rounded-lg transition-all duration-300 ${
          isHighlighted
            ? `bg-gradient-to-r ${subItem.gradient} shadow-md`
            : 'bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-gray-200 group-hover:to-gray-100'
        }`}
      >
        <SubIconComponent
          className={`w-4 h-4 transition-colors duration-300 ${
            isHighlighted ? 'text-white' : 'text-gray-600'
          }`}
        />
      </div>

      <div className="flex-1 text-left">
        <span
          className={`font-semibold text-sm block ${
            isHighlighted ? 'text-[#1F396D]' : 'text-gray-900'
          }`}
        >
          {subItem.title}
        </span>
        <p
          className={`text-xs mt-0.5 ${
            isHighlighted ? 'text-[#1F396D]/70' : 'text-gray-500'
          }`}
        >
          {subItem.description}
        </p>
      </div>

      {hasNested ? (
        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
            isNestedOpen ? 'text-[#1F396D] translate-x-1' : 'text-gray-400'
          }`}
        />
      ) : null}
    </div>
  );

  return (
    <div className="relative">
      {hasNested ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => {
            setIsHovered(true);
            onSubmenuEnter(itemKey);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            onSubmenuLeave(itemKey);
          }}
          onClick={(e) => {
            e.preventDefault();
            onSubmenuToggle(itemKey);
          }}
          className={`group mx-2 my-0.5 rounded-xl transition-all duration-300 cursor-pointer w-full block ${
            isHighlighted
              ? 'bg-gradient-to-r from-[#1F396D]/10 to-[#F16112]/10 shadow-inner'
              : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50'
          }`}
        >
          {rowContent}
        </div>
      ) : (
        <Link
          href={createLocaleUrl(subItem.href)}
          onClick={onItemClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`group mx-2 my-0.5 rounded-xl transition-all duration-300 cursor-pointer border-0 outline-none w-full block ${
            isHighlighted
              ? 'bg-gradient-to-r from-[#1F396D]/10 to-[#F16112]/10 shadow-inner'
              : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50'
          }`}
        >
          {rowContent}
        </Link>
      )}

      {hasNested && isNestedOpen && subItem.submenuItems ? (
        <>
          <div
            className="absolute top-0 left-full h-full w-2 bg-transparent z-[65]"
            aria-hidden
            onMouseEnter={() => onSubmenuEnter(itemKey)}
          />
          <NestedSubmenuPanel
            parentItem={subItem}
            items={subItem.submenuItems}
            onItemClick={onItemClick}
            onSubmenuEnter={onSubmenuEnter}
            onSubmenuLeave={onSubmenuLeave}
            createLocaleUrl={createLocaleUrl}
            pathname={pathname}
            locale={locale}
            colors={colors}
            itemKey={itemKey}
          />
        </>
      ) : null}

      {subIndex < totalItems - 1 ? (
        <div className="mx-4 border-b border-gray-100" aria-hidden />
      ) : null}
    </div>
  );
}

interface NestedSubmenuPanelProps {
  parentItem: SubmenuItem;
  items: SubmenuItem[];
  onItemClick: () => void;
  onSubmenuEnter: (key: string) => void;
  onSubmenuLeave: (key: string) => void;
  createLocaleUrl: (path: string) => string;
  pathname: string | null;
  locale: string;
  colors: { primary: string; secondary: string };
  itemKey: string;
}

function NestedSubmenuPanel({
  parentItem,
  items,
  onItemClick,
  onSubmenuEnter,
  onSubmenuLeave,
  createLocaleUrl,
  pathname,
  locale,
  colors,
  itemKey,
}: NestedSubmenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [flipLeft, setFlipLeft] = useState(false);
  const headerTitle = parentItem.submenuHeaderTitle ?? parentItem.title;
  const headerSubtitle = parentItem.submenuHeaderSubtitle ?? 'Grades 1–12';

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setFlipLeft(rect.right > window.innerWidth - 8);
  }, []);

  return (
    <div
      ref={panelRef}
      className={`absolute top-0 w-72 bg-white border-2 border-gray-200 shadow-[0px_20px_60px_rgba(31,57,109,0.2)] rounded-2xl overflow-visible ring-1 ring-gray-200 z-[70] ${
        flipLeft ? 'right-full mr-2 left-auto' : 'left-full ml-2'
      }`}
      onMouseEnter={() => onSubmenuEnter(itemKey)}
      onMouseLeave={() => onSubmenuLeave(itemKey)}
    >
      <div className="px-4 py-3 bg-gradient-to-r from-[#1F396D]/5 to-[#F16112]/5 border-b border-gray-100">
        <div className="font-semibold text-gray-900 text-sm">{headerTitle}</div>
        <p className="text-xs text-gray-600 mt-0.5">{headerSubtitle}</p>
      </div>

      <div className="py-1">
        {items
          .filter((nested) => nested.visible !== false)
          .map((nested, nestedIndex) => {
            const NestedIcon =
              ICON_MAP[nested.icon as keyof typeof ICON_MAP] || ICON_MAP.Calculator;
            const isNestedActive = isSubmenuItemPathActive(nested, pathname, locale);

            return (
              <Link
                key={nested.key ?? nested.title}
                href={createLocaleUrl(nested.href)}
                onClick={onItemClick}
                className={`group mx-2 my-0.5 rounded-xl transition-all duration-300 cursor-pointer block w-[calc(100%-1rem)] ${
                  isNestedActive
                    ? 'bg-gradient-to-r from-[#1F396D]/10 to-[#F16112]/10 shadow-inner'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50'
                }`}
              >
                <div className="flex items-center gap-3 px-4 py-2">
                  <div
                    className={`p-2 rounded-lg ${
                      isNestedActive
                        ? `bg-gradient-to-r ${nested.gradient}`
                        : 'bg-gray-100'
                    }`}
                  >
                    <NestedIcon
                      className={`w-4 h-4 ${isNestedActive ? 'text-white' : 'text-gray-600'}`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <span
                      className={`font-semibold text-sm block ${
                        isNestedActive ? 'text-[#1F396D]' : 'text-gray-900'
                      }`}
                    >
                      {nested.title}
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">{nested.description}</p>
                  </div>
                </div>
                {nestedIndex < items.filter((i) => i.visible !== false).length - 1 ? (
                  <div className="mx-4 border-b border-gray-100" aria-hidden />
                ) : null}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
