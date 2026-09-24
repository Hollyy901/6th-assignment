'use client';

import Image from 'next/image';
import { useFitness } from '@/context/FitnessContext';

export default function WorkoutCard({ workout }) {
  const { todayPlan, savedWorkouts, addToPlan, addToSaved } = useFitness();

  const isPlanned = todayPlan.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 hover:scale-[1.01] transition-all duration-200 group">
      <div>
        {/* Card Header / Image */}
        <div className="relative h-48 w-full bg-zinc-800/50 overflow-hidden">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.title || workout.name || 'Workout'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
              FitLog Exercise
            </div>
          )}

          {/* Target Muscle Tag */}
          {(workout.muscleGroup || workout.target) && (
            <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[#ccff00] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#ccff00]/20">
              {workout.muscleGroup || workout.target}
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
            {workout.title || workout.name}
          </h3>
          <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
            {workout.description || workout.instructions || 'Custom training exercise.'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2.5 mt-auto">
        <button
          onClick={() => addToPlan(workout)}
          disabled={isPlanned}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 ${
            isPlanned
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              : 'bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95 shadow-md shadow-[#ccff00]/10'
          }`}
        >
          {isPlanned ? 'Added' : '+ Add Plan'}
        </button>

        <button
          onClick={() => addToSaved(workout)}
          disabled={isSaved}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
            isSaved
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white active:scale-95 border border-zinc-700/60'
          }`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}