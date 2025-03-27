import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
});

export const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(11, 'Celular inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  terms: z.boolean().refine(val => val === true, {
    message: 'Você precisa aceitar os termos'
  })
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
}); 