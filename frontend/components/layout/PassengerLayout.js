import { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: UserCircleIcon, label: 'Perfil', href: '/passenger/profile' },
    { icon: ClockIcon, label: 'Histórico', href: '/passenger/history' },
    { icon: CreditCardIcon, label: 'Pagamento', href: '/passenger/payment' },
    { icon: QuestionMarkCircleIcon, label: 'Ajuda', href: '/passenger/help' },
    { icon: Cog6ToothIcon, label: 'Configurações', href: '/passenger/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary fixed top-0 left-0 right-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white p-2"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h1 className="text-white text-lg font-semibold">Move</h1>
          <div className="w-6" /> {/* Espaçador */}
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
      <main className="pt-16 pb-safe-bottom">
        {children}
      </main>
    </div>
  );
} 