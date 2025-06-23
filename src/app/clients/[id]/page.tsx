"use client";

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, Building, Phone, Mail, Calendar, Activity, Info, Briefcase, Plus, Loader2 } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Client } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDateShort, getStatusColor } from '@/utils/formatters';

import { useClientContext } from '@/context/ClientContext';

export default function ClientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params?.id ? parseInt(params.id as string) : NaN;
  const { clients, loading, error, refreshClients } = useClientContext();
  const [client, setClient] = useState<Client | undefined>(undefined);
  const [pageError, setPageError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && clients.length > 0) {
      const foundClient = clients.find(c => c.id === clientId);
      if (foundClient) {
        setClient(foundClient);
        setPageError(null); 
      } else {
        setClient(undefined);
        setPageError("Client introuvable."); 
      }
    } else if (!loading && clients.length === 0 && !error) {
      setPageError("Aucun client n'a été chargé ou le client n'existe pas.");
    }
  }, [loading, clients, clientId, error]); 

  useEffect(() => {
    refreshClients();
  }, [refreshClients]);


  const handleLogout = () => {
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-gray-700 text-lg mt-4">Chargement des détails du client...</p>
      </div>
    );
  }

  if (error || pageError || isNaN(clientId)) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navigation onLogout={handleLogout} />
        <main className="flex-grow p-6 md:p-8 flex items-center justify-center">
          <Card className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur lors du chargement</h1>
            <p className="text-gray-600 mb-6">
              {pageError || error || "ID de client invalide."}
            </p>
            <Link href="/clients">
              <Button>Retour à la liste des clients</Button>
            </Link>
            {error && (
              <button onClick={refreshClients} className="mt-4 ml-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                Réessayer
              </button>
            )}
          </Card>
        </main>
        <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Mini CRM. Tous droits réservés.
        </footer>
      </div>
    );
  }


  if (!client) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navigation onLogout={handleLogout} />
            <main className="flex-grow p-6 md:p-8 flex items-center justify-center">
            <Card className="text-center py-12">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Client non trouvé</h1>
                <p className="text-gray-600 mb-6">Désolé, aucun client n'a été trouvé avec cet ID.</p>
                <Link href="/clients">
                <Button>Retour à la liste des clients</Button>
                </Link>
            </Card>
            </main>
            <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mini CRM. Tous droits réservés.
            </footer>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation onLogout={handleLogout} />
      <main className="flex-grow p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* return to Clients page */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/clients">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la liste
              </Button>
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-soft p-6 mb-8 flex items-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-2xl font-bold mr-4">
              {client.prenom[0]}{client.nom[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                {client.prenom} {client.nom}
                <span className={`ml-3 px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(client.statut)}`}>
                  {client.statut.charAt(0).toUpperCase() + client.statut.slice(1)}
                </span>
              </h1>
              <p className="text-gray-600 text-lg mt-1">{client.entreprise || 'Non spécifié'}</p>
            </div>
          </div>
          <Card className="lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Informations du client
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span>Email: {client.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>Téléphone: {client.telephone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span>Entreprise: {client.entreprise || '-'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>Date de création: {formatDateShort(client.dateCreation)}</span>
                </div>
              </div>
            </Card>
        </div>
      </main>
    </div>
  );
}