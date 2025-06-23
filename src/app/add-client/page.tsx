"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Client } from '@/types'; 
import { useClientContext } from '@/context/ClientContext'; 

export default function AddClientPage() {
  const router = useRouter();
  const { addClient, refreshClients } = useClientContext();

  // Initial state for the new client form
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    statut: 'prospect',
    dateCreation: new Date().toISOString().split('T')[0],
  });


  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false); 


  const handleLogout = () => {
    console.log('User logged out bye bye');
    router.push('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!newClient.nom.trim()) newErrors.nom = 'Le nom est requis.';
    if (!newClient.prenom.trim()) newErrors.prenom = 'Le prénom est requis.';
    if (!newClient.email.trim()) newErrors.email = 'L\'email est requis.';
    else if (!/\S+@\S+\.\S+/.test(newClient.email)) newErrors.email = 'Email invalide.';
    if (!newClient.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis.';
    } else if (!/^[\d\s\-\+()]{7,20}$/.test(newClient.telephone.trim())) {
      newErrors.telephone = 'Numéro de téléphone invalide (doit contenir au moins 7 caractères et peut inclure des chiffres, espaces, tirets, parenthèses ou un "+" initial).';
    }
    if (!newClient.entreprise?.trim()) newErrors.entreprise = 'L\'entreprise est requise.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; 
    setIsSubmitting(true);

    if (!validateForm()) {
      
      setIsSubmitting(false);
      return;
    }

    try {
      const addedClient = await addClient(newClient);
      if (addedClient) {
        alert('Client ajouté avec succès !');
        await refreshClients();
        router.push('/clients'); 
      } else {
        alert('Échec de l\'ajout du client. Veuillez vérifier la console pour plus de détails.');
      }
    } catch (error) {
      console.error('Error during client submission:', error);
      alert('Une erreur inattendue est survenue lors de l\'ajout du client.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation onLogout={handleLogout} />

      <main className="flex-grow p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/clients">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la liste
              </Button>
            </Link>
          </div>

          <Card>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un nouveau client</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* les infos personelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={newClient.prenom}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.prenom ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.prenom && <p className="mt-1 text-xs text-red-600">{errors.prenom}</p>}
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={newClient.nom}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.nom ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.nom && <p className="mt-1 text-xs text-red-600">{errors.nom}</p>}
                </div>
              </div>

              {/* contact infos*/}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newClient.email}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={newClient.telephone}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.telephone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.telephone && <p className="mt-1 text-xs text-red-600">{errors.telephone}</p>}
                </div>
              </div>

              {/* status et contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input
                    type="text"
                    id="entreprise"
                    name="entreprise"
                    value={newClient.entreprise}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      errors.entreprise ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.entreprise && <p className="mt-1 text-xs text-red-600">{errors.entreprise}</p>}
                </div>
                <div>
                  <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                  <select
                    id="statut"
                    name="statut"
                    value={newClient.statut}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="prospect">Prospect</option>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                  </select>
                </div>
              </div>

              {/* date de creation */}
              <div>
                <label htmlFor="dateCreation" className="block text-sm font-medium text-gray-700 mb-1">Date de création</label>
                <input
                  type="date"
                  id="dateCreation"
                  name="dateCreation"
                  value={newClient.dateCreation}
                  readOnly
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 sm:text-sm"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="px-6 py-2" disabled={isSubmitting}>
                  {isSubmitting ? 'Ajout en cours...' : 'Ajouter le client'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      
    </div>
  );
}