
export enum View {
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
  NEW_PROJECT = 'NEW_PROJECT',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export interface Product {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ModelSelection {
  gender: 'Male' | 'Female' | 'Non-binary' | '';
  ethnicity: 'Asian' | 'Black' | 'Caucasian' | 'Hispanic' | 'Middle Eastern' | '';
  age: '18-25' | '26-35' | '36-45' | '45+' | '';
  useAI: boolean;
}

export interface EnvironmentSelection {
  type: 'Studio' | 'Outdoor' | 'Cultural' | 'Custom' | '';
  customPrompt: string;
}

export interface GeneratedImage {
    id: string;
    prompt: string;
    imageUrl: string;
    createdAt: string;
}
