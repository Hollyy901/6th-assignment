'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FitnessContext = createContext();

export function FitnessProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [toast, setToast] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('fitlog_today_plan');
      const storedSaved = localStorage.getItem('fitlog_saved');
      const storedCompleted = localStorage.getItem('fitlog_completed');

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
      if (storedCompleted) setCompletedWorkouts(JSON.parse(storedCompleted));
    } catch (e) {
      console.error('Failed to load storage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
    localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
    localStorage.setItem('fitlog_completed', JSON.stringify(completedWorkouts));
  }, [todayPlan, savedWorkouts, completedWorkouts, isInitialized]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToPlan = (workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      showToast(`${workout.title} is already in today's plan!`, 'warning');
      return false;
    }

    if (todayPlan.length >= 5) {
      showToast('Cap of 5 lifts reached for today! Finish them first.', 'warning');
      return false;
    }

    setTodayPlan((prev) => [...prev, workout]);
    showToast(`Added ${workout.title} to today's plan!`, 'success');
    return true;
  };

  const removeFromPlan = (workoutId) => {
    const item = todayPlan.find((w) => w.id === workoutId);
    setTodayPlan((prev) => prev.filter((w) => w.id !== workoutId));
    setCompletedWorkouts((prev) => prev.filter((id) => id !== workoutId));
    if (item) showToast(`Removed ${item.title} from plan.`, 'info');
  };

  const addToSaved = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      showToast(`${workout.title} is already in saved list!`, 'warning');
      return false;
    }

    setSavedWorkouts((prev) => [...prev, workout]);
    showToast(`Saved ${workout.title} for later!`, 'success');
    return true;
  };

  const removeFromSaved = (workoutId) => {
    const item = savedWorkouts.find((w) => w.id === workoutId);
    setSavedWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
    if (item) showToast(`Removed ${item.title} from saved.`, 'info');
  };

  const toggleCompleteWorkout = (workoutId) => {
    const item = todayPlan.find((w) => w.id === workoutId);
    const isDone = completedWorkouts.includes(workoutId);

    if (isDone) {
      setCompletedWorkouts((prev) => prev.filter((id) => id !== workoutId));
      if (item) showToast(`Marked ${item.title} as incomplete`, 'info');
    } else {
      setCompletedWorkouts((prev) => [...prev, workoutId]);
      if (item) showToast(`Great job! Completed ${item.title}!`, 'success');
    }
  };

  return (
    <FitnessContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkouts,
        toast,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleCompleteWorkout,
        showToast,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export const useFitness = () => useContext(FitnessContext);