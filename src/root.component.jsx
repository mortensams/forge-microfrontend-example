import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Tabs from './components/Tabs';

const RootComponent = (props) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const isRunningInPortal = window.singleSpaNavigate !== undefined;
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'reports', label: 'Reports' }
  ];
  
  return (
    <div className="microfrontend-content p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          Running in: <span className="font-medium">{isRunningInPortal ? 'Portal Mode' : 'Standalone Mode'}</span>
        </div>
      </div>
      
      {props.forgeUser && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            Welcome, <span className="font-semibold">{props.forgeUser.name}</span>
            <span className="mx-2">|</span>
            Role: <span className="font-semibold">{props.forgeUser.role}</span>
          </p>
        </div>
      )}
      
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mt-6">
        <Dashboard activeTab={activeTab} />
      </div>
    </div>
  );
};

export default RootComponent;
