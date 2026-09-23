'use client';

import Image from 'next/image';

export default function Hero() {
  const scrollToLibrary = (e) => {
    e.preventDefault();
    const element = document.getElementById('library');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-r from-zinc-900/90 to-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-10 lg:p-12 my-6 relative overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-block bg-[#ccff00] text-black font-black text-xs px-3 py-1 uppercase tracking-widest rounded-sm">
            Workout Library
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
            Train with Intent. <br className="hidden sm:inline" />
            Log Every Set.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              onClick={scrollToLibrary}
              className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-3 rounded-md text-sm uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#ccff00]/10"
            >
              <span>Browse Workouts</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column Skeleton Banner Image */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_10px_25px_rgba(204,255,0,0.15)]">
            <Image
              src="/assets/banner.png" 
              alt="Gym Skeleton Trainer Illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
}