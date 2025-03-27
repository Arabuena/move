import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Página não encontrada</p>
        <Link 
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium"
        >
          Voltar para o início
        </Link>
      </motion.div>
    </div>
  );
} 