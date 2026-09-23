'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useFitness } from '@/context/FitnessContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan = [], savedWorkouts = [] } = useFitness() || {};

  const isWorkoutsActive = pathname === '/' || pathname.startsWith('/workouts');
  const isPlanActive = pathname === '/my-plan';

  return (
    <header className="sticky top-0 z-40 bg-[#0f0f11]/90 backdrop-blur-md border-b border-zinc-800/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo with exact image */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/assets/logo.png" 
            alt="FitLog Logo" 
            width={32} 
            height={32} 
            className="object-contain"
          />
          <span className="font-extrabold tracking-wider text-xl text-white group-hover:text-[#ccff00] transition-colors uppercase">
            FitLog
          </span>
        </Link>

        {/* Middle Navigation Links */}
        <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-full border border-zinc-800">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isWorkoutsActive
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              isPlanActive
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Right Side Status Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-3 py-1 rounded-full text-xs transition-transform active:scale-95"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-bold px-3 py-1 rounded-full text-xs transition-colors"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-white w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-extrabold">
              {savedWorkouts.length}
            </span>
          </Link>
        </div>

      </nav>
    </header>
  );
}