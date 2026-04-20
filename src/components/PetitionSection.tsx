import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, doc, setDoc, increment, updateDoc, where, getDocs } from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { format } from 'date-fns';

const DISTRICTS = [
  "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
  "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", 
  "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", 
  "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", 
  "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", 
  "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong", 
  "Other"
];

interface Petition {
  id: string;
  name: string;
  district: string;
  message: string;
  createdAt: any;
}

const BAD_WORDS_REGEX = /\b(fuck|bitch|bastard|cunt|dick|pussy|slut|whore|asshole)\b/i;

export default function PetitionSection() {
  const [user, setUser] = useState(auth.currentUser);
  const [district, setDistrict] = useState('');
  const [message, setMessage] = useState('');
  const [customName, setCustomName] = useState('');
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasAlreadySigned, setHasAlreadySigned] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        setCustomName(u.displayName || '');
        // Check Firebase if user has already signed
        const q = query(collection(db, 'signatures'), where('userId', '==', u.uid));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setHasAlreadySigned(true);
        } else {
          setHasAlreadySigned(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'signatures'), orderBy('timestamp', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Petition[];
      setPetitions(data);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
      console.error(e);
      if (e.code === 'auth/unauthorized-domain') {
        alert("Firebase Auth Domain Error: This app's URL is not authorized in Firebase. Please add this domain to the Firebase Console -> Authentication -> Settings -> Authorized domains.");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !district || !message) return;
    if (hasAlreadySigned) {
      alert("You have already signed the petition.");
      return;
    }
    
    if (BAD_WORDS_REGEX.test(message) || BAD_WORDS_REGEX.test(customName)) {
      alert("Please ensure your message and name maintain respect for this memorial.");
      return;
    }
    
    setLoading(true);
    try {
      // Add signature to collection
      await addDoc(collection(db, 'signatures'), {
        name: customName || user.displayName || 'Anonymous',
        location: district,
        message,
        timestamp: serverTimestamp(),
        userId: user.uid
      });
      
      // Use setDoc with merge to safely initialize document if it doesn't exist
      await setDoc(doc(db, 'stats', 'petitions'), {
        totalSignatures: increment(1)
      }, { merge: true });

      setMessage('');
      setDistrict('');
      setHasAlreadySigned(true);
      alert("Thank you for your support. Your voice matters.");
    } catch (e) {
      console.error(e);
      alert("Error submitting petition. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="petition" className="w-full relative">
      <div className="text-center mb-12 md:mb-16 px-3 md:px-0">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 text-balance">
          Add Your Voice <br />
          <span className="text-amber-500 text-xl md:text-3xl font-sans mt-2 md:mt-3 block font-normal">ন্যায়ৰ বাবে স্বাক্ষৰ কৰক</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed text-balance px-3">
          Join the movement. We are demanding a clear, transparent, and impartial investigation into the tragic passing of our beloved Zubeen Garg.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start px-3 md:px-0 max-w-7xl mx-auto">
        {/* Form Column */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-amber-400"></div>
            {!user ? (
              <div className="text-center py-16">
                <p className="text-slate-300 mb-8 text-lg">You must be logged in to sign the petition to ensure authenticity.</p>
                <button 
                  onClick={handleLogin}
                  className="bg-white text-slate-900 font-semibold py-3 px-8 rounded-full hover:bg-slate-200 hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto space-x-3 shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.36,22 12.2,22C17.53,22 22,18.33 22,12.08C22,11.38 21.35,11.1 21.35,11.1Z" /></svg>
                  <span>Sign in with Google</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Display Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={customName} 
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-3 pr-10 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors shadow-inner"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">✏️</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">You may change how your name appears on the petition.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">District / Location</label>
                  <select 
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-colors shadow-inner"
                  >
                    <option value="" disabled className="text-slate-500">Select District</option>
                    {DISTRICTS.map(d => (
                      <option key={d} value={d} className="text-slate-900">{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Message</label>
                  <textarea 
                    required
                    maxLength={200}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Why this matters to you (max 200 chars)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none shadow-inner transition-colors"
                  ></textarea>
                  <div className="text-right text-xs text-slate-500 mt-2">{message.length}/200</div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading || hasAlreadySigned}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold uppercase tracking-wider text-sm py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 shadow-lg shadow-amber-500/20"
                >
                  {hasAlreadySigned ? 'You have already signed' : (loading ? 'Submitting...' : 'Sign Petition')}
                </button>
              </form>
            )}
          </div>

        {/* Recent Signatures Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
          <h3 className="text-lg font-serif font-bold text-white mb-6 flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-600 mr-3 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-ping relative inline-flex">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            </span>
            <span className="text-red-500 mr-2 uppercase tracking-widest text-xs">LIVE</span>
            Recent Signatures
          </h3>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            
            {/* Special Zubeen Signed Entry */}
            <div className="bg-slate-800/80 rounded-xl p-5 border border-amber-500/40 hover:bg-slate-800 transition-colors shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full z-0 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <img 
                  src="https://i.ibb.co/JVzHn9Z/zubeen2-Photoroom.png" 
                  alt="Zubeen Garg Signature" 
                  className="w-24 h-auto object-contain drop-shadow-xl scale-110 group-hover:scale-125 transition-transform duration-500" 
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-sans font-black text-amber-500 text-lg uppercase tracking-wide flex items-center justify-center sm:justify-start gap-2">
                       <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                       ZUBEEN GARG
                    </h4>
                    <span className="text-[10px] text-amber-500/80 font-bold whitespace-nowrap ml-4 uppercase tracking-[0.2em] hidden sm:block bg-amber-500/10 px-2 py-1 rounded">Forever</span>
                  </div>
                  <p className="text-sm text-slate-200 italic leading-relaxed font-serif">"The voice of the revolution lives on. Justice will prevail."</p>
                </div>
              </div>
            </div>

            {petitions.length === 0 ? (
              <p className="text-slate-500 italic text-center py-10">Waiting for voices. Be the first to stand for justice.</p>
            ) : (
              petitions.map((p) => (
                <div key={p.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:bg-slate-800 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-white text-sm">{p.name}</h4>
                    </div>
                    <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-4">
                      {p.location || p.district} • {p.timestamp?.toDate ? format(p.timestamp.toDate(), 'MMM d') : (p.createdAt?.toDate ? format(p.createdAt.toDate(), 'MMM d') : 'Just now')}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed">"{p.message}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
