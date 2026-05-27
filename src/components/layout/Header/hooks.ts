import { useState, useRef, useEffect } from 'react';
import { DropdownState } from './types';
import { DROPDOWN_CLOSE_DELAY } from './constants';

/** When a parent flyout closes, these nested submenu keys close too. */
const NESTED_SUBMENU_CHILDREN: Record<string, readonly string[]> = {};

export function submenuKeysToClose(key: string): string[] {
  return [key, ...(NESTED_SUBMENU_CHILDREN[key] ?? [])];
}

export function useDropdownState() {
  const [openDropdowns, setOpenDropdowns] = useState<DropdownState>({});
  const [openSubmenus, setOpenSubmenus] = useState<DropdownState>({});
  const dropdownTimeouts = useRef<{ [key: string]: number | null }>({});

  const clearTimeoutRef = (key: string) => {
    if (dropdownTimeouts.current[key]) {
      window.clearTimeout(dropdownTimeouts.current[key]!);
      dropdownTimeouts.current[key] = null;
    }
  };

  const openDropdown = (key: string) => {
    clearTimeoutRef(key);
    setOpenDropdowns(prev => ({ ...prev, [key]: true }));
  };

  const scheduleCloseDropdown = (key: string) => {
    clearTimeoutRef(key);
    dropdownTimeouts.current[key] = window.setTimeout(() => {
      setOpenDropdowns(prev => ({ ...prev, [key]: false }));
      setOpenSubmenus({});
    }, DROPDOWN_CLOSE_DELAY);
  };

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const closeDropdown = (key: string) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: false }));
  };

  const openSubmenu = (key: string) => {
    clearTimeoutRef(`submenu-${key}`);
    submenuKeysToClose(key).forEach((nestedKey) => {
      clearTimeoutRef(`submenu-${nestedKey}`);
    });

    setOpenSubmenus((prev) => ({ ...prev, [key]: true }));
  };

  const closeSubmenu = (key: string) => {
    setOpenSubmenus((prev) => {
      const next = { ...prev };
      submenuKeysToClose(key).forEach((k) => {
        next[k] = false;
      });
      return next;
    });
  };

  const scheduleCloseSubmenu = (key: string) => {
    const timeoutKey = `submenu-${key}`;
    clearTimeoutRef(timeoutKey);
    dropdownTimeouts.current[timeoutKey] = window.setTimeout(() => {
      setOpenSubmenus((prev) => {
        const next = { ...prev };
        submenuKeysToClose(key).forEach((k) => {
          next[k] = false;
        });
        return next;
      });
    }, DROPDOWN_CLOSE_DELAY);
  };

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeAllDropdowns = () => {
    setOpenDropdowns({});
    setOpenSubmenus({});
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.keys(dropdownTimeouts.current).forEach(key => {
        clearTimeoutRef(key);
      });
    };
  }, []);

  return {
    openDropdowns,
    openSubmenus,
    openDropdown,
    scheduleCloseDropdown,
    toggleDropdown,
    closeDropdown,
    openSubmenu,
    closeSubmenu,
    scheduleCloseSubmenu,
    toggleSubmenu,
    closeAllDropdowns,
    onSubmenuToggle: toggleSubmenu,
    onSubmenuEnter: openSubmenu,
    onSubmenuLeave: scheduleCloseSubmenu
  };
}

export function useMobileMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu
  };
}
