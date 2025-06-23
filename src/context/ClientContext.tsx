"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Client } from '@/types';

interface ClientContextType {
  clients: Client[];
  loading: boolean; 
  error: string | null; 
  addClient: (client: Omit<Client, 'id'>) => Promise<Client | undefined>;
  refreshClients: () => Promise<void>;
}
const ClientContext = createContext<ClientContextType | undefined>(undefined);

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clients'); // Fetch from your new API route
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Client[] = await response.json();
      setClients(data);
    } catch (err: any) {
      console.error('Failed to fetch clients:', err);
      setError(err.message || 'Failed to load clients.');
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const addClient = async (newClientData: Omit<Client, 'id'>): Promise<Client | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClientData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedClient: Client = await response.json();

      console.log('Client added via API:', addedClient);
      await fetchClients(); 
      return addedClient;
    } catch (err: any) {
      console.error('Failed to add client:', err);
      setError(err.message || 'Failed to add client.');
    } finally {
      setLoading(false); 
    }
    return undefined;
  };

  const refreshClients = fetchClients;

  const contextValue: ClientContextType = {
    clients,
    loading,
    error,
    addClient,
    refreshClients,
  };

  return (
    <ClientContext.Provider value={contextValue}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClientContext must be used within a ClientProvider');
  }
  return context;
};