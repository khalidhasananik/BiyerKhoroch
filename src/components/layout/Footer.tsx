import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>৳</span>
              <span className="font-semibold text-[var(--text)]">BiyerKahini</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Real wedding costs from real couples across Bangladesh. All submissions are anonymous and free.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Explore</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/search", label: "Browse Stories" },
                { href: "/search?sort=highest", label: "Highest Cost" },
                { href: "/search?sort=lowest", label: "Lowest Cost" },
                { href: "/analytics", label: "Statistics" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-[var(--accent)] transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contribute */}
          <div>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text)" }}>Contribute</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/submit", label: "Share Your Story" },
                { href: "/submit#how-it-works", label: "How It Works" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover:text-[var(--accent)] transition-colors"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <p>© {year} BiyerKahini · All submissions are anonymous</p>
          <p>Built for Bangladesh 🇧🇩</p>
        </div>
      </div>
    </footer>
  );
}
