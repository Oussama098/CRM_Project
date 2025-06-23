export interface Client {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateCreation: string;
  entreprise?: string;
  statut: 'actif' | 'inactif' | 'prospect';
 
}



export interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
}

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}