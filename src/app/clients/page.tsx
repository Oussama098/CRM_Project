"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { PlusCircle } from 'lucide-react';

import { Navigation } from '@/components/layout/Navigation';
import { ClientList } from '@/components/clients/ClientList';

import { useClientContext } from '@/context/ClientContext';

export default function ClientsPage() {
  const router = useRouter();
  const { clients, loading, error, refreshClients } = useClientContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');


  useEffect(() => {
    refreshClients();
  }, [refreshClients]); 

  const handleLogout = () => {
    console.log('User logged out (mock action)');
    router.push('/login');
  };

  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.entreprise?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const sortedClients = useMemo(() => {
    const sorted = [...filteredClients].sort((a, b) => {
      const nameA = `${a.prenom} ${a.nom}`.toLowerCase();
      const nameB = `${b.prenom} ${b.nom}`.toLowerCase();

      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    return sorted;
  }, [filteredClients, sortOrder]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <p className="text-gray-700 text-lg">Chargement des clients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <p className="text-red-600 text-lg">Erreur: {error}</p>
        <button onClick={refreshClients} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation onLogout={handleLogout} />

      <main className="flex-grow p-6 md:p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Liste des Clients</h1>
            <Link href="/add-client" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus-ring">
              <PlusCircle className="mr-2 h-5 w-5" />
              Ajouter un client
            </Link>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher un client..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <ClientList
            clients={sortedClients}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        </div>
      </main>
    </div>
  );
}