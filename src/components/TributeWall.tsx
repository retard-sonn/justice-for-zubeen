import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { format } from 'date-fns';

interface Tribute {
  id: string;
  authorName: string;
  message: string;
  timestamp: any;
  userId: string;
}

const BAD_WORDS_REGEX = /\b(fuck|bitch|bastard|cunt|dick|pussy|slut|whore|asshole)\b/i;

export default function TributeWall() {
  const [tributes, setTributes] = useState<Tribute[]>([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'tributes'), orderBy('timestamp', 'desc'), limit(100));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          authorName: data.authorName || data.name || 'Anonymous',
          message: data.message,
          timestamp: data.timestamp,
          userId: data.userId
        } as Tribute;
      });
      setTributes(items);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;
    
    if (BAD_WORDS_REGEX.test(message)) {
      alert("Please ensure your message maintains respect for this memorial.");
      return;
    }
    
    try {
      await addDoc(collection(db, 'tributes'), {
        message: message.trim(),
        authorName: user.displayName || 'Anonymous',
        userId: user.uid,
        timestamp: serverTimestamp()
      });
      setMessage('');
    } catch (e) {
      console.error(e);
      alert("Error posting tribute.");
    }
  };

  return (
    <section className="w-full relative px-3 md:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 md:mb-4 text-balance">
            Tribute Wall
            <span className="block text-amber-500 text-xl md:text-3xl font-sans mt-2 md:mt-3 font-normal">শ্রদ্ধান্জলি</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg text-balance">Leave a message of love and remembrance for the maestro.</p>
        </div>

        {user && (
          <form onSubmit={handleSubmit} className="mb-16 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-600 to-amber-400"></div>
            <textarea 
              required
              maxLength={150}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Write your tribute here... (max 150 chars)"
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none mb-4 shadow-inner"
            ></textarea>
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-medium text-slate-500">{message.length}/150</span>
              <button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-xs py-3 px-8 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
              >
                Post Tribute
              </button>
            </div>
          </form>
        )}

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tributes.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 italic">
              Be the first to stand for justice
            </div>
          ) : (
            tributes.slice(0, displayCount).map((t, i) => (
              <div 
                key={t.id} 
                className="bg-slate-900 rounded-xl p-6 shadow-2xl border-t border-slate-800 break-inside-avoid relative hover:bg-slate-800/80 transition-all duration-300 group"
              >
                <div className="absolute top-0 left-4 w-8 h-px bg-amber-500/50"></div>
                <p className="text-slate-200 text-sm italic mb-6 leading-relaxed font-sans cursor-default">"{t.message}"</p>
                <div className="flex flex-col pt-3 border-t border-slate-800/30">
                  <span className="font-semibold text-amber-500 tracking-wide text-sm">— {t.authorName}</span>
                  <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">
                    {t.timestamp?.toDate ? format(t.timestamp.toDate(), 'MMM d, yyyy') : 'Just now'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {tributes.length > displayCount && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setDisplayCount(prev => prev + 9)}
              className="bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-900 font-bold uppercase tracking-widest text-xs py-3 px-8 rounded-full transition-all duration-300"
            >
              Load More Tributes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
