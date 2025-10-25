import React from 'react'

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-10">
                <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 justify-between">
                    <div className="text-center lg:text-left">
                        <div className="text-lg sm:text-xl font-semibold">altmanGpt</div>
                        <div className="text-white/60 text-xs sm:text-sm">Built by Srajan Gupta • All rights reserved</div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <a href="mailto:creation2224@gmail.com" className="text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">Email</a>
                        <span className="text-white/20">•</span>
                        <a href="https://github.com/creation22" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">GitHub</a>
                        <span className="text-white/20">•</span>
                        <a href="https://www.linkedin.com/in/ssrajangupta22/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">LinkedIn</a>
                        <span className="text-white/20">•</span>
                        <a href="https://twitter.com/_creation22" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white transition-colors min-h-[44px] flex items-center">Twitter</a>
                    </div>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://buymeacoffee.com/creation22"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors min-h-[44px]"
                        >
                            <span>☕ Buy me a coffee</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer