import React from 'react';
import { motion } from 'framer-motion';

const EVENTS = [
  {
    date: '19 September 2025',
    title: 'A Tragic Loss',
    desc: 'Zubeen Garg passes away unexpectedly. Initial reports raise more questions than answers.',
    color: 'border-brand-red text-brand-red'
  },
  {
    date: '22 September 2025',
    title: 'Candlelight Vigils Across Assam',
    desc: 'Millions of fans march peacefully holding candles, demanding a CBI inquiry into the circumstances.',
    color: 'border-brand-gold text-brand-gold'
  },
  {
    date: '5 October 2025',
    title: 'Petitions Filed',
    desc: 'Public interest litigations (PILs) filed in Gauhati High Court seeking an impartial, court-monitored probe.',
    color: 'border-brand-green text-brand-green'
  },
  {
    date: '12 November 2025',
    title: 'Formation of Action Committee',
    desc: 'Prominent artists and citizens form the "Justice for Zubeen" committee to keep the movement alive.',
    color: 'border-white text-white'
  },
  {
    date: '3 January 2026',
    title: 'Massive Latasil Rally',
    desc: 'Over 100,000 people gather at Latasil Playground in Guwahati echoing the demand for justice.',
    color: 'border-brand-gold text-brand-gold'
  },
  {
    date: '15 February 2026',
    title: 'Preliminary Report Issued',
    desc: 'Police submit their initial findings. Fans and family express severe dissatisfaction with the "inconclusive" nature.',
    color: 'border-brand-red text-brand-red'
  },
  {
    date: 'Present Day',
    title: '#JusticeForZubeen Continues',
    desc: 'The fight for truth goes on. We will not rest until the real story is brought to light.',
    color: 'border-brand-green text-brand-green'
  }
];

export default function Timeline() {
  return (
    <section className="w-full relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
          Case Timeline
          <span className="block text-amber-500 text-2xl md:text-3xl mt-3 font-sans font-normal">ঘটনাৰ ক্ৰম</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 md:-translate-x-1/2"></div>
        
        <div className="space-y-8 md:space-y-12 relative px-4 md:px-0">
          {EVENTS.map((evt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex items-start md:items-center justify-between md:justify-normal w-full flex-col ${idx % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Glowing Point */}
              <div className="absolute left-[-1px] md:left-1/2 -ml-[8px] top-6 md:top-auto w-4 h-4 rounded-full border-4 border-slate-950 bg-amber-500 z-10 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
              
              {/* Content Card */}
              <div className="ml-8 md:ml-0 w-[calc(100%-2rem)] md:w-[45%] bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:bg-slate-800 transition-colors shadow-xl group">
                <span className="text-xs font-bold tracking-widest uppercase text-amber-500 drop-shadow-md">
                  {evt.date}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-2 mb-3 group-hover:text-amber-400 transition-colors">{evt.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{evt.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
