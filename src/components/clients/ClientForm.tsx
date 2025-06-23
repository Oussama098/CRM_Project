'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Building } from 'lucide-react';
import { FormData } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { validateForm } from '@/utils/validation';

interface ClientFormProps {
  onSubmit: (data: FormData) => Promise<boolean>;
  loading?: boolean;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await onSubmit(formData);
      if (success) {
        // Reset du formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          entreprise: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du client</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Prénom *"
              placeholder="Jean"
              value={formData.prenom}
              onChange={(e) => handleInputChange('prenom', e.target.value)}
              error={errors.prenom}
              leftIcon={<User />}
              disabled={isSubmitting}
            />
            
            <Input
              label="Nom *"
              placeholder="Martin"
              value={formData.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              error={errors.nom}
              leftIcon={<User />}
              disabled={isSubmitting}
            />
          </div>

          <Input
            label="Email *"
            type="email"
            placeholder="jean.martin@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            leftIcon={<Mail />}
            disabled={isSubmitting}
          />

          <Input
            label="Téléphone *"
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.telephone}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            error={errors.telephone}
            leftIcon={<Phone />}
            helperText="Format: 06 12 34 56 78 ou +33 6 12 34 56 78"
            disabled={isSubmitting}
          />

          <Input
            label="Entreprise"
            placeholder="Nom de l'entreprise"
            value={formData.entreprise}
            onChange={(e) => handleInputChange('entreprise', e.target.value)}
            error={errors.entreprise}
            leftIcon={<Building />}
            disabled={isSubmitting}
          />

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData({
                  nom: '',
                  prenom: '',
                  email: '',
                  telephone: '',
                  entreprise: ''
                });
                setErrors({});
              }}
              disabled={isSubmitting}
            >
              Réinitialiser
            </Button>
            
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Ajouter le client
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};