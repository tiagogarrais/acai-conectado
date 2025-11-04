import React from 'react';
import { User } from '../types';
import { SettingsIcon } from './icons';

interface HeaderProps {
    currentUser: User | null;
    onLogout: () => void;
    onNavigate: (view: 'auth' | 'landing' | 'customer_home' | 'admin_dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onNavigate }) => {
    return (
        <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <button onClick={() => onNavigate(currentUser ? 'customer_home' : 'landing')} className="text-2xl font-bold tracking-tight">
                            Açaí Connect
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                            <>
                                {currentUser.role === 'admin' && (
                                     <button
                                        onClick={() => onNavigate('admin_dashboard')}
                                        className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        <SettingsIcon className="w-4 h-4" />
                                        Admin
                                    </button>
                                )}
                                <span className="hidden sm:block text-sm">Olá, {currentUser.email}</span>
                                <button
                                    onClick={onLogout}
                                    className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => onNavigate('auth')}
                                    className="hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => onNavigate('auth')}
                                    className="bg-white text-purple-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Cadastre-se
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
