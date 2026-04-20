import React, { useEffect } from 'react';

export default function TwitterFeed() {
  useEffect(() => {
    // Dynamically inject the Curator.io script
    const script = document.createElement('script');
    script.src = "https://cdn.curator.io/published/40a2f4ec-d0f1-4eb4-bb88-f8fc71d804b1.js";
    script.async = true;
    script.charset = "UTF-8";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount to prevent duplicates if component re-renders
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="w-full relative py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 text-center text-balance">
          জুবিনৰ বাবে জনতাৰ মাত
          <span className="block text-amber-500 text-xl md:text-2xl mt-2 font-sans font-normal uppercase tracking-wide">People's Voice for Zubeen</span>
        </h2>
        <div className="mt-8 bg-slate-900/50 backdrop-blur-md border border-amber-500/50 rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.15)] overflow-hidden min-h-[600px] w-full p-2 sm:p-6 relative">
          
          {/* Curator.io Target Container */}
          <div id="curator-feed-default-feed-layout" className="w-full">
            <a href="https://curator.io" target="_blank" rel="noreferrer" className="crt-logo crt-tag text-slate-500 text-xs text-center block mt-4">
              Powered by Curator.io
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
