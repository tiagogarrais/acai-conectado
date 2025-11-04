import React from 'react';

interface LandingPageProps {
  onNavigate: (view: 'auth') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 p-4 text-white">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">Açaí Connect</h1>
        <p className="text-lg md:text-xl font-light">Sua plataforma para encontrar e vender o melhor açaí.</p>
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-8">Pronto para começar?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate('auth')}
            className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Criar minha conta
          </button>
          <button
            onClick={() => onNavigate('auth')}
            className="bg-white/30 backdrop-blur-sm font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            Já tenho uma conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;