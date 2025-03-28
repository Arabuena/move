import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/validations';
import api from '../../lib/api';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await api.post('/auth/login', data);
      
      // Guarda o token
      localStorage.setItem('token', response.data.token);
      
      // Redireciona para a home
      router.push('/passenger/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header com Logo */}
      <div className="bg-primary h-48 rounded-b-[40px] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white">Move</h1>
        </motion.div>
      </div>

      {/* Formulário */}
      <div className="px-6 pt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Bem-vindo de volta
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <form 
          action="https://move-app.onrender.com/api/auth/login" 
          method="POST"
          className="space-y-6"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Seu email"
              required
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              name="password"
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Sua senha"
              required
            />
          </div>

          {/* Esqueci a senha */}
          <div className="text-right">
            <Link 
              href="/passenger/forgot-password" 
              className="text-primary text-sm font-medium"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          >
            Entrar
          </button>

          {/* Divisor */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm text-gray-500">
                ou continue com
              </span>
            </div>
          </div>

          {/* Botões Sociais */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg">
              <img src="/google.svg" alt="Google" className="w-5 h-5" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg">
              <img src="/apple.svg" alt="Apple" className="w-5 h-5" />
              <span>Apple</span>
            </button>
          </div>

          {/* Criar conta */}
          <p className="text-center text-gray-600">
            Não tem uma conta?{' '}
            <Link 
              href="/passenger/register" 
              className="text-primary font-medium"
            >
              Registre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 