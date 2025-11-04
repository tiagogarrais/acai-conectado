import React, { useState } from 'react';
import { Store, ComponentItem } from '../types';
import { DollarSignIcon, WeightIcon } from './icons';

interface AcaiBuilderProps {
  store: Store;
  onBack: () => void;
}

const AcaiBowlVisual: React.FC<{ items: ComponentItem[], logoUrl: string }> = ({ items, logoUrl }) => (
    <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <path d="M 30 50 Q 30 30, 50 30 H 150 Q 170 30, 170 50 L 140 170 Q 130 190, 100 190 Q 70 190, 60 170 Z" fill="#4B0082" stroke="#3A006A" strokeWidth="4" />
        </svg>
        <img src={logoUrl} alt="Store Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-20" />
        <div className="absolute inset-0 flex flex-wrap items-center justify-center p-8 gap-1">
            {items.slice(0, 10).map((item, index) => (
                <img key={`${item.id}-${index}`} src={item.imgUrl} alt={item.name} className="w-6 h-6 animate-pulse" style={{ animationDelay: `${index * 100}ms` }}/>
            ))}
        </div>
    </div>
);


const AcaiBuilder: React.FC<AcaiBuilderProps> = ({ store, onBack }) => {
    const [bowlItems, setBowlItems] = useState<ComponentItem[]>([]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const itemString = e.dataTransfer.getData('application/json');
        if (itemString) {
            const item = JSON.parse(itemString) as ComponentItem;
            setBowlItems(prev => [...prev, item]);
        }
        e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-purple-500', 'bg-purple-50');
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove('border-purple-500', 'bg-purple-50');
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: ComponentItem) => {
        e.dataTransfer.setData('application/json', JSON.stringify(item));
    };

    const removeItem = (index: number) => {
        setBowlItems(prev => prev.filter((_, i) => i !== index));
    };

    const totalWeight = bowlItems.reduce((sum, item) => sum + item.weightPerServing, 0);
    const acaiPrice = (totalWeight / 1000) * store.pricePerKg;
    const finalPrice = acaiPrice + store.deliveryFee;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
            <div className="w-full lg:w-1/4 bg-white p-6 shadow-lg">
                <button onClick={onBack} className="mb-4 text-purple-600 hover:underline">← Voltar para lojas</button>
                <h2 className="text-2xl font-bold">Ingredientes</h2>
                <p className="text-sm text-gray-500 mb-4">Arraste os itens para o copo</p>
                <div className="grid grid-cols-3 gap-4">
                    {store.components.map(item => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item)}
                            className="flex flex-col items-center p-2 rounded-lg border bg-gray-50 cursor-grab active:cursor-grabbing"
                        >
                            <img src={item.imgUrl} alt={item.name} className="w-12 h-12 object-contain" />
                            <span className="text-xs text-center mt-1">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div 
                className="flex-1 p-8 flex flex-col items-center justify-center transition-colors duration-300"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Monte seu Açaí na <span className="text-purple-600">{store.name}</span></h1>
                <AcaiBowlVisual items={bowlItems} logoUrl={store.logoUrl} />
                <div className="grid grid-cols-2 gap-8 mt-8 w-full max-w-md">
                    <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center gap-4">
                        <WeightIcon className="w-10 h-10 text-blue-500"/>
                        <div>
                            <p className="text-sm text-gray-500">Peso</p>
                            <p className="text-2xl font-bold">{totalWeight} g</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-md flex items-center justify-center gap-4">
                        <DollarSignIcon className="w-10 h-10 text-green-500"/>
                        <div>
                            <p className="text-sm text-gray-500">Valor</p>
                            <p className="text-2xl font-bold">R$ {acaiPrice.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w-full lg:w-1/4 bg-white p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Seu Pedido</h2>
                <div className="h-64 overflow-y-auto mb-4 pr-2">
                    {bowlItems.length === 0 ? (
                        <p className="text-gray-500 text-center mt-8">Arraste ingredientes para começar.</p>
                    ) : (
                    <ul className="space-y-2">
                        {bowlItems.map((item, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div className="flex items-center gap-2">
                                    <img src={item.imgUrl} alt={item.name} className="w-6 h-6"/>
                                    <span className="text-sm">{item.name}</span>
                                </div>
                                <button onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700">
                                    remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
                <div className="border-t pt-4 space-y-2">
                     <div className="flex justify-between text-lg"><span>Subtotal</span><span>R$ {acaiPrice.toFixed(2)}</span></div>
                     <div className="flex justify-between text-lg"><span>Entrega</span><span>R$ {store.deliveryFee.toFixed(2)}</span></div>
                     <div className="flex justify-between text-2xl font-bold text-purple-700 mt-2"><span>Total</span><span>R$ {finalPrice.toFixed(2)}</span></div>
                </div>
                <button className="w-full bg-green-600 text-white p-4 rounded-lg mt-6 font-bold text-lg hover:bg-green-700 transition-colors">Finalizar Pedido</button>
            </div>
        </div>
    );
};

export default AcaiBuilder;
