import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const FUNDRAISE_DATA = [
    {
        id: 1,
        name: "Cursor",
        amount: "$60M Series A",
        tag: "DevTools",
        insight: "AI coding assistants are moving from autocomplete to autonomous agents.",
        date: "Aug 2024"
    },
    {
        id: 2,
        name: "Perplexity",
        amount: "$73M Series B",
        tag: "AI Search",
        insight: "Search is being unbundled by vertical LLMs focused on direct answers.",
        date: "Oct 2024"
    },
    {
        id: 3,
        name: "Linear",
        amount: "$35M Series B",
        tag: "Productivity",
        insight: "Quality, speed, and opinionated software are still highly defensible moats.",
        date: "Sep 2024"
    },
    {
        id: 4,
        name: "Groq",
        amount: "$640M Series D",
        tag: "Hardware",
        insight: "Inference speed is the next bottleneck for real-time voice and agentic AI.",
        date: "Nov 2024"
    },
    {
        id: 5,
        name: "Supabase",
        amount: "$80M Series C",
        tag: "Infrastructure",
        insight: "The open-source alternative to Firebase continues to win developer mindshare.",
        date: "Dec 2024"
    }
];

const FundraiseCard = ({ data }) => (
    <div className="group relative p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-medium text-white group-hover:text-emerald-400 transition-colors">
                    {data.name}
                </h3>
                <p className="text-sm text-emerald-400/90 font-medium mt-1">
                    {data.amount}
                </p>
            </div>
            <span className="px-3 py-1 text-xs font-medium text-white/60 bg-white/5 rounded-full border border-white/5">
                {data.tag}
            </span>
        </div>

        <div className="mb-4">
            <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-white/10 pl-3 italic">
                "{data.insight}"
            </p>
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
            <span className="text-xs text-gray-600 font-mono">
                {data.date}
            </span>
            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        </div>
    </div>
);

const RecentFundraises = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
                        Signal in the Noise
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl font-light">
                        Curated fundraises that signal where the market is actually moving.
                        Less hype, more insight.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FUNDRAISE_DATA.map((fundraise) => (
                        <FundraiseCard key={fundraise.id} data={fundraise} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-600">
                        Data is illustrative for the SamaGPT demo.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RecentFundraises;
