import { FormData } from '@/types';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+33|0)[1-9](\s?\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateForm = (formData: FormData): Partial<FormData> => {
  const errors: Partial<FormData> = {};
  
  if (!formData.nom.trim()) {
    errors.nom = 'Le nom est requis';
  }
  
  if (!formData.prenom.trim()) {
    errors.prenom = 'Le prénom est requis';
  }
  
  if (!formData.email.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Format d\'email invalide';
  }
  
  if (!formData.telephone.trim()) {
    errors.telephone = 'Le téléphone est requis';
  } else if (!validatePhone(formData.telephone)) {
    errors.telephone = 'Format de téléphone invalide (ex: 06 12 34 56 78)';
  }

  return errors;
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(?=\d)/g, '$1 ');
};