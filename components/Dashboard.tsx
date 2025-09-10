
import React from 'react';
import Card from './Card';
import Button from './Button';
import { View } from '../types';

interface DashboardProps {
    setView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Welcome Card */}
        <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-brand-purple to-brand-light-purple text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome Back, Jane!</h2>
          <p className="mb-4">Ready to create some stunning new marketing visuals for your brand?</p>
          <Button variant="secondary" onClick={() => setView(View.NEW_PROJECT)}>
            Start a New Project
          </Button>
        </Card>

        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Recent Projects</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div className="flex items-center gap-4">
                    <img src="https://picsum.photos/seed/proj1/80/80" className="w-16 h-16 rounded-md object-cover" />
                    <div>
                        <p className="font-semibold">Summer Collection - Look 1</p>
                        <p className="text-sm text-dark-text-secondary">Generated 2 days ago</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                <div className="flex items-center gap-4">
                    <img src="https://picsum.photos/seed/proj2/80/80" className="w-16 h-16 rounded-md object-cover" />
                    <div>
                        <p className="font-semibold">Urban Jewelry Campaign</p>
                        <p className="text-sm text-dark-text-secondary">Generated 5 days ago</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </Card>
        
        {/* Usage Stats */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Usage This Month</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-dark-text-secondary mb-1">
                <span>Generations</span>
                <span>124 / 500</span>
              </div>
              <div className="w-full bg-dark-bg rounded-full h-2.5">
                <div className="bg-brand-purple h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <p className="text-sm text-center text-dark-text-secondary">You are on the <span className="font-bold text-brand-light-purple">Pro</span> plan. <a href="#" onClick={(e) => { e.preventDefault(); setView(View.SUBSCRIPTION); }} className="underline">Upgrade</a></p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
