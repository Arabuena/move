import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const slides = [
  {
    title: "Bem-vindo ao Move",
    description: "A maneira mais fácil de chegar onde você precisa",
    image: "/onboarding/slide1.png"
  },
  {
    title: "Viagens Seguras",
    description: "Motoristas verificados e monitoramento em tempo real",
    image: "/onboarding/slide2.png"
  },
  {
    title: "Pagamento Fácil",
    description: "Várias formas de pagamento para sua conveniência",
    image: "/onboarding/slide3.png"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      localStorage.setItem('onboardingComplete', 'true');
      router.push('/passenger/login');
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div className="h-screen w-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="h-full flex flex-col items-center justify-center p-6"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-64 h-64 object-contain mb-8"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {slides[currentSlide].title}
          </h2>
          <p className="text-gray-600 text-center mb-8">
            {slides[currentSlide].description}
          </p>
          <button
            onClick={nextSlide}
            className="bg-purple-700 text-white px-8 py-3 rounded-full"
          >
            {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 