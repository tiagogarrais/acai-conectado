import { ComponentItem, Store, DeliveryType, User } from './types';

export const DEFAULT_COMPONENTS: ComponentItem[] = [
  { id: '1', name: 'Leite em Pó', weightPerServing: 15, imgUrl: 'https://i.imgur.com/8aV3L9f.png' },
  { id: '2', name: 'Castanha', weightPerServing: 20, imgUrl: 'https://i.imgur.com/k2H1zOf.png' },
  { id: '3', name: 'Kiwi', weightPerServing: 25, imgUrl: 'https://i.imgur.com/gA3gA0V.png' },
  { id: '4', name: 'Morango', weightPerServing: 30, imgUrl: 'https://i.imgur.com/7g2PK6w.png' },
  { id: '5', name: 'Banana', weightPerServing: 40, imgUrl: 'https://i.imgur.com/Y4V4H7t.png' },
  { id: '6', name: 'Granola', weightPerServing: 20, imgUrl: 'https://i.imgur.com/bBlB8c8.png' },
  { id: '7', name: 'Leite Condensado', weightPerServing: 15, imgUrl: 'https://i.imgur.com/8v2iSAn.png' },
  { id: '8', name: 'Mel', weightPerServing: 10, imgUrl: 'https://i.imgur.com/vHqL3v1.png' },
];

export const MOCK_STORES: Store[] = [
    {
        id: 'store1',
        name: 'Açaí Mania',
        state: 'São Paulo',
        city: 'São Paulo',
        neighborhood: 'Pinheiros',
        address: 'Rua dos Pinheiros, 123',
        cnpj: '12.345.678/0001-99',
        ownerName: 'João Silva',
        ownerPhone: '11987654321',
        instagram: '@acaimania',
        logoUrl: 'https://i.imgur.com/zSOOnXg.png',
        location: { lat: -23.56, lng: -46.69 },
        isPublic: true,
        deliveryType: DeliveryType.FIXED,
        deliveryFee: 5.00,
        pricePerKg: 40.00,
        components: DEFAULT_COMPONENTS.slice(0, 5),
        status: 'approved'
    },
    {
        id: 'store2',
        name: 'Point do Açaí',
        state: 'Rio de Janeiro',
        city: 'Rio de Janeiro',
        neighborhood: 'Copacabana',
        address: 'Av. Atlântica, 456',
        cnpj: '98.765.432/0001-11',
        ownerName: 'Maria Oliveira',
        ownerPhone: '21912345678',
        instagram: '@pointdoacai',
        logoUrl: 'https://i.imgur.com/n4Yn3uB.png',
        location: { lat: -22.97, lng: -43.18 },
        isPublic: true,
        deliveryType: DeliveryType.FREE,
        deliveryFee: 0,
        pricePerKg: 45.50,
        components: DEFAULT_COMPONENTS,
        status: 'approved'
    },
];

export const MOCK_USERS: Omit<User, 'role'>[] = [
    {
        id: 'user1',
        email: 'store@owner.com',
        // role: 'store', // Role will be assigned on first login
        storeId: 'store1', // Belongs to Açaí Mania
    },
    {
        id: 'user2',
        email: 'customer@test.com',
        // role: 'customer',
    },
    {
        id: 'user3',
        email: 'admin@test.com',
        // role: 'admin'
    }
];


export const BRAZILIAN_STATES = [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo',
    'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
    'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul',
    'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];
