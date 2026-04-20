import React from 'react';

const HEADLINES = [
  "LIVE: Guwahati Fast-Track Court resumes hearing on SIT 3,500-page chargesheet...",
  "UPDATE: Fans call for statewide candle march this Sunday at 6 PM...",
  "BREAKING: SIT team verifies yacht records from Singapore authorities..."
];

export default function LiveUpdates() {
  return (
    <section className="w-full relative px-3 md:px-0">
      <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none z-0"></div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-3 relative z-10">
          <h2 className="text-xl md:text-3xl font-serif font-bold text-white flex items-center">
             <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-600 mr-2 md:mr-3 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-ping relative inline-flex shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            </span>
            Live Updates
          </h2>
          <span className="text-[9px] md:text-xs bg-slate-800 text-slate-300 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-slate-700 tracking-wider uppercase font-semibold shrink-0">Trending</span>
        </div>

        <div className="relative z-10">
          <div className="space-y-4">
            {HEADLINES.map((item, idx) => (
              <div 
                key={idx} 
                className="block bg-slate-950/40 border-l-[3px] border-l-slate-700 border-y border-r border-slate-800/50 rounded-lg p-5 shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-[10px] md:text-xs font-bold text-red-500 uppercase tracking-widest animate-pulse">JUST IN</span>
                    </div>
                    <h3 className="text-slate-200 font-medium text-sm md:text-lg leading-snug">
                      {item}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
