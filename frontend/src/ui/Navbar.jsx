import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-2 sm:mt-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white">
            {/* Left side logo */}
            <div className="text-xl sm:text-2xl font-bold">altmanGpt</div>

            {/* Right side navigation (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate("/chat")}
                className="px-4 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors text-sm"
              >
                Chat
              </button>
              <a
                href="https://twitter.com/sama"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-md border border-white/20 hover:border-white/40 text-white/90 hover:text-white transition-colors text-sm"
              >
                Twitter
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden px-4 pb-4 bg-white/5 rounded-b-lg border-t border-white/10">
              <div className="flex flex-col gap-2 pt-3">
                <button
                  onClick={() => {
                    navigate("/chat");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors text-center text-sm"
                >
                  Chat
                </button>
                <a
                  href="https://twitter.com/sama"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-3 py-2 rounded-md border border-white/20 hover:border-white/40 text-white/90 hover:text-white transition-colors text-center text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Twitter
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
