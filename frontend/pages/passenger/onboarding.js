import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const slides = [
  {
    title: 'Bem-vindo ao Move',
    description: 'Sua nova forma de se locomover pela cidade',
    image: '/onboarding/slide1.png'
  },
  {
    title: 'Viagens Seguras',
    description: 'Motoristas verificados e monitoramento em tempo real',
    image: '/onboarding/slide2.png'
  },
  {
    title: 'Pagamento Fácil',
    description: 'Pague com cartão ou dinheiro, você escolhe',
    image: '/onboarding/slide3.png'
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
          className="h-screen flex flex-col"
        >
          {/* Imagem */}
          <div className="flex-1 relative bg-primary">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Conteúdo */}
          <div className="p-8 bg-white">
            <h2 className="text-2xl font-bold mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-gray-600 mb-8">
              {slides[currentSlide].description}
            </p>

            {/* Indicadores */}
            <div className="flex space-x-2 mb-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full flex-1 ${
                    index === currentSlide ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Botão */}
            <button
              onClick={handleNext}
              className="w-full bg-primary text-white py-4 rounded-lg font-medium"
            >
              {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 