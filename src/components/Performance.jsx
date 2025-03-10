import React from 'react';

const Performance = () => {
  return (
    <div className="space-y-6">
      {/* Top cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Performance Overview */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Overview</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Performance chart placeholder</p>
          </div>
        </div>
        
        {/* System Health */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">System Health</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'CPU Usage', value: '42%', color: 'green' },
              { name: 'Memory', value: '68%', color: 'yellow' },
              { name: 'Storage', value: '54%', color: 'blue' },
              { name: 'Network', value: '27%', color: 'green' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
                <p className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{item.value}</p>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-${item.color}-500`} 
                    style={{ width: item.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Metric</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Previous</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Change</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[
                { metric: 'Page Load Time', current: '1.2s', previous: '1.5s', change: '-20%', status: 'Improved' },
                { metric: 'Server Response', current: '0.8s', previous: '0.7s', change: '+14%', status: 'Degraded' },
                { metric: 'API Latency', current: '320ms', previous: '350ms', change: '-8.6%', status: 'Improved' },
                { metric: 'Error Rate', current: '0.12%', previous: '0.18%', change: '-33%', status: 'Improved' },
                { metric: 'Uptime', current: '99.98%', previous: '99.95%', change: '+0.03%', status: 'Stable' }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.metric}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{item.current}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{item.previous}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`${item.change.startsWith('-') ? 'text-green-600 dark:text-green-400' : item.change.startsWith('+') ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {item.change}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'Improved' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : item.status === 'Degraded' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Performance;
