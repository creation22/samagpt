import React from "react";

const steps = [
  {
    title: "Ask a Question",
    description: "Type your question in the input box to start the conversation.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "AI Processes",
    description: "Our AI analyzes your query using Sam Altman's blogs and writings for style.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Get Answer",
    description: "Receive a response that mimics Sam Altman's tone and style.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Share & Learn",
    description: "Optionally share your insights or refine your question for better answers.",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const WorkingSection = () => {
  return (
    <div className="w-full bg-black text-white py-32 px-4 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }
        
        .card-glow {
          position: relative;
          overflow: hidden;
        }
        
        .card-glow::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          border-radius: 1.5rem;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .card-glow:hover::before {
          opacity: 1;
        }
        
        .step-number {
          font-family: 'Georgia', serif;
          font-weight: 300;
          font-size: 5rem;
          position: absolute;
          top: -1rem;
          right: 1rem;
          opacity: 0.05;
          line-height: 1;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <div className="inline-block mb-6">
            <span className="text-sm tracking-[0.3em] uppercase text-gray-500 font-light">
              Process
            </span>
          </div>
          <h2 className="text-6xl md:text-7xl font-light mb-6 tracking-tight gradient-text" style={{ fontFamily: "'Inter', sans-serif" }}>
            How It Works
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Interact with our AI to get answers in Sam Altman's conversational style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`
              }}
            >
              <div className="card-glow shimmer-effect bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 h-full flex flex-col items-center text-center transition-all duration-500 hover:border-gray-700 hover:-translate-y-2 relative z-10">
                <div className="step-number">{(index + 1).toString().padStart(2, '0')}</div>
                
                <div className="mb-6 text-white opacity-80 group-hover:opacity-100 transition-all duration-300 animate-float">
                  {step.icon}
                </div>
                
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
                
                <h3 className="text-2xl font-light mb-4 tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {step.title}
                </h3>
                
                <p className="text-gray-400 font-light leading-relaxed text-sm">
                  {step.description}
                </p>
                
                <div className="mt-6 w-full h-1 bg-gray-800 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-full bg-gradient-to-r from-gray-600 to-white w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 text-sm font-light">
            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse"></div>
            <span className="tracking-wider">Powered by Advanced AI Technology</span>
            <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingSection; 