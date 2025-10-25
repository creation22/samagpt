import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';

const ChatUI = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to help answer your questions in Sam Altman's style. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

const firstRender = useRef(true);

useEffect(() => {
  if (firstRender.current) {
    firstRender.current = false; // skip initial scroll
    return;
  }
  scrollToBottom(); // scroll only when messages update after initial mount
}, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          text: "That's an interesting question. Based on my writing style, I'd emphasize the importance of focusing on what truly matters and executing with intensity.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // align top
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>
      <Navbar />
      {/* Chat Container */}
      <div style={{
        width: '100%',
        maxWidth: '900px',
        height: '85vh',
        marginTop: '6rem', // space below navbar
        background: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              color: '#ffffff',
              letterSpacing: '-0.03em'
            }}>
              altmangpt
            </div>
            <div style={{
              fontSize: '0.8rem',
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.5)',
              marginLeft: 'auto'
            }}>
              Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '2rem',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 100%)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  maxWidth: '80%',
                  flexDirection: message.isUser ? 'row-reverse' : 'row'
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: message.isUser
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    color: '#ffffff',
                    flexShrink: 0
                  }}>
                    {message.isUser ? 'Y' : 'AI'}
                  </div>

                  {/* Message Bubble */}
                  <div style={{
                    background: message.isUser
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                    padding: '1rem 1.25rem',
                    borderRadius: '18px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    animation: 'fadeInUp 0.3s ease-out'
                  }}>
                    <div style={{
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      fontWeight: '300',
                      lineHeight: '1.5',
                      letterSpacing: '-0.01em'
                    }}>
                      {message.text}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginTop: '0.5rem',
                      fontWeight: '300'
                    }}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-end'
          }}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything in Sam Altman's style..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '1rem 1.25rem',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
                fontWeight: '300',
                resize: 'none',
                outline: 'none',
                minHeight: '56px',
                maxHeight: '120px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              style={{
                background: inputValue.trim()
                  ? 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: inputValue.trim() ? '#000000' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                borderRadius: '14px',
                padding: '1rem 1.5rem',
                fontSize: '0.95rem',
                fontWeight: '400',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
                height: '56px',
                minWidth: '80px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px -5px rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim()) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              Send
            </button>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.4)',
            fontWeight: '300',
            textAlign: 'center',
            marginTop: '1rem'
          }}>
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>

      <style>{`
        textarea::placeholder {
          color: rgba(255, 255, 255, 0.3);
          font-weight: 300;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default ChatUI;
