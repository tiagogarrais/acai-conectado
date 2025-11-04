import React, { useState } from 'react';
import { Store, DeliveryType, ComponentItem, Coordinates } from '../types';
import { BRAZILIAN_STATES } from '../constants';
import { useGeolocation } from '../hooks/useGeolocation';
import { MapPinIcon } from './icons';

interface StoreSetupProps {
    onStoreCreated: (store: Omit<Store, 'id' | 'status'>) => void;
    globalComponents: ComponentItem[];
}

const StoreSetup: React.FC<StoreSetupProps> = ({ onStoreCreated, globalComponents }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<Omit<Store, 'id' | 'status'>>>({
        isPublic: false, // will be set by admin
        deliveryType: DeliveryType.FIXED,
        components: [],
    });
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const { data: geoData, loading: geoLoading, getLocation } = useGeolocation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
                setFormData(prev => ({ ...prev, logoUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLocationClick = () => {
        getLocation();
    };

    React.useEffect(() => {
        if(geoData) {
            setFormData(prev => ({...prev, location: geoData as Coordinates}))
        }
    }, [geoData])

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStoreCreated(formData as Omit<Store, 'id' | 'status'>);
    };

    const toggleComponent = (component: ComponentItem) => {
        setFormData(prev => {
            const currentComponents = prev.components || [];
            const isSelected = currentComponents.some(c => c.id === component.id);
            if (isSelected) {
                return { ...prev, components: currentComponents.filter(c => c.id !== component.id) };
            } else {
                return { ...prev, components: [...currentComponents, component] };
            }
        });
    };


    const renderStep1 = () => (
        <>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Dados da Loja</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <input name="name" placeholder="Nome da Loja" onChange={handleChange} className="p-2 border rounded-md" />
                <input name="cnpj" placeholder="CNPJ" onChange={handleChange} className="p-2 border rounded-md" />
                <select name="state" onChange={handleChange} className="p-2 border rounded-md">
                    <option value="">Selecione o Estado</option>
                    {BRAZILIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                <input name="city" placeholder="Cidade" onChange={handleChange} className="p-2 border rounded-md" />
                <input name="neighborhood" placeholder="Bairro" onChange={handleChange} className="p-2 border rounded-md" />
                <input name="address" placeholder="Endereço" onChange={handleChange} className="p-2 border rounded-md" />
                <input name="ownerName" placeholder="Pessoa Responsável" onChange={handleChange} className="p-2 border rounded-md" />
                <input name="ownerPhone" placeholder="Telefone do Responsável" onChange={handleChange} className="p-2 border rounded-md" />
                <input name="instagram" placeholder="Instagram da Loja" onChange={handleChange} className="p-2 border rounded-md" />
                <div>
                    <label className="block text-sm font-medium text-gray-700">Logomarca (quadrada)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/>
                    {logoPreview && <img src={logoPreview} alt="Preview" className="mt-2 w-24 h-24 rounded-md object-cover" />}
                </div>
                 <div className="md:col-span-2">
                    <button type="button" onClick={handleLocationClick} className="w-full flex items-center justify-center gap-2 p-2 border rounded-md bg-gray-100 hover:bg-gray-200">
                        <MapPinIcon className="w-5 h-5"/> {geoLoading ? 'Buscando...' : (geoData ? `Localização: ${geoData.lat.toFixed(3)}, ${geoData.lng.toFixed(3)}` : 'Obter Ponto de GPS da Loja')}
                    </button>
                </div>
                <div className="md:col-span-2 p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
                    <p className="text-sm">Sua loja será enviada para análise e, após aprovação, ficará visível para os clientes.</p>
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <button onClick={nextStep} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">Próximo</button>
            </div>
        </>
    );

    const renderStep2 = () => (
        <>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Entrega e Preço</h2>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Custo de Entrega</label>
                    <div className="mt-2 flex gap-4">
                        {Object.values(DeliveryType).map(type => (
                            <label key={type} className="flex items-center">
                                <input type="radio" name="deliveryType" value={type} checked={formData.deliveryType === type} onChange={(e) => setFormData(p => ({...p, deliveryType: e.target.value as DeliveryType}))} className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                                <span className="ml-2 text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                    {formData.deliveryType === DeliveryType.FIXED && (
                        <input type="number" name="deliveryFee" placeholder="Valor fixo da entrega" onChange={handleChange} className="mt-2 p-2 border rounded-md w-full" />
                    )}
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Valor do Quilo do Açaí (R$)</label>
                    <input type="number" name="pricePerKg" placeholder="Ex: 40.00" onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" />
                </div>
            </div>
             <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Voltar</button>
                <button onClick={nextStep} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">Próximo</button>
            </div>
        </>
    );

    const renderStep3 = () => (
         <>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">Componentes do Açaí</h2>
            <p className="text-gray-600 mb-4">Selecione os itens que sua loja oferece a partir da nossa base de dados.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {globalComponents.map(comp => {
                    const isSelected = formData.components?.some(c => c.id === comp.id);
                    return (
                        <button key={comp.id} onClick={() => toggleComponent(comp)} className={`p-2 border-2 rounded-lg text-center transition-all duration-200 ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}>
                            <img src={comp.imgUrl} alt={comp.name} className="w-16 h-16 mx-auto mb-2 object-contain" />
                            <span className="text-sm font-medium text-gray-700">{comp.name}</span>
                        </button>
                    );
                })}
            </div>
             <div className="flex justify-between mt-8">
                <button onClick={prevStep} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300">Voltar</button>
                <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Enviar para Aprovação</button>
            </div>
        </>
    );

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>
        </div>
    );
};

export default StoreSetup;
