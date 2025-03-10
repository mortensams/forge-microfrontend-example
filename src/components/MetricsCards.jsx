import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart } from 'lucide-react';

const metrics = [
  {
    id: 'revenue',
    label: 'Revenue',
    value: '$24,532',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    id: 'users',
    label: 'Active Users',
    value: '3,642',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '1,245',
    change: '-3.1%',
    trend: 'down',
    icon: ShoppingCart,
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '3.18%',
    change: '+2.4%',
    trend: 'up',
    icon: TrendingUp,
  },
];

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {metric.label}
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {metric.value}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <metric.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            {metric.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {metric.change}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              vs last week
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;
