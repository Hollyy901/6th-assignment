'use client';

import { useFitness } from '@/context/FitnessContext';

export default function Toast() {
  const fitness = useFitness();
  const toast = fitness?.toast;

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] transition-all">
      <div className="bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg border border-zinc-800 shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}