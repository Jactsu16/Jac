import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/portfolio", label: "Portafolio" },
  { href: "/admin", label: "Panel", accent: true }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav
        className={clsx(
          "mx-auto flex w-[min(1100px,90%)] items-center justify-between rounded-full border border-primary-200 bg-white px-6 transition-all duration-500 backdrop-blur",
          scrolled ? "shadow-xl" : "shadow-lg"
        )}
      >
        <Link to="/" className="flex items-center gap-3 py-2">
          <div className="flex flex-col">
            <span className="font-name text-sm tracking-wide text-primary-700">Jamileth Jackelinne</span>
            <span className="text-xs text-primary-500">Buyer & Portfolio Suite</span>
          </div>
        </Link>
        <div className="hidden items-center gap-4 text-sm font-semibold text-primary-700 sm:flex">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                clsx(
                  "rounded-full px-4 py-2 transition",
                  isActive 
                    ? link.accent 
                      ? "bg-accent1-500 text-white" 
                      : "bg-primary-500 text-white"
                    : link.accent
                      ? "hover:bg-accent1-50 text-accent1-500"
                      : "hover:bg-primary-50"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="sm:hidden">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Menú
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
