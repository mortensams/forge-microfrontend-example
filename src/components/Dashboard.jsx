import React from 'react';
import MetricsCards from './MetricsCards';
import Overview from './Overview';
import Performance from './Performance';
import Reports from './Reports';

const Dashboard = ({ activeTab }) => {
  return (
    <div>
      <MetricsCards />
      
      <div className="mt-6">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'performance' && <Performance />}
        {activeTab === 'reports' && <Reports />}
      </div>
    </div>
  );
};

export default Dashboard;
