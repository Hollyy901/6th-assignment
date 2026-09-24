'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#0f0f11] mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="FitLog Logo" width={24} height={24} />
          <span className="font-black tracking-wider text-sm text-white uppercase">
            FitLog
          </span>
        </div>

        <p className="text-zinc-500 text-xs text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

        <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
          <Link href="/" className="hover:text-[#ccff00] transition-colors">
            Workouts
          </Link>
          <Link href="/my-plan" className="hover:text-[#ccff00] transition-colors">
            My Plan
          </Link>
        </div>
      </div>
    </footer>
  );
}