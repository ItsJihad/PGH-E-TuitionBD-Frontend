import { Link } from "react-router";
import { Mail, Phone, Facebook, Linkedin } from "lucide-react";

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 px-2">

      {/* Card Container */}
      <div className="
        bg-base-100/80
        backdrop-blur-xl
        
        
        shadow-md
        px-6 py-6
      ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-base-content">
              eTuition<span className="text-primary">Bd</span>
            </h3>

            <p className="text-sm text-base-content/70">
              Smart tuition management platform
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link
              to="/"
              className="text-base-content/70 hover:text-primary transition"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-base-content/70 hover:text-primary transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-base-content/70 hover:text-primary transition"
            >
              Support
            </Link>
          </div>

          {/* Social + Contact */}
          <div className="flex items-center gap-3">

            <a
              href="mailto:support@etuitionbd.com"
              className="p-2 rounded-xl bg-base-200 hover:bg-primary/10 transition"
            >
              <Mail size={16} className="text-primary" />
            </a>

            <a
              href="tel:+8801234567890"
              className="p-2 rounded-xl bg-base-200 hover:bg-primary/10 transition"
            >
              <Phone size={16} className="text-primary" />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-base-200 hover:bg-primary/10 transition"
            >
              <Facebook size={16} className="text-primary" />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-base-200 hover:bg-primary/10 transition"
            >
              <Linkedin size={16} className="text-primary" />
            </a>

          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 pt-4 border-t border-base-300 text-center text-xs text-base-content/60">
          © {currentYear} eTuitionBd — All rights reserved.
        </div>
      </div>

    </footer>
  );
}