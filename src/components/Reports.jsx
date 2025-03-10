import React, { useState } from 'react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('weekly');

  return (
    <div className="space-y-6">
      {/* Report selector */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reports</h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Report type:</span>
            <div className="inline-flex rounded-md shadow-sm">
              {[
                { id: 'daily', label: 'Daily' },
                { id: 'weekly', label: 'Weekly' },
                { id: 'monthly', label: 'Monthly' },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedReport(option.id)}
                  className={`
                    relative inline-flex items-center px-3 py-2 text-sm font-medium
                    ${option.id === selectedReport 
                      ? 'bg-blue-500 text-white dark:bg-blue-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'} 
                    ${option.id === 'daily' ? 'rounded-l-md' : ''}
                    ${option.id === 'monthly' ? 'rounded-r-md' : ''}
                    border border-gray-300 dark:border-gray-600
                    focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Report content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Charts */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            {selectedReport === 'daily' 
              ? 'Daily Performance' 
              : selectedReport === 'weekly' 
                ? 'Weekly Performance' 
                : 'Monthly Performance'}
          </h4>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
          </div>
        </div>
        
        {/* Top items */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">
            {selectedReport === 'daily' 
              ? 'Top Items (Daily)' 
              : selectedReport === 'weekly' 
                ? 'Top Items (Weekly)' 
                : 'Top Items (Monthly)'}
          </h4>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="py-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{i}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Item {i} Name
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Category {i % 3 + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${(1000 / i).toFixed(2)}
                  </p>
                  <div className="flex items-center text-xs">
                    <span className={`${i % 2 === 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {i % 2 === 0 ? '+' : '-'}{i * 3.5}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Export options */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
        <h4 className="text-base font-medium text-gray-900 dark:text-white mb-4">Export Options</h4>
        <div className="flex flex-wrap gap-4">
          {['PDF', 'Excel', 'CSV', 'JSON'].map((format) => (
            <button
              key={format}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Export as {format}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
