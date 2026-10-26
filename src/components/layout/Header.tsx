"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { mainNav, siteConfig, contactHref } from "@/data/site-config";
import { megaMenu, serviceCategories, serviceHref } from "@/data/services";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const megaOpenRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Close menus whenever the route changes.
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 160);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape + outside click handling.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
      if (mobileOpen) {
        setMobileOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (megaOpen && headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [megaOpen, mobileOpen]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    mobileRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    megaOpenRef.current = megaOpen;
  }, [megaOpen]);

  const openMega = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    if (!megaOpenRef.current) hoverOpenedAt.current = Date.now();
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 160);
  }, []);

  const focusFirstMegaLink = () => {
    requestAnimationFrame(() => megaRef.current?.querySelector<HTMLElement>("a")?.focus());
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      ref={headerRef}
      onBlur={(e) => {
        if (megaOpen && !e.currentTarget.contains(e.relatedTarget as Node)) setMegaOpen(false);
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "container-x relative z-10 px-3! transition-transform duration-500 ease-expo motion-safe:animate-[header-in_0.95s_var(--ease-expo)_both] sm:px-5! lg:px-8!",
          hidden && !megaOpen && !mobileOpen && "-translate-y-[115%]",
        )}
      >
        <div
          className={cn(
            "relative rounded-b-[22px] bg-white/95 backdrop-blur-xl transition-shadow duration-300",
            scrolled || megaOpen
              ? "shadow-[0_0_0_1px_rgb(11_17_36/0.06),0_18px_40px_-22px_rgb(8_13_31/0.45)]"
              : "shadow-[0_0_0_1px_rgb(11_17_36/0.05),0_16px_36px_-26px_rgb(8_13_31/0.35)]",
          )}
        >
          <div className="flex h-[68px] items-center justify-between gap-4 pr-2.5 pl-5 lg:h-[76px] lg:pr-3 lg:pl-7">
            <Logo priority />

            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {mainNav.map((item) =>
                  "mega" in item && item.mega ? (
                    <li key={item.href} onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                      <button
                        ref={triggerRef}
                        type="button"
                        aria-expanded={megaOpen}
                        aria-controls="mega-menu"
                        onClick={() => {
                          // A click right after hover-opening should keep the menu open, not toggle it shut.
                          if (Date.now() - hoverOpenedAt.current < 600) return;
                          setMegaOpen((o) => !o);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setMegaOpen(true);
                            focusFirstMegaLink();
                          }
                        }}
                        className={cn(
                          "inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-[14px] font-medium whitespace-nowrap transition-colors xl:px-4 xl:text-[15px]",
                          megaOpen || isActive(item.href) ? "bg-ink/[0.05] text-ink" : "text-ink/75 hover:text-ink",
                        )}
                      >
                        {item.label}
                        <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")} />
                      </button>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "inline-flex h-11 items-center rounded-full px-3 text-[14px] font-medium whitespace-nowrap transition-colors xl:px-4 xl:text-[15px]",
                          isActive(item.href) ? "text-ink" : "text-ink/75 hover:text-ink",
                        )}
                      >
                        <span className="relative">
                          {item.label}
                          {isActive(item.href) && <span aria-hidden="true" className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-electric" />}
                        </span>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={contactHref(undefined, "header")}
                data-track="header-lets-talk"
                className="group hidden h-12 items-center gap-2 rounded-[16px] bg-ink pr-2 pl-5 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-electric sm:inline-flex"
              >
                {siteConfig.cta.primary}
                <span className="grid size-8 place-items-center rounded-full bg-white/12 transition-transform duration-300 ease-expo group-hover:rotate-45">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
              <button
                ref={menuBtnRef}
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                onClick={() => setMobileOpen((o) => !o)}
                className="grid size-12 place-items-center rounded-[14px] bg-ink/[0.05] text-ink lg:hidden"
              >
                {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* ---------- Desktop mega menu ---------- */}
          <div
            id="mega-menu"
            ref={megaRef}
            onMouseEnter={openMega}
            onMouseLeave={scheduleClose}
            hidden={!megaOpen}
            className="absolute inset-x-0 top-full hidden pt-3 lg:block"
          >
            {megaOpen && <MegaMenuPanel onNavigate={() => setMegaOpen(false)} />}
          </div>
        </div>
      </div>

      {/* ---------- Mobile menu ---------- */}
      <div
        id="mobile-menu"
        ref={mobileRef}
        hidden={!mobileOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
        className="fixed inset-0 overflow-y-auto overscroll-contain bg-midnight/45 px-3 pt-[70px] pb-6 backdrop-blur-sm sm:px-5 lg:hidden"
      >
        {mobileOpen && <MobileMenu isActive={isActive} onNavigate={() => setMobileOpen(false)} />}
      </div>
    </header>
  );
}

function MegaMenuPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="animate-[mega-in_0.45s_var(--ease-expo)_both] overflow-hidden rounded-[24px] bg-white shadow-[0_0_0_1px_rgb(11_17_36/0.06),0_40px_80px_-30px_rgb(8_13_31/0.45)]">
      <div className="grid grid-cols-5 gap-x-6 px-8 pt-8 pb-6">
        {megaMenu.map((group, gi) => {
          const cat = serviceCategories.find((c) => c.id === group.category)!;
          return (
            <div key={group.category} className="animate-[mega-in_0.5s_var(--ease-expo)_both]" style={{ animationDelay: `${60 + gi * 45}ms` }}>
              <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-electric uppercase">
                <Icon name={cat.icon} className="size-3.5" />
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={serviceHref(link.service, link.anchor)}
                      onClick={onNavigate}
                      className="group flex items-center gap-2.5 rounded-xl px-2 py-2 -mx-2 text-[14px] leading-tight font-medium text-ink/80 transition-colors hover:bg-cloud hover:text-ink focus-visible:bg-cloud"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ink/[0.04] text-ink/60 transition-colors group-hover:bg-electric group-hover:text-white">
                        <Icon name={link.icon} className="size-3.5" />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-6 border-t border-ink/[0.06] bg-cloud px-8 py-4">
        <p className="text-sm text-muted">
          Not sure where to start? <span className="text-ink">Talk to an engineer about your challenge.</span>
        </p>
        <div className="flex items-center gap-2">
          <Link href={contactHref(undefined, "mega-menu")} onClick={onNavigate} data-track="mega-menu-contact" className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-ink hover:text-electric">
            Book a consultation
          </Link>
          <Link
            href="/services"
            onClick={onNavigate}
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-electric"
          >
            Explore all services
            <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ isActive, onNavigate }: { isActive: (href: string) => boolean; onNavigate: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="mt-2 animate-[mega-in_0.4s_var(--ease-expo)_both] rounded-[24px] bg-white p-3 shadow-[0_0_0_1px_rgb(11_17_36/0.06),0_30px_60px_-30px_rgb(8_13_31/0.5)]">
      <nav aria-label="Mobile navigation">
        <ul className="divide-y divide-ink/[0.06]">
          {mainNav.map((item, i) =>
            "mega" in item && item.mega ? (
              <li key={item.href} className="animate-[mega-in_0.45s_var(--ease-expo)_both]" style={{ animationDelay: `${i * 40}ms` }}>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services"
                  onClick={() => setServicesOpen((o) => !o)}
                  className="flex w-full items-center justify-between px-3 py-4 font-display text-2xl font-semibold tracking-[-0.03em]"
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" className={cn("size-5 transition-transform", servicesOpen && "rotate-180")} />
                </button>
                <div id="mobile-services" hidden={!servicesOpen} className="pb-3">
                  <Link href="/services" onClick={onNavigate} className="mx-3 mb-2 flex items-center justify-between rounded-2xl bg-cloud px-4 py-3 text-[15px] font-semibold">
                    All services <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  {megaMenu.map((group) => {
                    const open = openGroup === group.category;
                    return (
                      <div key={group.category} className="px-3">
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`m-${group.category}`}
                          onClick={() => setOpenGroup(open ? null : group.category)}
                          className="flex w-full items-center justify-between py-3 text-left text-[15px] font-semibold text-ink/85"
                        >
                          {group.title}
                          <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
                        </button>
                        <ul id={`m-${group.category}`} hidden={!open} className="mb-2 space-y-1 border-l-2 border-electric/30 pl-3">
                          {group.links.map((link) => (
                            <li key={link.label}>
                              <Link href={serviceHref(link.service, link.anchor)} onClick={onNavigate} className="flex items-center gap-2.5 py-2 text-[15px] text-ink/75">
                                <Icon name={link.icon} className="size-4 text-electric" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </li>
            ) : (
              <li key={item.href} className="animate-[mega-in_0.45s_var(--ease-expo)_both]" style={{ animationDelay: `${i * 40}ms` }}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("flex items-center justify-between px-3 py-4 font-display text-2xl font-semibold tracking-[-0.03em]", isActive(item.href) && "text-electric")}
                >
                  {item.label}
                  <ArrowRight aria-hidden="true" className="size-5 opacity-40" />
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="mt-2 grid gap-2 p-1">
        <Link
          href={contactHref(undefined, "mobile-menu")}
          onClick={onNavigate}
          data-track="mobile-lets-talk"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-electric text-base font-semibold text-white"
        >
          {siteConfig.cta.primary} <ArrowUpRight aria-hidden="true" className="size-5" />
        </Link>
        {siteConfig.email && (
          <a href={`mailto:${siteConfig.email}`} className="py-2 text-center text-sm text-muted">
            {siteConfig.email}
          </a>
        )}
      </div>
    </div>
  );
}
