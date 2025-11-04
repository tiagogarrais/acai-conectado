import React, { useState, useMemo } from 'react';
// FIX: Import DeliveryType to resolve reference error.
import { Store, DeliveryType } from '../types';
import { BRAZILIAN_STATES } from '../constants';

interface CustomerHomeProps {
  stores: Store[];
  onSelectStore: (storeId: string) => void;
}

type SortOption = 'price' | 'alpha' | 'proximity';

const CustomerHome: React.FC<CustomerHomeProps> = ({ stores, onSelectStore }) => {
  const [filters, setFilters] = useState({ state: '', city: '' });
  const [sortBy, setSortBy] = useState<SortOption>('proximity');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredAndSortedStores = useMemo(() => {
    let result = stores.filter(store => store.isPublic && store.status === 'approved');

    if (filters.state) {
      result = result.filter(store => store.state === filters.state);
    }
    if (filters.city) {
      result = result.filter(store => store.city.toLowerCase().includes(filters.city.toLowerCase()));
    }

    switch (sortBy) {
        case 'price':
            result.sort((a, b) => a.pricePerKg - b.pricePerKg);
            break;
        case 'alpha':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'proximity':
            // Proximity sorting would require user's location.
            // For this example, we'll keep the default order.
            break;
    }

    return result;
  }, [stores, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-purple-700">Encontre o melhor Açaí</h1>
            <p className="text-lg text-gray-600 mt-2">Filtre por sua localização e escolha sua loja preferida.</p>
        </header>
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 sticky top-4 z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <select name="state" onChange={handleFilterChange} value={filters.state} className="p-3 border rounded-md bg-gray-50">
                    <option value="">Todos os Estados</option>
                    {BRAZILIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                <input name="city" placeholder="Digite sua cidade" onChange={handleFilterChange} value={filters.city} className="p-3 border rounded-md bg-gray-50" />
                <button className="p-3 border rounded-md bg-gray-100 hover:bg-gray-200">Usar minha localização</button>
            </div>
            <div className="mt-4 flex justify-center items-center gap-4">
                 <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
                 <div className="flex gap-2">
                    {(['proximity', 'price', 'alpha'] as SortOption[]).map(option => (
                        <button key={option} onClick={() => setSortBy(option)} className={`px-4 py-1 text-sm rounded-full ${sortBy === option ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            { {price: 'Preço', alpha: 'Ordem Alfabética', proximity: 'Proximidade'}[option] }
                        </button>
                    ))}
                 </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedStores.map(store => (
                <div key={store.id} onClick={() => onSelectStore(store.id)} className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="h-40 bg-purple-200 flex items-center justify-center">
                        <img src={store.logoUrl} alt={`${store.name} logo`} className="h-32 w-32 object-contain" />
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800">{store.name}</h3>
                        <p className="text-gray-600 mt-1">{store.city}, {store.state}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-xl font-semibold text-green-600">
                                R${store.pricePerKg.toFixed(2)}
                                <span className="text-sm font-normal text-gray-500"> /kg</span>
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-full ${store.deliveryType === DeliveryType.FREE ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                Entrega {store.deliveryType}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CustomerHome;
