'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FitnessContext = createContext();

export function FitnessProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [toast, setToast] = useState(null);

  // Helper function to show toast for 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Add to Today's Plan
  const addToPlan = (workout) => {
    if (todayPlan.length >= 5) {
      showToast('Daily limit reached! You can only add up to 5 lifts.', 'warning');
      return;
    }
    if (!todayPlan.some((item) => String(item.id) === String(workout.id))) {
      setTodayPlan((prev) => [...prev, workout]);
      showToast(`Added "${workout.title || workout.name}" to Today's Plan!`, 'success');
    }
  };

  // Remove from Today's Plan
  const removeFromPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast('Removed workout from Today\'s Plan', 'info');
  };

  // Add to Saved
  const addToSaved = (workout) => {
    if (!savedWorkouts.some((item) => String(item.id) === String(workout.id))) {
      setSavedWorkouts((prev) => [...prev, workout]);
      showToast(`Saved "${workout.title || workout.name}" for later!`, 'success');
    }
  };

  // Remove from Saved
  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast('Removed workout from Saved', 'info');
  };

  // Toggle Completed
  const toggleCompleteWorkout = (id) => {
    if (completedWorkouts.includes(id)) {
      setCompletedWorkouts((prev) => prev.filter((itemId) => itemId !== id));
      showToast('Marked workout as incomplete', 'info');
    } else {
      setCompletedWorkouts((prev) => [...prev, id]);
      showToast('Great job! Workout completed! 🎉', 'success');
    }
  };

  return (
    <FitnessContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedWorkouts,
        toast,
        showToast,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleCompleteWorkout,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}

export function useFitness() {
  return useContext(FitnessContext);
}