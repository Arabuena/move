import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se já passou pelo onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    // Timer para mostrar a splash screen
    const timer = setTimeout(() => {
      if (hasSeenOnboarding) {
        router.push('/passenger/login');
      } else {
        router.push('/passenger/onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Move</h1>
        <p className="text-primary-200">Seu app de mobilidade</p>
      </motion.div>
    </div>
  );
} 