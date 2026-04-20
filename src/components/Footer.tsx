import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-md py-12 border-t border-slate-800 text-center mt-24 mb-safe shrink-0 z-10 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-500 mb-2 uppercase tracking-widest drop-shadow-sm">Justice for Zubeen Garg</h2>
          <p className="text-slate-400 text-sm font-medium">A Digital Memorial & Justice Portal</p>
        </div>

        <div className="text-xs text-slate-500 mb-4 max-w-2xl mx-auto leading-loose italic">
          This is a fan-made, community-driven portal seeking justice. It is not officially affiliated with family members or legal teams. <br/>
          All information is compiled from public domain sources.
        </div>
        <p className="text-xs text-slate-600 mt-6 font-semibold uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Justice Movement. Long Live Zubeen.
        </p>
      </div>
    </footer>
  );
}
