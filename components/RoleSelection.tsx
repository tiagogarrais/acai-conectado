import React from 'react';
import { UserIcon, StoreIcon } from './icons';

type UserRole = 'customer' | 'store';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-2">Só mais um passo!</h1>
        <p className="text-gray-600 mb-8">Para personalizar sua experiência, nos diga quem você é.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectRole('customer')}
            className="flex flex-col items-center justify-center p-8 border-2 rounded-xl text-gray-700 hover:border-purple-500 hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <UserIcon className="h-12 w-12 mb-4" />
            <span className="text-xl font-semibold">Sou Cliente</span>
            <span className="text-sm mt-1">Quero encontrar o melhor açaí!</span>
          </button>
          
          <button
            onClick={() => onSelectRole('store')}
            className="flex flex-col items-center justify-center p-8 border-2 rounded-xl text-gray-700 hover:border-pink-500 hover:bg-pink-50 hover:text-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            <StoreIcon className="h-12 w-12 mb-4" />
            <span className="text-xl font-semibold">Sou Lojista</span>
            <span className="text-sm mt-1">Quero cadastrar minha loja!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;