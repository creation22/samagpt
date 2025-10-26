import React, { useState, useRef, useEffect } from 'react';

// MessageBubble Component
const MessageBubble = React.memo(({ text, isUser, timestamp }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: '0.5rem',
        maxWidth: '85%',
        marginBottom: '0.75rem',
      }}
      className="message-bubble"
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: isUser
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: '600',
          color: '#fff',
          flexShrink: 0,
        }}
        className="avatar"
      >
        {isUser ? 'me' : 'sama'}
      </div>

      <div
        style={{
          background: isUser
            ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
          padding: '0.875rem 1.125rem',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: '300',
            lineHeight: '1.6',
            letterSpacing: '-0.01em',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'rgba(255, 255, 255, 0.35)',
            marginTop: '0.5rem',
            fontWeight: '300',
            textAlign: 'right',
          }}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
});

// ChatHeader Component
const ChatHeader = ({ loading }) => (
  <div
    style={{
      padding: '1rem 1.25rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255,255,255,0.02)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}
    className="chat-header"
  >
    <div
      style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: loading 
          ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        animation: loading ? 'pulse 1.5s ease-in-out infinite' : 'none',
        boxShadow: loading 
          ? '0 0 12px rgba(251, 191, 36, 0.6)' 
          : '0 0 12px rgba(16, 185, 129, 0.6)',
      }}
    />
    <div
      style={{
        fontSize: '1.25rem',
        fontWeight: '400',
        color: '#ffffff',
        letterSpacing: '-0.02em',
      }}
      className="header-title"
    >
      AltmanGpt
    </div>
    <div
      style={{
        fontSize: '0.75rem',
        fontWeight: '300',
        color: 'rgba(255, 255, 255, 0.5)',
        marginLeft: 'auto',
      }}
      className="status-text"
    >
      {loading ? 'Thinking...' : 'Online'}
    </div>
  </div>
);

// ChatInput Component
const ChatInput = ({ inputValue, setInputValue, handleSend, loading }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [inputValue]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        padding: '1rem 1.25rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.02)',
      }}
      className="chat-input-container"
    >
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything in Sam Altman's style..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '14px',
            padding: '0.875rem 1rem',
            color: '#fff',
            fontSize: '0.9rem',
            fontFamily: 'inherit',
            fontWeight: '300',
            resize: 'none',
            outline: 'none',
            minHeight: '48px',
            maxHeight: '120px',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(12px)',
          }}
          className="message-input"
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || loading}
          style={{
            background:
              inputValue.trim() && !loading
                ? 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)'
                : 'rgba(255, 255, 255, 0.08)',
            color: inputValue.trim() && !loading ? '#000' : 'rgba(255,255,255,0.25)',
            border: 'none',
            borderRadius: '12px',
            padding: '0.875rem 1.25rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            cursor: inputValue.trim() && !loading ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
            height: '48px',
            minWidth: '70px',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backdropFilter: 'blur(12px)',
            boxShadow: inputValue.trim() && !loading 
              ? '0 4px 12px rgba(255, 255, 255, 0.2)' 
              : 'none',
          }}
          className="send-button"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
      <div
        style={{
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.35)',
          fontWeight: '300',
          textAlign: 'center',
          marginTop: '0.75rem',
        }}
        className="input-hint"
      >
        Press Enter to send • Shift+Enter for new line
      </div>
    </div>
  );
};

// Main ChatUI Component
const ChatUI = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Recommended: Focus on meaningful questions. Skip small talk. Get direct answers from Sam Altman's writing and thinking.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const firstRender = useRef(true);

  const [sessionId] = useState(() => {
    const storageKey = 'altmangpt_session_id';
    try {
      const existing = sessionStorage.getItem(storageKey);
      if (existing) return existing;
      const newId = crypto.randomUUID();
      sessionStorage.setItem(storageKey, newId);
      return newId;
    } catch {
      return crypto.randomUUID();
    }
  });

  const scrollToBottom = (smooth = true) => {
    const container = messagesEndRef.current;
    if (!container) return;
    const parent = container.parentElement;
    if (!parent) return;

    const isNearBottom = parent.scrollHeight - parent.scrollTop - parent.clientHeight < 150;
    if (isNearBottom || smooth) {
      container.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'end' });
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    setLoading(true);
    try {
      const res = await fetch('https://samagpt.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: messageText, sessionId }),
      });
      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: data.answer, isUser: false, timestamp: new Date() },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: 'Error: No response from AI.', isUser: false, timestamp: new Date() },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: 'Error connecting to backend.', isUser: false, timestamp: new Date() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = { id: messages.length + 1, text: inputValue, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    const userInput = inputValue;
    setInputValue('');
    sendMessage(userInput);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#000',
        padding: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '100vh',
          background: 'rgba(0,0,0,0.95)',
          border: 'none',
          borderRadius: '0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
        }}
        className="chat-container"
      >
        <ChatHeader loading={loading} />
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%)',
            WebkitOverflowScrolling: 'touch',
          }}
          className="messages-container"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
            {loading && (
              <div style={{ 
                color: 'rgba(255,255,255,0.45)', 
                fontStyle: 'italic', 
                textAlign: 'left',
                fontSize: '0.85rem',
                paddingLeft: '0.5rem',
                animation: 'fadeInUp 0.3s ease-out'
              }}>
                Sam Altman is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatInput inputValue={inputValue} setInputValue={setInputValue} handleSend={handleSend} loading={loading} />
      </div>

      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        
        textarea::placeholder { 
          color: rgba(255,255,255,0.3); 
          font-weight: 300; 
        }
        
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .messages-container::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.02);
        }
        
        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        .messages-container::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.15);
        }
        
        /* Tablet and Desktop styles */
        @media (min-width: 768px) {
          .chat-container {
            height: 88vh !important;
            margin: 2rem 0 !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            border-radius: 24px !important;
          }
          
          .message-bubble {
            max-width: 75% !important;
          }
          
          .chat-header {
            padding: 1.5rem 2rem !important;
          }
          
          .chat-input-container {
            padding: 1.5rem 2rem !important;
          }
          
          .messages-container {
            padding: 2rem !important;
          }
          
          .header-title {
            font-size: 1.5rem !important;
          }
          
          .avatar {
            width: 40px !important;
            height: 40px !important;
            font-size: 0.8rem !important;
          }
          
          .message-input {
            font-size: 0.95rem !important;
            padding: 1rem 1.25rem !important;
            min-height: 56px !important;
          }
          
          .send-button {
            height: 56px !important;
            min-width: 80px !important;
            padding: 1rem 1.5rem !important;
            font-size: 0.95rem !important;
          }
          
          .send-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(255, 255, 255, 0.25) !important;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 767px) {
          .chat-container {
            border-radius: 0 !important;
          }
          
          .input-hint {
            font-size: 0.65rem !important;
          }
          
          .status-text {
            display: none;
          }
        }
        
        /* Small mobile devices */
        @media (max-width: 374px) {
          .message-bubble {
            max-width: 90% !important;
          }
          
          .avatar {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.7rem !important;
          }
          
          .header-title {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatUI;