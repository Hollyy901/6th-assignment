import './globals.css';
import { FitnessProvider } from '@/context/FitnessContext';
import Navbar from '@/components/Navbar';
import Toast from '@/components/Toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f0f11] text-zinc-100 min-h-screen flex flex-col font-sans antialiased">
        <FitnessProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Toast />
        </FitnessProvider>
      </body>
    </html>
  );
}