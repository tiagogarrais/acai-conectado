import React, { useState, useMemo } from 'react';
import { Store, ComponentItem } from '../types';

interface AdminDashboardProps {
  stores: Store[];
  globalComponents: ComponentItem[];
  onStoreApprove: (storeId: string, approved: boolean) => void;
  onAddComponent: (newComponent: Omit<ComponentItem, 'id'>) => void;
}

type Tab = 'stores' | 'components';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stores, globalComponents, onStoreApprove, onAddComponent }) => {
    const [activeTab, setActiveTab] = useState<Tab>('stores');
    const [newComponent, setNewComponent] = useState({ name: '', weightPerServing: 0, imgUrl: '' });

    const pendingStores = useMemo(() => stores.filter(s => s.status === 'pending'), [stores]);

    const handleComponentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewComponent(prev => ({ ...prev, [name]: name === 'weightPerServing' ? parseFloat(value) : value }));
    };

    const handleComponentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComponent.name && newComponent.weightPerServing > 0 && newComponent.imgUrl) {
            onAddComponent(newComponent);
            setNewComponent({ name: '', weightPerServing: 0, imgUrl: '' });
        } else {
            alert('Por favor, preencha todos os campos do componente.');
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800">Painel do Administrador</h1>
                <p className="text-lg text-gray-600 mt-2">Gerencie lojas e componentes da plataforma.</p>
            </header>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('stores')} className={`${activeTab === 'stores' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        Aprovação de Lojas ({pendingStores.length})
                    </button>
                    <button onClick={() => setActiveTab('components')} className={`${activeTab === 'components' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        Gerenciar Componentes
                    </button>
                </nav>
            </div>

            {activeTab === 'stores' && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Lojas Pendentes de Aprovação</h2>
                    <div className="space-y-4">
                        {pendingStores.length > 0 ? pendingStores.map(store => (
                            <div key={store.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-lg text-gray-800">{store.name}</p>
                                    <p className="text-sm text-gray-600">{store.city}, {store.state}</p>
                                    <p className="text-sm text-gray-500">Responsável: {store.ownerName} ({store.ownerPhone})</p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => onStoreApprove(store.id, true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Aprovar</button>
                                    <button onClick={() => onStoreApprove(store.id, false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Rejeitar</button>
                                </div>
                            </div>
                        )) : <p className="text-gray-500">Nenhuma loja pendente no momento.</p>}
                    </div>
                </div>
            )}

            {activeTab === 'components' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Adicionar Novo Componente</h2>
                        <form onSubmit={handleComponentSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                             <input name="name" value={newComponent.name} onChange={handleComponentChange} placeholder="Nome do Componente (Ex: Paçoca)" className="p-2 border rounded-md w-full" />
                             <input type="number" name="weightPerServing" value={newComponent.weightPerServing} onChange={handleComponentChange} placeholder="Peso por porção (em gramas)" className="p-2 border rounded-md w-full" />
                             <input name="imgUrl" value={newComponent.imgUrl} onChange={handleComponentChange} placeholder="URL da Imagem" className="p-2 border rounded-md w-full" />
                             <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700">Adicionar Componente</button>
                        </form>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Componentes Globais</h2>
                        <div className="bg-white p-4 rounded-lg shadow-md max-h-96 overflow-y-auto">
                           <ul className="space-y-2">
                                {globalComponents.map(comp => (
                                    <li key={comp.id} className="flex items-center gap-4 p-2 bg-gray-50 rounded">
                                        <img src={comp.imgUrl} alt={comp.name} className="w-10 h-10 object-contain rounded-md" />
                                        <span className="font-medium text-gray-700">{comp.name}</span>
                                        <span className="text-sm text-gray-500 ml-auto">{comp.weightPerServing}g</span>
                                    </li>
                                ))}
                           </ul>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;
