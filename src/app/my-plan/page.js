'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useFitness } from '@/context/FitnessContext';

function MyPlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') === 'saved' ? 'saved' : 'plan';

  const {
    todayPlan = [],
    savedWorkouts = [],
    completedWorkouts = [],
    removeFromPlan,
    removeFromSaved,
    toggleCompleteWorkout,
  } = useFitness() || {};

  const [sortBy, setSortBy] = useState('default');

  const currentList = activeTab === 'plan' ? todayPlan : savedWorkouts;

  // Calculate totals
  const totalExercises = currentList.length;
  const totalMinutes = useMemo(() => {
    return currentList.reduce((acc, item) => acc + (parseInt(item.duration) || 0), 0);
  }, [currentList]);

  const totalCalories = useMemo(() => {
    return currentList.reduce((acc, item) => acc + (parseInt(item.calories) || 0), 0);
  }, [currentList]);

  
  const sortedList = useMemo(() => {
    const list = [...currentList];
    if (sortBy === 'duration') {
      return list.sort((a, b) => (parseInt(b.duration) || 0) - (parseInt(a.duration) || 0));
    }
    if (sortBy === 'calories') {
      return list.sort((a, b) => (parseInt(b.calories) || 0) - (parseInt(a.calories) || 0));
    }
    if (sortBy === 'name') {
      return list.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
    }
    return list;
  }, [currentList, sortBy]);

  const setTab = (tab) => {
    if (tab === 'saved') {
      router.push('/my-plan?tab=saved');
    } else {
      router.push('/my-plan');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
          My Plan
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4 text-left shadow-xl">
        <div>
          <span className="text-zinc-500 font-bold text-xs uppercase tracking-wider block">
            Exercises
          </span>
          <span className="text-3xl sm:text-5xl font-black text-[#ccff00] mt-1 block">
            {totalExercises}
          </span>
        </div>
        <div>
          <span className="text-zinc-500 font-bold text-xs uppercase tracking-wider block">
            Minutes
          </span>
          <span className="text-3xl sm:text-5xl font-black text-white mt-1 block">
            {totalMinutes}
          </span>
        </div>
        <div>
          <span className="text-zinc-500 font-bold text-xs uppercase tracking-wider block">
            Calories
          </span>
          <span className="text-3xl sm:text-5xl font-black text-white mt-1 block">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setTab('plan')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'plan'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setTab('saved')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Saved ({savedWorkouts.length})
          </button>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">
            Sort By
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-zinc-900 text-white text-xs font-semibold px-3 py-2 rounded-lg border border-zinc-800 focus:outline-none focus:border-[#ccff00]"
          >
            <option value="default">Default</option>
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* List / Empty State */}
      {sortedList.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl">
          <h3 className="text-2xl font-black uppercase text-white tracking-wider">
            Nothing Here Yet
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm mx-auto">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all transform hover:scale-105"
            >
              Go To Workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedList.map((workout) => {
            const isDone = completedWorkouts.includes(workout.id);
            return (
              <div
                key={workout.id}
                className={`bg-zinc-900/90 border rounded-xl overflow-hidden flex flex-col justify-between transition-all ${
                  isDone ? 'border-emerald-500/50 opacity-75' : 'border-zinc-800'
                }`}
              >
                <div>
                  <div className="relative h-44 w-full bg-zinc-800">
                    <Image
                      src={workout.image || '/assets/banner.png'}
                      alt={workout.title || workout.name || 'Workout'}
                      fill
                      className="object-cover"
                    />
                    {isDone && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-black font-black text-[10px] px-2 py-0.5 rounded uppercase">
                        ✓ Completed
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-white text-base uppercase">
                      {workout.title || workout.name}
                    </h3>
                    <div className="flex items-center gap-3 text-zinc-400 text-xs font-medium">
                      <span>⏱️ {workout.duration || 20} min</span>
                      <span>🔥 {workout.calories || 150} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  {activeTab === 'plan' && (
                    <button
                      onClick={() => toggleCompleteWorkout(workout.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-zinc-800 text-zinc-400 hover:text-white'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                      }`}
                    >
                      {isDone ? 'Mark Incomplete' : '✓ Mark as Done'}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === 'plan'
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="w-full py-2 rounded-lg text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="text-zinc-400 font-bold py-12 text-center">Loading My Plan...</div>}>
      <MyPlanContent />
    </Suspense>
  );
}