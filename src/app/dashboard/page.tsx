"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Navigation } from '@/components/layout/Navigation';
import { useClientContext } from '@/context/ClientContext'; 


export default function DashboardPage() {
  const router = useRouter();

  const { clients, loading, error, refreshClients } = useClientContext();

  useEffect(() => {
    refreshClients();
  }, [refreshClients]);

  const handleLogout = () => {
    console.log('User logged out (mock action)');
    router.push('/login');
  };


  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <p className="text-gray-700 text-lg">Chargement du tableau de bord...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <p className="text-red-600 text-lg">Erreur lors du chargement du tableau de bord: {error}</p>
        <button onClick={refreshClients} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
          Réessayer
        </button>
      </div>
    );
  }


  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.statut === 'actif').length;
  const prospects = clients.filter(client => client.statut === 'prospect').length;
  
  const currentMonth = new Date().toISOString().slice(0, 7); 
  const newClientsThisMonth = clients.filter(client =>
    client.dateCreation && client.dateCreation.startsWith(currentMonth)
  ).length;


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation onLogout={handleLogout} />
      <main className="flex-grow p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Clients Totaux</h2>
              <p className="text-4xl font-bold text-blue-600 mt-2">{totalClients}</p>
            </Card>
            <Card className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Clients Actifs</h2>
              <p className="text-4xl font-bold text-green-600 mt-2">{activeClients}</p>
            </Card>
            <Card className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Nouveaux Clients (Ce mois)</h2>
              <p className="text-4xl font-bold text-purple-600 mt-2">{newClientsThisMonth}</p>
            </Card>
            <Card className="p-5">
              <h2 className="text-lg font-semibold text-gray-700">Prospects</h2>
              <p className="text-4xl font-bold text-yellow-600 mt-2">{prospects}</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}