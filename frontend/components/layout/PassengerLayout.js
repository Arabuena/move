import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  Bars3Icon, 
  UserCircleIcon, 
  ClockIcon, 
  CreditCardIcon, 
  QuestionMarkCircleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function PassengerLayout({ children }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: UserCircleIcon, label: 'Perfil', href: '/passenger/profile' },
    { icon: ClockIcon, label: 'Histórico', href: '/passenger/history' },
    { icon: CreditCardIcon, label: 'Pagamento', href: '/passenger/payment' },
    { icon: QuestionMarkCircleIcon, label: 'Ajuda', href: '/passenger/help' },
    { icon: Cog6ToothIcon, label: 'Configurações', href: '/passenger/settings' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-primary">Move</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Menu Lateral */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ type: 'tween' }}
        className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50"
      >
        <div className="p-4 bg-primary">
          <div className="flex items-center space-x-3">
            <UserCircleIcon className="w-12 h-12 text-white" />
            <div>
              <p className="text-white font-semibold">Nome do Usuário</p>
              <p className="text-primary-200 text-sm">Ver perfil</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <item.icon className="w-6 h-6" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black z-40"
        />
      )}

      {/* Conteúdo Principal */}
      <main className="pt-14">
        {children}
      </main>
    </motion.div>
  );
} 