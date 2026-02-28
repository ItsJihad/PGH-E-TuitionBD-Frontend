import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import UseAuth from "../../hooks/UseAuth";
import { SiEducative } from "react-icons/si";

function Headerbar() {
  const { currentUser, LoggOut } = UseAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  /* =========================
     THEME INITIAL LOAD
  ========================= */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  /* =========================
     THEME TOGGLE
  ========================= */
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  /* =========================
     SCROLL EFFECT
  ========================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tuitions", path: "/tuitions" },
    { name: "Tutors", path: "/tutors" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-base-100 shadow-md border-b border-base-content/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight  flex gap-2.5 items-center"
          >
            <SiEducative></SiEducative>
            eTuition
            <span className="bg-gradient-to-r  from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Bd
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-base-content font-medium hover:text-primary hover:font-semibold transition group"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-base-200 hover:cursor-pointer transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Auth Section */}
            {currentUser ? (
              <div className="relative hidden lg:block group">
                <img
                  src={
                    currentUser.photoURL ||
                    "https://ui-avatars.com/api/?name=User&background=0f172a&color=fff"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute right-0 mt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-base-100 border border-base-content/10 rounded-2xl shadow-xl overflow-hidden">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-sm text-base-content hover:bg-base-200 transition"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={LoggOut}
                      className="w-full text-left px-4 py-3 text-sm text-base-content hover:bg-base-200 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/signin"
                className="hidden lg:inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-primary-content font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            )}

            {/* Burger */}
            <button
              className="lg:hidden text-base-content"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= OVERLAY ================= */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full bg-base-100 border-l border-base-content/10 shadow-2xl relative overflow-hidden">
          <div className="relative p-8 flex flex-col h-full">

            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-10">
              <span className="text-lg font-bold text-base-content">
                Menu
              </span>

              <div className="flex gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-base-200 transition"
                >
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>

                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-base-200 transition"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-6 text-lg font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="text-base-content hover:text-primary hover:font-semibold transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex-1"></div>

            {/* Auth Mobile */}
            <div className="pt-8 border-t border-base-content/10">
              {currentUser ? (
                <>
                  
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm text-base-content hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      LoggOut();
                      setMobileOpen(false);
                    }}
                    className="block py-3 text-sm text-left w-full text-base-content hover:text-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center h-12 w-full rounded-xl bg-primary text-primary-content font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Headerbar;