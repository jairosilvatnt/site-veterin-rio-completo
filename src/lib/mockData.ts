import { addDays, subDays } from 'date-fns'

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  type: 'Farm' | 'Domestic'
  location: string
  animalsCount: number
}

export interface Animal {
  id: string
  name: string
  species: string
  breed: string
  age: number
  weight: number
  ownerId: string
  ownerName: string
  status: 'Healthy' | 'Treatment' | 'Recovery'
  image: string
}

export interface Appointment {
  id: string
  title: string
  date: Date
  animalId: string
  animalName: string
  clientName: string
  status: 'Scheduled' | 'Completed' | 'Cancelled'
  type: 'Consultation' | 'Vaccination' | 'Surgery'
}

export interface Medication {
  id: string
  name: string
  stock: number
  unit: string
  price: number
  expiryDate: string
}

export interface Budget {
  id: string
  clientName: string
  total: number
  status: 'Pending' | 'Approved' | 'Invoiced'
  date: string
}

export const clients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@farm.com',
    phone: '(11) 99999-9999',
    type: 'Farm',
    location: 'Fazenda Santa Rita',
    animalsCount: 45,
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@gmail.com',
    phone: '(11) 98888-8888',
    type: 'Domestic',
    location: 'São Paulo, SP',
    animalsCount: 2,
  },
  {
    id: '3',
    name: 'Carlos Souza',
    email: 'carlos@agro.com',
    phone: '(14) 97777-7777',
    type: 'Farm',
    location: 'Sítio Boa Vista',
    animalsCount: 120,
  },
  {
    id: '4',
    name: 'Ana Pereira',
    email: 'ana@yahoo.com',
    phone: '(21) 96666-6666',
    type: 'Domestic',
    location: 'Rio de Janeiro, RJ',
    animalsCount: 1,
  },
]

export const animals: Animal[] = [
  {
    id: '1',
    name: 'Mimosa',
    species: 'Bovino',
    breed: 'Holandesa',
    age: 4,
    weight: 450,
    ownerId: '1',
    ownerName: 'João Silva',
    status: 'Healthy',
    image: 'https://img.usecurling.com/p/200/200?q=cow',
  },
  {
    id: '2',
    name: 'Rex',
    species: 'Canino',
    breed: 'Labrador',
    age: 2,
    weight: 32,
    ownerId: '2',
    ownerName: 'Maria Oliveira',
    status: 'Treatment',
    image: 'https://img.usecurling.com/p/200/200?q=dog',
  },
  {
    id: '3',
    name: 'Estrela',
    species: 'Equino',
    breed: 'Manga Larga',
    age: 6,
    weight: 380,
    ownerId: '3',
    ownerName: 'Carlos Souza',
    status: 'Recovery',
    image: 'https://img.usecurling.com/p/200/200?q=horse',
  },
  {
    id: '4',
    name: 'Luna',
    species: 'Felino',
    breed: 'Siamês',
    age: 1,
    weight: 4,
    ownerId: '4',
    ownerName: 'Ana Pereira',
    status: 'Healthy',
    image: 'https://img.usecurling.com/p/200/200?q=cat',
  },
  {
    id: '5',
    name: 'Trovão',
    species: 'Equino',
    breed: 'Quarto de Milha',
    age: 8,
    weight: 420,
    ownerId: '3',
    ownerName: 'Carlos Souza',
    status: 'Healthy',
    image: 'https://img.usecurling.com/p/200/200?q=horse&color=black',
  },
]

export const appointments: Appointment[] = [
  {
    id: '1',
    title: 'Vacinação Geral',
    date: new Date(),
    animalId: '1',
    animalName: 'Mimosa',
    clientName: 'João Silva',
    status: 'Scheduled',
    type: 'Vaccination',
  },
  {
    id: '2',
    title: 'Revisão Pós-Cirúrgica',
    date: addDays(new Date(), 1),
    animalId: '2',
    animalName: 'Rex',
    clientName: 'Maria Oliveira',
    status: 'Scheduled',
    type: 'Consultation',
  },
  {
    id: '3',
    title: 'Exame de Rotina',
    date: addDays(new Date(), 2),
    animalId: '3',
    animalName: 'Estrela',
    clientName: 'Carlos Souza',
    status: 'Scheduled',
    type: 'Consultation',
  },
  {
    id: '4',
    title: 'Castração',
    date: subDays(new Date(), 2),
    animalId: '4',
    animalName: 'Luna',
    clientName: 'Ana Pereira',
    status: 'Completed',
    type: 'Surgery',
  },
]

export const medications: Medication[] = [
  {
    id: '1',
    name: 'Antibiótico Plus',
    stock: 45,
    unit: 'Frascos',
    price: 120.0,
    expiryDate: '2025-12-01',
  },
  {
    id: '2',
    name: 'Anti-inflamatório Flex',
    stock: 20,
    unit: 'Caixas',
    price: 85.5,
    expiryDate: '2025-06-15',
  },
  {
    id: '3',
    name: 'Vacina Aftosa',
    stock: 150,
    unit: 'Doses',
    price: 15.0,
    expiryDate: '2024-11-20',
  },
  {
    id: '4',
    name: 'Vermífugo Total',
    stock: 80,
    unit: 'Frascos',
    price: 45.0,
    expiryDate: '2026-01-10',
  },
]

export const budgets: Budget[] = [
  {
    id: '1',
    clientName: 'João Silva',
    total: 1500.0,
    status: 'Pending',
    date: '2024-10-15',
  },
  {
    id: '2',
    clientName: 'Maria Oliveira',
    total: 450.0,
    status: 'Approved',
    date: '2024-10-12',
  },
  {
    id: '3',
    clientName: 'Carlos Souza',
    total: 3200.0,
    status: 'Invoiced',
    date: '2024-10-10',
  },
]
