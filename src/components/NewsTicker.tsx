import React from 'react';

const HEADLINES = [
  "CBI probe demanded by All Assam Students' Union. 📢",
  "Chief Minister assures 'no stone will be left unturned' in Zubeen Garg case. 🗞",
  "Over 5 lakh signatures collected demanding Justice for Zubeen. ✍️",
  "High Court sets next hearing date for PIL on 24th May. ⚖️",
  "Bollywood singers join the #JusticeForZubeen movement on social media. 🎵",
  "Guwahati peaceful march sees historic turnout in memory of the legend. 🕯",
];

export default function NewsTicker() {
  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md text-slate-300 py-4 overflow-hidden flex whitespace-nowrap border border-slate-800 items-center rounded-2xl shadow-xl">
      <div className="z-10 bg-slate-900 border-r border-slate-800 px-6 font-semibold uppercase text-xs tracking-widest shrink-0 text-white flex items-center shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mr-3 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
        Live News
      </div>
      <div className="animate-marquee inline-block whitespace-nowrap flex-1 ml-6 text-sm font-medium">
        {HEADLINES.map((h, i) => (
          <span key={i} className="mx-8 text-slate-400">
            <span className="text-amber-500 font-bold mr-2">/</span>{h}
          </span>
        ))}
        {/* Duplicate for seamless scrolling */}
        {HEADLINES.map((h, i) => (
          <span key={`dup-${i}`} className="mx-8 hidden lg:inline-block text-slate-400">
            <span className="text-amber-500 font-bold mr-2">/</span>{h}
          </span>
        ))}
      </div>
    </div>
  );
}
