'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './CartProvider';
import { CONFIG } from '@/lib/config';
import {
  BagIcon,
  CloseIcon,
  HoneycombMark,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
} from './Icons';
import SearchModal from './SearchModal';

const LINKS = [
  { href: '/', label: 'Home', index: '01' },
  { href: '/shop', label: 'Shop', index: '02' },
  { href: '/our-story', label: 'Our Story', index: '03' },
  { href: '/our-process', label: 'Our Process', index: '04' },
  { href: '/contact', label: 'Contact', index: '05' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, openCart, bump, hydrated } = useCart();
  const [bumped, setBumped] = useState(false);
  const menuRef = useRef(null);

  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.classList.add('is-locked');
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    menuRef.current?.querySelector('a')?.focus();
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!bump) return;
    setBumped(true);
    const t = window.setTimeout(() => setBumped(false), 520);
    return () => window.clearTimeout(t);
  }, [bump]);

  const navClass = ['nav', isHome ? '' : 'is-solid', scrolled ? 'is-scrolled' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={navClass}>
        <div className="container nav__inner">
          <Link href="/" className="nav__brand" aria-label="Rather Honey — home">
            <HoneycombMark className="nav__mark" size={38} />
            <span className="nav__wordmark">
              <b>Rather Honey</b>
              <span>Kashmir</span>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="nav__links">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav__link"
                    aria-current={
                      link.href === '/' ? (pathname === '/' ? 'page' : undefined) : pathname.startsWith(link.href) ? 'page' : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav__actions">
            <button
              type="button"
              className="icon-btn"
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon size={20} />
            </button>
            <Link href="/account" className="icon-btn" aria-label="Your account">
              <UserIcon size={20} />
            </Link>
            <button
              type="button"
              className="icon-btn cart-btn"
              aria-label={`Shopping bag, ${hydrated ? count : 0} item${count === 1 ? '' : 's'}`}
              onClick={openCart}
            >
              <BagIcon size={20} />
              <span
                className={`cart-btn__count${hydrated && count > 0 ? ' is-visible' : ''}${bumped ? ' is-bumped' : ''}`}
                aria-hidden="true"
              >
                {count}
              </span>
            </button>
            <button
              type="button"
              className="nav__burger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        ref={menuRef}
        aria-hidden={!menuOpen}
        {...(menuOpen ? { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Site menu' } : {})}
      >
        <div className="mobile-menu__top">
          <span className="eyebrow eyebrow--light">Menu</span>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            <CloseIcon size={22} />
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul className="mobile-menu__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mobile-menu__link"
                  tabIndex={menuOpen ? 0 : -1}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                  <small>{link.index}</small>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/account" className="mobile-menu__link" tabIndex={menuOpen ? 0 : -1}>
                Account
                <small>06</small>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mobile-menu__foot">
          <a href={`mailto:${CONFIG.contact.email}`}>
            <MailIcon size={16} style={{ display: 'inline', marginRight: 8 }} />
            {CONFIG.contact.email}
          </a>
          <a href={`tel:${CONFIG.contact.phoneRaw}`}>
            <PhoneIcon size={16} style={{ display: 'inline', marginRight: 8 }} />
            {CONFIG.contact.phone}
          </a>
          <div className="mobile-menu__social">
            <a href={CONFIG.social.instagram} target="_blank" rel="noreferrer noopener">
              <InstagramIcon size={14} style={{ display: 'inline', marginRight: 6 }} />
              Instagram
            </a>
            <span>{CONFIG.origin.village}, {CONFIG.origin.district}</span>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
