"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Browse" },
  { href: "/submit", label: "Submit" },
  { href: "/analytics", label: "Stats" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[var(--text)] hover:opacity-80 transition-opacity"
          aria-label="BiyerKahini home"
        >
          <span
            className="text-xl font-bold"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          >
            ৳
          </span>
          <span className="text-base font-semibold tracking-tight">
            BiyerKahini
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                color: pathname === link.href ? "var(--accent)" : "var(--text-muted)",
                backgroundColor:
                  pathname === link.href ? "var(--surface)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 h-5 w-px" style={{ backgroundColor: "var(--border)" }} aria-hidden="true" />
          <ThemeToggle />
          <Link
            href="/submit"
            className="ml-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: "var(--accent)",
              color: "#ffffff",
            }}
          >
            Share Story
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="p-2 rounded-md transition-colors hover:bg-[var(--surface)]"
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-4 pb-4 pt-2 flex flex-col gap-1"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                color: pathname === link.href ? "var(--accent)" : "var(--text)",
                backgroundColor:
                  pathname === link.href ? "var(--surface)" : "transparent",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-3 py-2 rounded-md text-sm font-medium text-center"
            style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
          >
            Share Your Story
          </Link>
        </div>
      )}
    </header>
  );
}
