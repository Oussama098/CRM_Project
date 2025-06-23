'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher...",
  className = ""
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        leftIcon={<Search />}
        rightIcon={
          value && (
            <button
              onClick={handleClear}
              className="hover:bg-gray-100 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )
        }
        className="pr-10"
      />
    </div>
  );
};