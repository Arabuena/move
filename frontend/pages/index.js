import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Após 2 segundos, verifica se é primeiro acesso
    const timer = setTimeout(() => {
      const isFirstTime = !localStorage.getItem('onboardingComplete');
      if (isFirstTime) {
        router.push('/passenger/onboarding');
      } else {
        router.push('/passenger/login');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-purple-700">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-2">Move</h1>
        <p className="text-purple-200">Seu destino, nossa prioridade</p>
      </motion.div>
    </div>
  );
} 