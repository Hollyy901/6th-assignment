import Hero from '@/components/Hero';
import WorkoutLibrary from '@/components/WorkoutLibrary';

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <WorkoutLibrary />
    </div>
  );
}