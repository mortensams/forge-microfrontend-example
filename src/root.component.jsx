import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Tabs from './components/Tabs';

const RootComponent = (props) => {
  const [activeTab, setActiveTab] = useState('overview');
  const isRunningInPortal = typeof window.singleSpaNavigate !== 'undefined';
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'performance', label: 'Performance' },
    { id: 'reports', label: 'Reports' }
  ];
  
  // Handle route changes from the portal
  useEffect(() => {
    // Parse the current URL to set initial tab
    const setTabFromUrl = () => {
      const path = window.location.pathname;
      if (path.includes('/app/performance')) {
        setActiveTab('performance');
      } else if (path.includes('/app/reports')) {
        setActiveTab('reports');
      } else {
        setActiveTab('overview');
      }
    };
    
    // Set initial tab based on URL
    setTabFromUrl();
    
    // Listen for route changes
    const handleLocationChange = () => {
      setTabFromUrl();
    };
    
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('single-spa:routing-event', handleLocationChange);
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('single-spa:routing-event', handleLocationChange);
    };
  }, []);
  
  // Handle tab changes within the component (update URL)
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    
    // If running in portal mode, update URL
    if (isRunningInPortal) {
      let newPath;
      if (tabId === 'overview') {
        newPath = '/app';
      } else {
        newPath = `/app/${tabId}`;
      }
      
      // Only navigate if we're not already on this path to avoid endless loops
      if (window.location.pathname !== newPath) {
        // Check which navigation function is available
        if (typeof window.navigateToUrl === 'function') {
          window.navigateToUrl(newPath);
        } else if (typeof window.singleSpaNavigate === 'function') {
          window.singleSpaNavigate(newPath);
        } else {
          // Fallback to regular navigation if neither is available
          window.history.pushState(null, '', newPath);
        }
      }
    }
  };
  
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
      
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="mt-6">
        <Dashboard activeTab={activeTab} />
      </div>
    </div>
  );
};

export default RootComponent;