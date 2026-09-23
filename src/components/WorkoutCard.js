'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFitness } from '@/context/FitnessContext';

export default function WorkoutCard({ workout }) {
  const { addToPlan, addToSaved, todayPlan = [], savedWorkouts = [] } = useFitness() || {};

  const isInPlan = todayPlan.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));

  const tags = Array.isArray(workout.tags) 
    ? workout.tags 
    : workout.muscleGroup 
      ? [workout.muscleGroup] 
      : ['FULL BODY'];

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-lg">
      <Link href={`/workouts/${workout.id}`} className="block">
        {/* Workout Image */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-800">
          <Image
            src={workout.image || '/assets/banner.png'}
            alt={workout.title || workout.name || 'Workout'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Workout Content */}
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#ccff00] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="font-extrabold text-lg text-white uppercase tracking-wide leading-tight group-hover:text-[#ccff00] transition-colors">
              {workout.title || workout.name}
            </h3>
            <p className="text-zinc-400 text-xs mt-0.5">
              {workout.equipment || 'Bodyweight'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-xs font-medium pt-1">
            <span className="flex items-center gap-1">
              ⏱️ {workout.duration || '20'} min
            </span>
            <span className="flex items-center gap-1">
              🔥 {workout.calories || '150'} kcal
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              ⭐ {workout.rating || '4.8'}
            </span>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => addToPlan && addToPlan(workout)}
          disabled={isInPlan}
          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
            isInPlan
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-[#ccff00] hover:bg-[#b8e600] text-black active:scale-95'
          }`}
        >
          {isInPlan ? 'In Plan' : '+ Add to Plan'}
        </button>

        <button
          onClick={() => addToSaved && addToSaved(workout)}
          disabled={isSaved}
          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${
            isSaved
              ? 'border-zinc-800 bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
              : 'border-zinc-700 hover:border-zinc-500 text-zinc-300 active:scale-95'
          }`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}