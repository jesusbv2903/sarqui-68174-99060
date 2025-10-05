
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import BrandLogo from "./BrandLogo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.viajes, path: "/viajes" },
    { name: t.nav.explore, path: "/explore" },
    { name: t.nav.about, path: "/about" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);
  
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-white/80 dark:bg-card/80 backdrop-blur-lg py-3 shadow-md" : "bg-transparent py-5")}>
      <nav className="container flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <BrandLogo />
          <LanguageSelector />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map(link => <li key={link.name} className="relative">
              <Link to={link.path} className="font-medium transition-colors hover:text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
                {link.name}
              </Link>
            </li>)}
        </ul>

        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          {user ? (
            <>
              <Button asChild variant="ghost" size="icon" className="rounded-full">
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                onClick={() => signOut()}
                variant="outline" 
                className="rounded-full px-6 py-2.5 font-medium"
              >
                {t.nav.logout}
              </Button>
            </>
          ) : (
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 py-2.5 font-medium">
              <Link to="/auth">{t.nav.login}</Link>
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn("fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300", mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <div className={cn("fixed inset-y-0 right-0 w-3/4 max-w-sm bg-card shadow-xl p-6 transition-transform duration-300 ease-in-out", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex justify-between mb-8">
                <LanguageSelector />
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="space-y-6">
                {navLinks.map(link => <li key={link.name}>
                    <Link to={link.path} className="text-lg font-medium transition-colors hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                      {link.name}
                    </Link>
                  </li>)}
              </ul>
            </div>
            
            {user ? (
              <div className="space-y-3 mt-6">
                <Button asChild className="w-full" variant="outline">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    {t.nav.profile}
                  </Link>
                </Button>
                <Button 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  {t.nav.logout}
                </Button>
              </div>
            ) : (
              <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6 py-2.5 font-medium mt-6">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  {t.nav.login}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>;
}
