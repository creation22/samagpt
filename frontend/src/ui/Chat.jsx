import React, { useState, useRef, useEffect, useCallback } from 'react';

// MessageBubble Component
const MessageBubble = React.memo(({ text, isUser, timestamp }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: '0.75rem',
        maxWidth: '80%',
        marginBottom: '0.5rem',
      }}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isUser
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: '600',
          color: '#fff',
          flexShrink: 0,
        }}
      >
        {isUser ? 'me' : 'sama'}
      </div>

      <div
        style={{
          background: isUser
            ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          padding: '1rem 1.25rem',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          animation: 'fadeInUp 0.3s ease-out',
        }}
      >
        <div
          style={{
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: '300',
            lineHeight: '1.5',
            letterSpacing: '-0.01em',
            whiteSpace: 'pre-wrap',
          }}
        >
          {text}
        </div>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.4)',
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
      padding: '1.5rem 2rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'rgba(255,255,255,0.02)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    }}
  >
    <div
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
        animation: 'pulse 2s ease-in-out infinite',
      }}
    />
    <div
      style={{
        fontSize: '1.5rem',
        fontWeight: '300',
        color: '#ffffff',
        letterSpacing: '-0.03em',
      }}
    >
      AltmanGpt
    </div>
    <div
      style={{
        fontSize: '0.8rem',
        fontWeight: '300',
        color: 'rgba(255, 255, 255, 0.5)',
        marginLeft: 'auto',
      }}
    >
      {loading ? 'Thinking...' : 'Online'}
    </div>
  </div>
);

// ChatInput Component
const ChatInput = ({ inputValue, setInputValue, handleSend, loading }) => {
  const textareaRef = useRef(null);

  // Auto-expand textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
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
        padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.02)',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything in Sam Altman's style..."
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            color: '#fff',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            fontWeight: '300',
            resize: 'none',
            outline: 'none',
            minHeight: '56px',
            maxHeight: '120px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || loading}
          style={{
            background:
              inputValue.trim() && !loading
                ? 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)'
                : 'rgba(255, 255, 255, 0.1)',
            color: inputValue.trim() && !loading ? '#000' : 'rgba(255,255,255,0.3)',
            border: 'none',
            borderRadius: '14px',
            padding: '1rem 1.5rem',
            fontSize: '0.95rem',
            fontWeight: '400',
            cursor: inputValue.trim() && !loading ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
            height: '56px',
            minWidth: '80px',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
          }}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
      <div
        style={{
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.4)',
          fontWeight: '300',
          textAlign: 'center',
          marginTop: '1rem',
        }}
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
       text: "Recommended: Focus on meaningful questions. Skip small talk. Get direct answers from Sam Altman’s writing and thinking.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const firstRender = useRef(true);

  const [sessionId] = useState(() => {
    const existing = localStorage.getItem('sessionId');
    if (existing) return existing;
    const newId = crypto.randomUUID();
    localStorage.setItem('sessionId', newId);
    return newId;
  });

  const scrollToBottom = (smooth = true) => {
    const container = messagesEndRef.current;
    if (!container) return;
    const parent = container.parentElement;
    if (!parent) return;

    const isNearBottom = parent.scrollHeight - parent.scrollTop - parent.clientHeight < 100;
    if (isNearBottom || smooth) {
      container.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
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
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '85vh',
          marginTop: '6rem',
          background: 'rgba(0,0,0,0.8)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
      >
        <ChatHeader loading={loading} />
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2rem',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} text={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
            {loading && (
              <div style={{ color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', textAlign: 'left' }}>
                Sam Altman is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <ChatInput inputValue={inputValue} setInputValue={setInputValue} handleSend={handleSend} loading={loading} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        textarea::placeholder { color: rgba(255,255,255,0.3); font-weight: 300; }
      `}</style>
    </div>
  );
};

export default ChatUI;
