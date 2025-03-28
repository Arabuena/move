import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';

const slides = [
  {
    title: 'Bem-vindo ao Move',
    description: 'Sua nova forma de se locomover pela cidade',
    image: '/onboarding/welcome.svg'
  },
  {
    title: 'Viagens Seguras',
    description: 'Motoristas verificados e monitoramento em tempo real',
    image: '/onboarding/safety.svg'
  },
  {
    title: 'Pagamento Fácil',
    description: 'Escolha a forma de pagamento que preferir',
    image: '/onboarding/payment.svg'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      // Marca que já viu o onboarding
      localStorage.setItem('hasSeenOnboarding', 'true');
      router.push('/passenger/login');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="h-screen flex flex-col"
        >
          {/* Área da Imagem */}
          <div className="flex-1 relative bg-gradient-primary p-8 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-64 h-64"
            >
              <div className="absolute inset-0">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* Conteúdo */}
          <div className="p-8 bg-white rounded-t-3xl -mt-8 relative z-10">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {slides[currentSlide].title}
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                {slides[currentSlide].description}
              </p>

              {/* Indicadores */}
              <div className="flex space-x-2 mb-8">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                      index === currentSlide ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Botão */}
              <button
                onClick={handleNext}
                className="w-full btn-primary text-lg"
              >
                {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 