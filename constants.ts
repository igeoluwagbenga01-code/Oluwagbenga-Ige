
import { View } from './types';

export const GENDER_OPTIONS: ('Male' | 'Female' | 'Non-binary')[] = ['Male', 'Female', 'Non-binary'];
export const ETHNICITY_OPTIONS: ('Asian' | 'Black' | 'Caucasian' | 'Hispanic' | 'Middle Eastern')[] = ['Asian', 'Black', 'Caucasian', 'Hispanic', 'Middle Eastern'];
export const AGE_OPTIONS: ('18-25' | '26-35' | '36-45' | '45+')[] = ['18-25', '26-35', '36-45', '45+'];
export const ENVIRONMENT_OPTIONS: ('Studio' | 'Outdoor' | 'Cultural')[] = ['Studio', 'Outdoor', 'Cultural'];

export const NAVIGATION_ITEMS: { name: string; view: View; icon: React.ComponentType<{ className?: string }> }[] = [];

export const SUBSCRIPTION_PLANS = [
  {
    name: 'Starter',
    price: '$29',
    features: ['100 generations/month', 'Standard quality', 'Personal use license', 'Email support'],
    cta: 'Choose Starter',
  },
  {
    name: 'Pro',
    price: '$99',
    features: ['500 generations/month', 'High quality', 'Commercial license', 'Priority support', 'Product management'],
    cta: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: ['Unlimited generations', '4K quality', 'Team collaboration', 'Dedicated account manager', 'API access'],
    cta: 'Contact Sales',
  },
];
