import React, { useEffect, useRef } from 'react';
import Hero from './components/Hero';
import LiveUpdates from './components/LiveUpdates';
import TwitterFeed from './components/TwitterFeed';
import PetitionSection from './components/PetitionSection';
import Timeline from './components/Timeline';
import LegacySection from './components/LegacySection';
import TributeWall from './components/TributeWall';
import BoycottSection from './components/BoycottSection';
import Footer from './components/Footer';

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [autoplayAttempted, setAutoplayAttempted] = React.useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay with sound
    const playAudio = async () => {
      try {
        audio.muted = false;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setAutoplayAttempted(true);
          }).catch((error) => {
            console.log('Autoplay prevented:', error);
          });
        }
      } catch (error) {
        console.log('Autoplay prevented. Waiting for user interaction.');
      }
    };

    // Delay to ensure DOM is ready
    setTimeout(playAudio, 500);

    // Add listener for first user interaction to play audio on mobile
    const handleUserInteraction = async () => {
      if (!autoplayAttempted && audio && audio.paused) {
        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setIsPlaying(true);
              setAutoplayAttempted(true);
            }).catch((error) => {
              console.log('Audio play failed:', error);
            });
          }
        } catch (err) {
          console.log('Audio play error:', err);
        }
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.muted = false;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.error('Play error:', error);
          });
        }
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-white pb-safe flex flex-col relative w-full overflow-hidden mx-auto pt-[80px] md:pt-[100px]">
      
      {/* Background Audio */}
      <audio 
        ref={audioRef}
        src="/music.mp3"
        loop
        autoPlay
        muted
      />
      
      {/* Pause Button - Top Right Corner */}
      <button
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-[110] w-10 h-10 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg animate-pulse md:animate-none"
        title={isPlaying ? 'Pause' : 'Tap to Play Audio'}
      >
        <span className="text-lg">{isPlaying ? '⏸' : '🔊'}</span>
      </button>
      
      {/* Revolutionary Top Banner */}
      <div className="fixed top-0 left-0 w-full z-[100] flex flex-col">
        <div className="bg-red-600 shadow-2xl flex flex-col md:flex-row items-center justify-center px-4 py-3 min-h-[70px] relative">
          <div className="flex items-center justify-center w-full max-w-7xl mx-auto gap-4">
            <img 
              src="https://i.ibb.co/yxFCCRg/Untitled-design-Photoroom.png"
              alt="Justice for Zubeen Garg"
              className="h-[55px] w-auto object-contain shrink-0 drop-shadow-md"
            />
            <div className="text-left flex flex-col justify-center">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight text-balance" style={{fontFamily: 'Playfair Display, serif', letterSpacing: '0.5px'}}>
                  যদি ন্যায় পোৱা নাযায়, তেন্তে চৰকাৰ বয়কট | BOYCOTT GOVERNMENT IF NO JUSTICE SERVED
                </span>
            </div>
          </div>
        </div>
        {/* Gamosa Top Border */}
        <div 
          className="w-full h-[20px] opacity-90 border-t border-amber-500/50" 
          style={{ backgroundImage: `url('https://i.ibb.co/dsnsx2jP/gamosa.jpg')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'repeat-x' }} 
        />
      </div>

      <header className="w-full flex flex-col items-center justify-center px-3 md:px-12 py-8 md:py-10 z-50 text-center space-y-3 md:space-y-2 relative mb-4 md:mb-0">
        <div className="text-xl md:text-3xl font-serif font-extrabold text-amber-500 tracking-wide drop-shadow-lg leading-tight">
          জুবিন গাৰ্গৰ ন্যায়
          <span className="block md:inline md:ml-2 text-sm md:text-xl font-sans font-light text-slate-300 md:mt-0 mt-2">| JUSTICE FOR ZUBEEN</span>
        </div>
        <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold drop-shadow-md pt-2">
          Assam Stand Together &bull; 19 Sept 2025
        </div>
      </header>

      <div className="flex-1 flex flex-col w-full">
        <Hero />
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col pt-12 space-y-24">
          <LiveUpdates />
          <TwitterFeed />
          <PetitionSection />
          <Timeline />
          <LegacySection />
          <TributeWall />
          <BoycottSection />
        </div>
        
        {/* Gamosa Bottom Border before Footer */}
        <div 
          className="w-full h-[20px] opacity-90 mt-16 md:mt-24 border-b border-amber-500/50 z-10 relative" 
          style={{ backgroundImage: `url('https://i.ibb.co/dsnsx2jP/gamosa.jpg')`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'repeat-x' }} 
        />
        <Footer />
      </div>
    </div>
  );
}
