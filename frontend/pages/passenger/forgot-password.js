import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../../lib/validations';
import api from '../../lib/api';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');
      
      await api.post('/auth/forgot-password', data);
      setEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar email de recuperação');
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

      {/* Conteúdo */}
      <div className="px-6 pt-8">
        <Link 
          href="/passenger/login" 
          className="flex items-center text-gray-600 mb-6"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </Link>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recuperar senha
        </h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {!emailSent ? (
          <>
            <p className="text-gray-600 mb-6">
              Digite seu email cadastrado para receber as instruções de recuperação de senha
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Botão Enviar */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium disabled:opacity-50"
              >
                {isLoading ? 'Enviando...' : 'Enviar instruções'}
              </button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800">Email enviado!</h3>
            <p className="text-gray-600">
              Verifique sua caixa de entrada e siga as instruções para recuperar sua senha
            </p>
            <Link 
              href="/passenger/login"
              className="block mt-6 text-primary font-medium"
            >
              Voltar para o login
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} 