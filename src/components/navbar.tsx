"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, BookOpen, User, LogOut, LayoutDashboard, ShoppingBag, ShoppingCart, Settings } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useCart } from "@/lib/CartContext";
import { signOut } from "@/lib/auth/client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Booklist" },
  { href: "/categories", label: "Categories" },
];

const userNavLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "Booklist" },
  { href: "/categories", label: "Categories" },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
];

const adminNavLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/books", label: "Manage Books", icon: BookOpen },
  { href: "/admin/orders", label: "Manage Orders", icon: ShoppingBag },
  { href: "/admin/users", label: "Manage Users", icon: User },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = (user as { role?: string } | undefined)?.role === "admin";

  if (isLoading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-accent" aria-label="LibRay Home">
              <span className="text-3xl font-bold gradient-text">LibRay</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-20 h-8 bg-card-border rounded-lg animate-pulse" />
              <div className="w-24 h-8 bg-card-border rounded-lg animate-pulse" />
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-accent hover:opacity-80 transition-opacity" aria-label="LibRay Home">
            <span className="text-3xl font-bold gradient-text">LibRay</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  adminNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                        pathname === link.href
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <link.icon className="w-4 h-4" aria-hidden="true" />
                      {link.label}
                    </Link>
                  ))
                ) : (
                  userNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                        pathname === link.href
                          ? "text-accent"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {link.icon && <link.icon className="w-4 h-4" aria-hidden="true" />}
                      {link.label}
                    </Link>
                  ))
                )}
              </>
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {!isAdmin && (
                  <Link
                    href="/cart"
                    className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                    aria-label={`Cart with ${itemCount} items`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-dark text-xs font-bold rounded-full flex items-center justify-center">
                        {itemCount > 99 ? "99+" : itemCount}
                      </span>
                    )}
                  </Link>
                )}
                <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-card-border hover:bg-card-hover transition-all duration-200"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-semibold text-sm">
                      {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-foreground">
                    {user?.name || "User"}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-card-border rounded-xl shadow-xl py-2 z-50 animate-slide-down">
                      <div className="px-4 py-3 border-b border-card-border">
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        {isAdmin && <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded-full">Admin</span>}
                      </div>
                      {isAdmin ? (
                        adminNavLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                          >
                            <link.icon className="w-4 h-4" aria-hidden="true" />
                            {link.label}
                          </Link>
                        ))
                      ) : (
                        <>
                          {userNavLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                            >
                              {link.icon && <link.icon className="w-4 h-4" aria-hidden="true" />}
                              {link.label}
                            </Link>
                          ))}
                          <Link
                            href="/cart"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                            Cart
                            {itemCount > 0 && (
                              <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-accent/20 text-accent rounded-full">
                                {itemCount}
                              </span>
                            )}
                          </Link>
                        </>
                      )}
                      <hr className="my-2 border-card-border" />
                      <button
                        onClick={async () => {
                          await signOut();
                          router.push("/");
                          router.refresh();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" aria-hidden="true" />
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="btn-ghost hidden sm:inline-flex"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="btn-primary hidden sm:inline-flex"
                >
                  Get Started
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="py-4 space-y-2 border-t border-card-border">
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 bg-card-hover rounded-lg mx-4">
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {isAdmin && <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded-full">Admin</span>}
                </div>
                {(isAdmin ? adminNavLinks : userNavLinks).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-4 transition-colors ${
                      pathname === link.href
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                    }`}
                  >
                    {link.icon && <link.icon className="w-5 h-5" aria-hidden="true" />}
                    {link.label}
                  </Link>
                ))}
                {!isAdmin && (
                  <Link
                    href="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-4 transition-colors ${
                      pathname === "/cart"
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                    Cart
                    {itemCount > 0 && (
                      <span className="ml-auto px-2 py-0.5 text-xs font-bold bg-accent/20 text-accent rounded-full">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                )}
                <button
                  onClick={async () => {
                    await signOut();
                    router.push("/");
                    router.refresh();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg mx-4 text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg mx-4 transition-colors ${
                      pathname === link.href
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 pt-4 space-y-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-secondary w-full text-center block">
                    Sign In
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary w-full text-center block">
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}