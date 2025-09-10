
import React from 'react';
import Card from './Card';
import Button from './Button';
import { SUBSCRIPTION_PLANS } from '../constants';

const SubscriptionPage: React.FC = () => {
  return (
    <div className="p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white">Find the perfect plan</h1>
        <p className="mt-4 text-lg text-dark-text-secondary">
          Choose the plan that fits your creative needs and scale.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-brand-purple border-2' : ''}`}>
             {plan.popular && (
              <div className="text-center -mt-10 mb-4">
                <span className="bg-brand-purple text-white px-3 py-1 text-sm font-semibold rounded-full">MOST POPULAR</span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-center text-white">{plan.name}</h2>
            <p className="text-4xl font-extrabold text-center my-4 text-white">{plan.price}<span className="text-base font-medium text-dark-text-secondary">{plan.price.startsWith('$') ? '/month' : ''}</span></p>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span className="text-dark-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
