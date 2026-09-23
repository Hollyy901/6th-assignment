'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useFitness } from '@/context/FitnessContext';

export default function WorkoutDetailPage({ params }) {
  const resolvedParams = use(params);
  const workoutId = resolvedParams.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToPlan, addToSaved, todayPlan = [], savedWorkouts = [] } = useFitness() || {};

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        if (!res.ok) throw new Error('Failed to fetch details');

        const data = await res.json();
        const workoutList = Array.isArray(data) ? data : data.workouts || data.data || [];
        
        const found = workoutList.find(
          (item) => String(item.id) === String(workoutId) || String(item._id) === String(workoutId)
        );

        if (found) {
          setWorkout(found);
        } else {
          setError('Workout not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (workoutId) fetchWorkout();
  }, [workoutId]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-zinc-400 font-bold uppercase tracking-wider">
          Loading Workout Details...
        </div>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-6xl mx-auto py-12 px-4 text-center space-y-4">
        <p className="text-red-400 font-semibold">{error || 'Workout not found'}</p>
        <Link href="/" className="inline-block bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded-lg text-sm">
          ← Back to Library
        </Link>
      </div>
    );
  }

  const isInPlan = todayPlan.some((item) => String(item.id) === String(workout.id));
  const isSaved = savedWorkouts.some((item) => String(item.id) === String(workout.id));

  const tags = Array.isArray(workout.tags)
    ? workout.tags
    : workout.muscleGroup
      ? [workout.muscleGroup]
      : ['FULL BODY'];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : workout.instructions
      ? [workout.instructions]
      : [
          'Lie on the bench with eyes under the bar and feet planted.',
          'Unrack with locked elbows and lower the bar to mid-chest.',
          'Press up in a slight arc until elbows lock without bouncing.',
          'Keep shoulder blades pinched and a natural arch in the back.',
        ];

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      {/* Back Button */}
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-xs uppercase tracking-wider font-bold transition-colors">
        ← Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/*  Big Workout Image */}
        <div className="lg:col-span-6 relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <Image
            src={workout.image || '/assets/banner.png'}
            alt={workout.title || workout.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Workout Details */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              {workout.title || workout.name}
            </h1>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              {workout.description || 'A targeted exercise designed to build strength, hypertrophy, and pressing power.'}
            </p>
          </div>

          {/* Muscle Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-[#ccff00] text-black text-xs font-black px-3 py-1 rounded uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

        
          <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-4 divide-y divide-zinc-800/60 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Equipment</span>
              <span className="text-zinc-200 font-semibold">{workout.equipment || 'Barbell, Bench'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Difficulty</span>
              <span className="text-zinc-200 font-semibold">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Sets</span>
              <span className="text-zinc-200 font-semibold">{workout.sets || 4}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Reps</span>
              <span className="text-zinc-200 font-semibold">{workout.reps || '6-8'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Duration</span>
              <span className="text-zinc-200 font-semibold">{workout.duration || 25} min</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Calories</span>
              <span className="text-zinc-200 font-semibold">{workout.calories || 180} kcal</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-bold uppercase text-xs">Rating</span>
              <span className="text-yellow-400 font-bold">⭐ {workout.rating || '4.8'}</span>
            </div>
          </div>

          {/* Instructions List */}
          <div className="space-y-3">
            <h3 className="font-black text-white text-sm uppercase tracking-wider">Instructions</h3>
            <ol className="space-y-2 list-decimal list-inside text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span className="font-semibold text-zinc-100">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isInPlan}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                isInPlan
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-lg shadow-[#ccff00]/10 active:scale-95'
              }`}
            >
              {isInPlan ? 'In Today\'s Plan' : '📋 Add to today\'s plan'}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isSaved}
              className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider border transition-all ${
                isSaved
                  ? 'border-zinc-800 bg-zinc-800/50 text-zinc-500 cursor-not-allowed'
                  : 'border-zinc-700 hover:border-zinc-500 text-zinc-300 active:scale-95'
              }`}
            >
              {isSaved ? 'Saved' : '🔖 Save for later'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}