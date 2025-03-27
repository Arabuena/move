import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../lib/validations';
import api from '../../lib/api';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await api.post('/auth/register', data);
      
      // Guarda o token
      localStorage.setItem('token', response.data.token);
      
      // Redireciona para a home
      router.push('/passenger/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta');
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
          Crie sua conta
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Digite seu nome"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Digite seu email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Celular
            </label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="(00) 00000-0000"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Crie uma senha"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Termos */}
          <div className="flex items-start space-x-2">
            <input
              {...register('terms')}
              type="checkbox"
              className="mt-1 focus:ring-primary text-primary border-gray-300 rounded"
            />
            <p className="text-sm text-gray-600">
              Li e aceito os{' '}
              <Link href="/terms" className="text-primary font-medium">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link href="/privacy" className="text-primary font-medium">
                Política de Privacidade
              </Link>
            </p>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-600">{errors.terms.message}</p>
          )}

          {/* Botão Registrar */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>

          {/* Login */}
          <p className="text-center text-gray-600">
            Já tem uma conta?{' '}
            <Link href="/passenger/login" className="text-primary font-medium">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
} 