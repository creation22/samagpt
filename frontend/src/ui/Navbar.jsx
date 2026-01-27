import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logOut } from "../firebase";

const TOOLS = [
  { id: 'stress-tester', name: 'Idea Stress Tester' },
  { id: 'mvp-reducer', name: 'MVP Scope Reducer' },
  { id: 'regret-min', name: 'Regret Minimizer' },
  { id: 'investor-sim', name: 'Investor Simulator' },
  { id: 'email-writer', name: 'Founder Email Writer' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();
  const toolsRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToolClick = (modeId) => {
    navigate(`/chat?mode=${modeId}`);
    setIsToolsOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-2 sm:mt-4 rounded-xl bg-white/10 backdrop-blur border border-white/10 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white">
            {/* Left side logo */}
            <div className="text-xl sm:text-2xl font-light tracking-tight cursor-pointer" onClick={() => navigate('/')}>
              AltmanGpt
            </div>

            {/* Right side navigation (desktop) */}
            <div className="hidden md:flex items-center gap-4">

              {/* Tools Dropdown */}
              <div className="relative" ref={toolsRef}>
                <button
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-transparent hover:bg-white/10 text-white transition-colors text-sm font-medium"
                >
                  Tools
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isToolsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col py-1">
                    {TOOLS.map((tool) => (
                      <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        className="text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {tool.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate("/chat")}
                className="px-4 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors text-sm font-medium"
              >
                Chat
              </button>
              <a
                href="https://twitter.com/_creation22"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-md border border-white/20 hover:border-white/40 text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Twitter
              </a>
              {user ? (
                <div className="flex items-center gap-3 ml-2">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-white/20"
                    title={user.displayName}
                  />
                  <button
                    onClick={logOut}
                    className="px-4 py-1.5 rounded-md border border-red-500/50 text-red-200 hover:bg-red-500/20 transition-colors text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="px-4 py-1.5 rounded-md bg-white text-black hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Sign In
                </button>
              )}
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
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 px-3">Tools</div>
                {TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleToolClick(tool.id)}
                    className="text-left px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    {tool.name}
                  </button>
                ))}
                <div className="h-px bg-white/10 my-1"></div>

                <button
                  onClick={() => {
                    navigate("/chat");
                    setIsMenuOpen(false);
                  }}
                  className="block w-full px-3 py-2 rounded-md bg-white/20 hover:bg-white/30 text-white transition-colors text-center text-sm font-medium"
                >
                  Chat
                </button>
                <a
                  href="https://twitter.com/_creation22"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-3 py-2 rounded-md border border-white/20 hover:border-white/40 text-white/90 hover:text-white transition-colors text-center text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Twitter
                </a>
                {user ? (
                  <button
                    onClick={() => {
                      logOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 rounded-md border border-red-500/50 text-red-200 hover:bg-red-500/20 transition-colors text-center text-sm font-medium"
                  >
                    Sign Out ({user.displayName?.split(' ')[0]})
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      signInWithGoogle();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full px-3 py-2 rounded-md bg-white text-black hover:bg-gray-200 transition-colors text-center text-sm font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
