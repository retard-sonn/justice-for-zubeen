import React from 'react';

const SONGS = [
  { id: '1', title: 'Song 1', ytUrl: 'https://www.youtube.com/embed/AqUonMjxaog', link: 'https://www.youtube.com/watch?v=AqUonMjxaog' },
  { id: '2', title: 'Song 2', ytUrl: 'https://www.youtube.com/embed/bf2TLLZ-Ldk', link: 'https://www.youtube.com/watch?v=bf2TLLZ-Ldk' },
  { id: '3', title: 'Song 3', ytUrl: 'https://www.youtube.com/embed/Yc4MBfMLENE', link: 'https://www.youtube.com/watch?v=Yc4MBfMLENE' }
];

export default function LegacySection() {
  const [imgError, setImgError] = React.useState(false);

  return (
    <section className="w-full relative px-3 md:px-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-20 bg-slate-900 border border-slate-800 p-6 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="w-full md:w-2/5 shrink-0">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 relative z-10 bg-slate-950 aspect-[3/4] flex items-center justify-center">
              {!imgError ? (
                <img 
                  src="https://i.ibb.co/1fnpqRw5/zubeen1-Photoroom.png" 
                  alt="Zubeen Garg" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-center border-2 border-amber-500/20">
                   <svg className="w-16 h-16 text-amber-500/50 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                   <p className="font-serif text-amber-500">The Legend</p>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-3/5 relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 text-balance">
              The Legend Lives On
              <span className="block text-amber-500 text-2xl font-sans mt-3 font-normal">অসমৰ হিয়াৰ আমঠু</span>
            </h2>
            <div className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl">
              <p>
                Zubeen Garg (18 November 1972 – 19 September 2025) was not just an artist; he was the heartbeat of Assam. With over 32,000 songs spanning multiple languages—including Assamese, Bengali, and Hindi—his voice formed the soundtrack to generations of lives.
              </p>
              <p>
                From capturing national fame with 'Ya Ali' to preserving the rich folk heritage of the Northeast, his contribution is unparalleled. Beyond music, he was a director, actor, and a fierce advocate for the people's rights.
              </p>
              <p className="font-bold text-white">
                We demand justice, not just for a singer, but for a son of the soil. His physical absence leaves an unfillable void, but his music and ideals will echo eternally among the mighty Brahmaputra.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-serif font-bold text-white mb-4 text-balance">Timeless Melodies</h3>
          <p className="text-slate-400">The voice that united millions, echoing through generations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {SONGS.map((song) => (
            <div key={song.id} className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group hover:border-slate-600 transition-colors flex flex-col">
              <iframe 
                className="absolute inset-0 w-full h-full z-10"
                src={song.ytUrl} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
              {/* Fallback layer that is visible if iframe fails to load or covers the frame if it breaks */}
              <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-slate-950 p-6 text-center border border-amber-500/20">
                <svg className="w-10 h-10 text-amber-500 mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                <h4 className="text-amber-500 font-serif font-bold text-lg mb-2">{song.title}</h4>
                <a href={song.link} target="_blank" rel="noreferrer" className="text-sm font-sans tracking-wider hover:text-amber-400 text-slate-300 underline underline-offset-4 decoration-amber-500/50">Watch on YouTube ↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
