import React, { useEffect, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { collection, onSnapshot, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

export default function Hero() {
  const [daysSince, setDaysSince] = useState(0);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const [totalSignatures, setTotalSignatures] = useState<number | null>(null);

  useEffect(() => {
    // Calculate days since 19 Sept 2025
    const passedDate = new Date('2025-09-19');
    const today = new Date();
    setDaysSince(differenceInDays(today, passedDate));
    
    // Live total signatures counter from stats
    const unsubscribe = onSnapshot(doc(db, 'stats', 'petitions'), (snap) => {
      setTotalSignatures(snap.data()?.totalSignatures ?? 0);
    });

    // Visitor counter logic - use sessionStorage to track per session
    const hasVisitedSession = sessionStorage.getItem('has_visited_session');
    if (!hasVisitedSession) {
      sessionStorage.setItem('has_visited_session', 'true');
      // Use setDoc with merge to safely initialize document if it doesn't exist
      const visitorRef = doc(db, 'stats', 'visitors');
      setDoc(visitorRef, { count: increment(1) }, { merge: true }).catch(err => {
        console.error('Error incrementing visitor count:', err);
      });
    }
    
    // Live visitor counter
    const unsubVisitor = onSnapshot(doc(db, 'stats', 'visitors'), (snap) => {
       setVisitorCount(snap.data()?.count ?? 0);
    });

    return () => {
      unsubscribe();
      unsubVisitor();
    };
  }, []);

  const handleShare = () => {
    const text = encodeURIComponent("I just signed the petition for Justice for Zubeen Garg. Add your voice here and join the movement: ");
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, '_blank');
  };

  const scrollToPetition = () => {
    document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <section className="relative min-h-[70vh] w-full flex items-center justify-center py-8 md:py-20 px-3 md:px-6">
      {/* Fixed Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat bg-fixed" 
        style={{ backgroundImage: `url('https://i.ibb.co/FkkJCfRS/Zubeen-Garg-Wallpaper-Photoroom.png')` }}
      />
      {/* Dark Glass Overlay */}
      <div className="absolute inset-0 z-10 bg-slate-950/70 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center space-y-12 md:space-y-0 md:space-x-12">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center order-1 relative"
        >
          <div className="absolute inset-0 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          <img 
            src="https://i.ibb.co/1fnpqRw5/zubeen1-Photoroom.png" 
            alt="Zubeen Garg" 
            className="w-full max-w-[380px] md:max-w-[480px] lg:max-w-[550px] h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          />
        </motion.div>

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-8 order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl text-balance">
              <span className="text-amber-500">জুবিন গাৰ্গৰ</span> ন্যায় বিচাৰি
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl mt-3 block font-sans font-light text-slate-200">Justice for Zubeen Garg</span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-md bg-slate-900/50 border border-slate-700/50 px-6 py-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col items-center md:items-start w-full relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full"></div>
             
             <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-500 flex flex-col items-center md:items-start tracking-wide drop-shadow-md">
                <span className="mb-2 text-white text-lg">ন্যায়ৰ বাবে অপেক্ষা কৰা দিন:</span>
                <span className="text-3xl md:text-4xl">{Math.max(0, daysSince)} দিন</span>
             </h2>
             <div className="w-full h-px bg-slate-700/30 my-4"></div>
             <h3 className="text-xs md:text-sm font-sans font-bold text-slate-300 uppercase tracking-widest flex flex-col items-center md:items-start">
                <span className="mb-1 text-slate-500">Justice Days Counter:</span>
                <span>{Math.max(0, daysSince)} Days</span>
             </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center md:items-start w-full"
          >
            <div className="flex flex-col items-center md:items-start gap-3 mb-6 w-full md:w-auto">
              {totalSignatures !== null && (
                <div className="backdrop-blur-sm bg-slate-900/40 border border-slate-800 rounded-xl px-6 py-4 text-center shadow-lg w-full">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500 leading-none mb-1">{totalSignatures.toLocaleString()}</div>
                  <div className="text-[11px] uppercase tracking-widest text-slate-400">Total Petitions Signed</div>
                </div>
              )}
              
              {visitorCount !== null && (
                <div className="backdrop-blur-sm bg-slate-900/40 border border-slate-800/60 rounded-lg px-4 py-3 text-center shadow-md w-full">
                  <div className="text-xl md:text-2xl font-serif font-bold text-amber-500/80 leading-none mb-1">{visitorCount.toLocaleString()}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500">Total Visitors</div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button 
                onClick={scrollToPetition}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:shadow-[0_0_35px_rgba(245,158,11,0.8)] border-none cursor-pointer tracking-wider hover:scale-105 transform duration-300 flex-1 text-center"
              >
                Sign the Petition
              </button>
              
              <button 
                onClick={handleShare}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:shadow-[0_0_35px_rgba(22,163,74,0.6)] border-none cursor-pointer tracking-wider hover:scale-105 transform duration-300 flex items-center justify-center gap-3 flex-1"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                Share on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
