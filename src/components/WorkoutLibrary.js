'use client';

import { useState, useEffect } from 'react';
import WorkoutCard from './WorkoutCard';

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        
        if (!res.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await res.json();
        // Handle array response or nested data key
        const workoutList = Array.isArray(data) ? data : data.workouts || data.data || [];
        setWorkouts(workoutList);
      } catch (err) {
        console.error('Error fetching API:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="my-10 space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
          The Library
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          {workouts.length > 0 
            ? `${workouts.length} lifts covering every major muscle group.` 
            : 'Explore lifts covering every major muscle group.'}
        </p>
      </div>

      {/* Loading Skeleton Grid */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="bg-zinc-900 border border-zinc-800 rounded-xl h-80 animate-pulse p-4 space-y-4"
            >
              <div className="bg-zinc-800 h-40 rounded-lg w-full" />
              <div className="bg-zinc-800 h-4 rounded w-1/3" />
              <div className="bg-zinc-800 h-6 rounded w-2/3" />
              <div className="bg-zinc-800 h-8 rounded w-full mt-4" />
            </div>
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-400 font-semibold text-sm">Failed to load workout library.</p>
          <p className="text-zinc-500 text-xs mt-1">{error}</p>
        </div>
      )}

     
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id || workout._id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}