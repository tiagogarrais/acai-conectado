import React, { useState } from 'react';
import { GoogleIcon } from './icons';

interface AuthPageProps {
  onAuth: (email: string) => void;
  googleMockEmails: string[];
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth, googleMockEmails }) => {
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onAuth(email);
    setMagicLinkSent(true);
  };
  
  const handleGoogleSignIn = () => {
    // In a real app, this would trigger the Google OAuth flow.
    // Here, we'll just use a prompt to simulate selecting a Google account.
    const selectedEmail = prompt(`Simulação: Qual conta Google deseja usar?\nOpções: ${googleMockEmails.join(', ')}`, googleMockEmails[0]);
    if (selectedEmail && googleMockEmails.includes(selectedEmail)) {
        onAuth(selectedEmail);
    } else if (selectedEmail) {
        alert("Email inválido. Por favor, escolha um da lista.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-600">Acesse sua Conta</h1>
          <p className="text-gray-500">Bem-vindo(a) de volta!</p>
        </div>
        
        <div className="space-y-4">
            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
                <GoogleIcon className="w-5 h-5" />
                Entrar com Google
            </button>
        </div>
        
        <div className="my-6 flex items-center justify-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500 text-sm">OU</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleMagicLinkSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.email@exemplo.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {magicLinkSent ? 'Verifique seu Email!' : 'Enviar Link Mágico'}
            </button>
          </div>
        </form>
         {magicLinkSent && <p className="mt-4 text-center text-sm text-green-600">Um link de acesso foi enviado para seu e-mail (simulação).</p>}

      </div>
    </div>
  );
};

export default AuthPage;
