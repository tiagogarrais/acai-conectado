export enum DeliveryType {
  FREE = 'Grátis',
  FIXED = 'Valor Fixo',
  DISTANCE = 'Por Distância',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ComponentItem {
  id: string;
  name: string;
  weightPerServing: number; // in grams
  imgUrl: string;
}

export interface Store {
  id: string;
  name: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  cnpj: string;
  ownerName: string;
  ownerPhone: string;
  instagram: string;
  logoUrl: string;
  location: Coordinates;
  isPublic: boolean;
  deliveryType: DeliveryType;
  deliveryFee: number; // Fixed value or base value for distance
  pricePerKg: number;
  components: ComponentItem[];
  status: 'pending' | 'approved' | 'rejected';
}

export interface User {
  id: string;
  email: string;
  role: 'customer' | 'store' | 'admin';
  storeId?: string;
}
