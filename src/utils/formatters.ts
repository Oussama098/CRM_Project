export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

export const getStatusColor = (statut: string): string => {
  switch (statut) {
    case 'actif':
      return 'bg-green-100 text-green-800';
    case 'prospect':
      return 'bg-blue-100 text-blue-800';
    case 'inactif':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getActivityIcon = (type: string): string => {
  switch (type) {
    case 'appel':
      return '📞';
    case 'email':
      return '📧';
    case 'meeting':
      return '🤝';
    case 'note':
      return '📝';
    default:
      return '📋';
  }
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};