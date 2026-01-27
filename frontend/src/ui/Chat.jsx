import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Check } from 'lucide-react';

// ==========================================
// 1. CONFIGURATION & STYLES
// ==========================================

const API_URL = 'http://localhost:3000/ask'; // Updated to localhost for dev, change back for prod if needed

const TOOLS = [
  { id: 'standard', name: 'Talk Like Sam', description: 'Direct answers based on Sam Altman\'s writing.' },
  { id: 'stress-tester', name: 'Idea Stress Tester', description: 'Brutally honest critique of your startup idea.' },
  { id: 'mvp-reducer', name: 'MVP Scope Reducer', description: 'Cut 80% of features to find the core value.' },
  { id: 'regret-min', name: 'Regret Minimizer', description: 'Project yourself to age 80 to make decisions.' },
  { id: 'investor-sim', name: 'Investor Simulator', description: 'Face tough questions from a skeptical VC.' },
  { id: 'email-writer', name: 'Founder Email Writer', description: 'Write cold emails that actually get opened.' },
];

const GlobalStyles = () => (
  <style>{`
    :root {
      --bg-color: #050505;
      --surface-1: #141414;
      --surface-2: #1c1c1c;
      --border-color: #333333;
      --text-primary: #ededed;
      --text-secondary: #888888;
      --accent-user: #333;
      --accent-ai: #10b981;
      --font-stack: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif;
    }

    * { box-sizing: border-box; }
    
    body { 
      margin: 0; 
      background: var(--bg-color); 
      font-family: var(--font-stack);
      -webkit-font-smoothing: antialiased;
    }

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Utilities */
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--surface-2); border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #444; }

    /* Voice Pulse */
    @keyframes pulse-red {
      0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
      100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `}</style>
);

// ==========================================
// 2. CUSTOM HOOKS (LOGIC)
// ==========================================

const useScrollToBottom = (dependency) => {
  const bottomRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dependency]);

  return bottomRef;
};

const useChatLogic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeModeId = searchParams.get('mode') || 'standard';

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper to set mode both in state and URL
  const setMode = useCallback((newModeId) => {
    setSearchParams({ mode: newModeId });
  }, [setSearchParams]);

  // Reset chat when mode changes
  useEffect(() => {
    const getWelcomeMessage = (mode) => {
      switch (mode) {
        case 'stress-tester': return "YC Partner Mode activated. Pitch me your startup idea. I'll tell you why it might fail.";
        case 'mvp-reducer': return "I'm your ruthless PM. Tell me all the features you 'think' you need, and I'll cut 80% of them.";
        case 'regret-min': return "Let's project to age 80. What decision is weighing on you today?";
        case 'investor-sim': return "I'm a partner at Sequoia. I've only got 5 minutes. What's the opportunity?";
        case 'email-writer': return "Who are you emailing and what do you want? I'll draft something they'll actually read.";
        default: return "I focus on direct answers based on my writing and thinking. What's on your mind?";
      }
    };

    setMessages([{
      id: Date.now(),
      text: getWelcomeMessage(activeModeId),
      isUser: false,
      timestamp: new Date(),
    }]);
  }, [activeModeId]);

  // Initialize Session ID
  const [sessionId] = useState(() => {
    try {
      const key = 'altmangpt_session_id';
      const existing = sessionStorage.getItem(key);
      if (existing) return existing;
      const newId = crypto.randomUUID();
      sessionStorage.setItem(key, newId);
      return newId;
    } catch {
      return crypto.randomUUID();
    }
  });

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), text, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, sessionId, mode: activeModeId }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.answer || 'Error: No response.',
          isUser: false,
          timestamp: new Date()
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: 'Connection error. Please try again.', isUser: false, timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [sessionId, activeModeId]);

  return { messages, loading, sendMessage, mode: activeModeId, setMode };
};

// ==========================================
// 3. PRESENTATIONAL COMPONENTS
// ==========================================

const Avatar = ({ isUser }) => (
  <div style={{
    width: '32px', height: '32px', borderRadius: '50%',
    background: isUser ? 'linear-gradient(135deg, #333, #000)' : 'linear-gradient(135deg, #10b981, #047857)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.7rem', fontWeight: '700', color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0, marginBottom: '4px'
  }}>
    {isUser ? 'ME' : 'AI'}
  </div>
);

const MessageBubble = React.memo(({ text, isUser, timestamp }) => (
  <div style={{
    display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row',
    alignItems: 'flex-end', gap: '12px', marginBottom: '1.5rem',
    maxWidth: '100%', animation: 'fadeIn 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
  }}>
    <Avatar isUser={isUser} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
      <div style={{
        background: isUser ? '#1c1c1c' : 'transparent',
        color: 'var(--text-primary)',
        padding: isUser ? '12px 18px' : '0 12px 8px 0',
        borderRadius: isUser ? '20px 20px 4px 20px' : '0',
        border: isUser ? '1px solid var(--border-color)' : 'none',
        fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap'
      }}>
        {text}
      </div>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', margin: isUser ? '4px 4px 0 0' : '4px 0 0 2px' }}>
        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  </div>
));

const ToolSelector = ({ activeMode, setMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTool = TOOLS.find(t => t.id === activeMode) || TOOLS[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-white min-w-[160px] justify-between"
      >
        <span className="truncate">{currentTool.name}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#141414] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1">
            {TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  setMode(tool.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors flex items-start gap-3 group ${activeMode === tool.id ? 'bg-white/5' : ''}`}
              >
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium mb-0.5 ${activeMode === tool.id ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'}`}>
                    {tool.name}
                  </div>
                  <div className="text-xs text-gray-400 leading-snug">
                    {tool.description}
                  </div>
                </div>
                {activeMode === tool.id && <Check size={14} className="text-emerald-400 mt-1" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = ({ loading, messages, mode, setMode }) => {
  const handleCopy = () => {
    if (!messages || messages.length === 0) return;
    const text = messages.map(m => `${m.isUser ? 'User' : 'AI'}: ${m.text}`).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('Conversation copied to clipboard');
  };

  return (
    <header style={{
      padding: '1.25rem 0', borderBottom: '1px solid var(--surface-2)',
      background: 'rgba(5, 5, 5, 0.8)', backdropFilter: 'blur(10px)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 10, paddingLeft: '1.5rem', paddingRight: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: loading ? '#fbbf24' : '#10b981',
            boxShadow: loading ? '0 0 8px rgba(251, 191, 36, 0.4)' : 'none',
            animation: loading ? 'pulse 1.5s infinite' : 'none'
          }} />
          <span style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '-0.02em', display: 'none', md: { display: 'block' } }} className="hidden md:block">
            AltmanGPT
          </span>
        </div>

        {/* Tool Selector Dropdown */}
        <div className="h-6 w-px bg-white/10 hidden md:block"></div>
        <ToolSelector activeMode={mode} setMode={setMode} />
      </div>

      <button
        onClick={handleCopy}
        className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs font-medium"
      >
        Copy Chat
      </button>
    </header>
  );
};

const ChatInput = ({ onSend, loading }) => {
  const [value, setValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue((prev) => prev ? prev + " " + transcript : transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  const handleSend = () => {
    if (value.trim() && !loading) {
      onSend(value);
      setValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ padding: '1.5rem', background: 'linear-gradient(to top, #050505 80%, transparent)' }}>
      <div style={{
        maxWidth: '800px', margin: '0 auto', background: '#141414',
        border: '1px solid #333', borderRadius: '16px', display: 'flex',
        alignItems: 'flex-end', padding: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask something meaningful..."
          style={{
            flex: 1, background: 'transparent', border: 'none', color: '#fff',
            fontSize: '1rem', padding: '12px 16px', resize: 'none', outline: 'none',
            minHeight: '48px', maxHeight: '150px', lineHeight: '1.5', fontFamily: 'inherit'
          }}
        />

        <button
          onClick={handleVoice}
          style={{
            background: isListening ? '#ef4444' : 'rgba(255,255,255,0.05)',
            color: isListening ? '#fff' : '#888',
            border: 'none', padding: '10px', cursor: 'pointer',
            marginRight: '8px', marginBottom: '4px', borderRadius: '50%',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px',
            animation: isListening ? 'pulse-red 1.5s infinite' : 'none',
            boxShadow: isListening ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none'
          }}
          title="Voice Input"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
          </svg>
        </button>

        <button
          onClick={handleSend}
          disabled={!value.trim() || loading}
          style={{
            background: value.trim() && !loading ? '#fff' : '#222',
            color: value.trim() && !loading ? '#000' : '#555',
            border: 'none', borderRadius: '10px', height: '36px', padding: '0 16px',
            fontSize: '0.85rem', fontWeight: '600', cursor: value.trim() ? 'pointer' : 'default',
            marginBottom: '6px', marginRight: '6px', transition: 'all 0.2s'
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
      <div style={{ textAlign: 'center', color: '#444', fontSize: '0.75rem', marginTop: '12px' }}>
        AI generated content can be inaccurate.
      </div>
    </div>
  );
};

const ChatUI = () => {
  const { messages, loading, sendMessage, mode, setMode } = useChatLogic();
  const bottomRef = useScrollToBottom(messages);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <GlobalStyles />
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', height: '100vh' }}>

        <Header loading={loading} messages={messages} mode={mode} setMode={setMode} />

        <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '2rem 1.5rem' }}>
          {messages.length === 1 && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px', justifyContent: 'center' }}>
              {(mode === 'stress-tester' ? ["My AI software idea...", "Food delivery for pets...", "Uber for babysitters..."] :
                mode === 'mvp-reducer' ? ["Social network with video calls, marketplace, and stories...", "AI dating app with VR support..."] :
                  mode === 'regret-min' ? ["Should I quit my job to start a company?", "Should I move to San Francisco?"] :
                    mode === 'investor-sim' ? ["Pitching a B2B SaaS for law firms...", "D2C personalized vitamins..."] :
                      mode === 'email-writer' ? ["Cold email to YC partner...", "Follow up with angel investor..."] :
                /* Standard */["How do I start a startup?", "Should I sell my company?", "What is the future of AI?", "How to hire great people?"]
              ).map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '20px', padding: '8px 16px', color: '#ccc', fontSize: '0.8rem',
                    cursor: 'pointer', transition: 'background 0.2s'
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
          {loading && (
            <div style={{ paddingLeft: '48px', color: '#666', fontSize: '0.9rem', animation: 'pulse 1s infinite' }}>
              Thinking...
            </div>
          )}
          <div ref={bottomRef} style={{ height: '1px' }} />
        </div>

        <ChatInput onSend={sendMessage} loading={loading} />

      </div>
    </div>
  );
};

export default ChatUI;