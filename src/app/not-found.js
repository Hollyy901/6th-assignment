'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6 px-4">
      <div className="space-y-2">
        <span className="text-[#ccff00] text-sm font-black uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          Error 404
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mt-4">
          Lift Not Found
        </h1>
        <p className="text-zinc-400 text-sm max-w-md mx-auto">
          The page or exercise route you are looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Link
        href="/"
        className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#ccff00]/10"
      >
        ← Back to Workouts
      </Link>
    </div>
  );
}