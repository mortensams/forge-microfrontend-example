import React, { useState } from 'react';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart,
  CartesianGrid, 
  ComposedChart,
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

// Mock data for the revenue chart
const generateData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  
  // Generate realistic revenue data with seasonal trends
  return months.map((month, index) => {
    // Base revenue with seasonal pattern (higher in Q4, lower in Q1)
    const seasonalFactor = index >= 9 ? 1.4 : // Q4 boost
                          index >= 6 ? 1.2 : // Q3 moderate
                          index >= 3 ? 1.1 : // Q2 slight increase
                          0.9;  // Q1 lower
                          
    // Add some random variation
    const randomFactor = 0.8 + Math.random() * 0.4;
    
    // Create growth from last year to this year (about 15% YoY growth)
    const lastYearBase = 45000 * seasonalFactor * randomFactor;
    const thisYearBase = lastYearBase * 1.15 * (0.95 + Math.random() * 0.1);
    
    // Target is 10% above this year's number
    const target = thisYearBase * 1.1;
    
    // Expenses are roughly 60-75% of revenue
    const expenseRatio = 0.6 + Math.random() * 0.15;
    const expenses = thisYearBase * expenseRatio;
    
    // Profit is revenue minus expenses
    const profit = thisYearBase - expenses;
    
    // Customer count correlates with revenue but not exactly
    const customers = Math.round((thisYearBase / 1000) * (0.9 + Math.random() * 0.2));
    
    return {
      month,
      [lastYear]: Math.round(lastYearBase),
      [currentYear]: Math.round(thisYearBase),
      Target: Math.round(target),
      Profit: Math.round(profit),
      Expenses: Math.round(expenses),
      Customers: customers
    };
  });
};

const revenueData = generateData();

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
        <div className="mt-2 space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700 dark:text-gray-300">{entry.name}: </span>
              <span className="ml-1 font-medium text-gray-900 dark:text-white">
                {entry.name === 'Customers' 
                  ? entry.value.toLocaleString() 
                  : `$${entry.value.toLocaleString()}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  const [chartType, setChartType] = useState('area');
  const [showTarget, setShowTarget] = useState(true);
  const [showLastYear, setShowLastYear] = useState(true);
  const [showProfit, setShowProfit] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  
  const renderChart = () => {
    switch(chartType) {
      case 'line':
        return (
          <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
            <YAxis 
              tickFormatter={(value) => `$${value/1000}k`} 
              tick={{ fill: '#6b7280' }}
              domain={[0, 'dataMax + 10000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={currentYear} 
              name={`Revenue ${currentYear}`}
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2 }}
            />
            {showLastYear && (
              <Line 
                type="monotone" 
                dataKey={lastYear} 
                name={`Revenue ${lastYear}`}
                stroke="#94a3b8" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
            {showTarget && (
              <Line 
                type="monotone" 
                dataKey="Target" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={false}
              />
            )}
            {showProfit && (
              <Line 
                type="monotone" 
                dataKey="Profit" 
                stroke="#10b981" 
                strokeWidth={2}
              />
            )}
          </LineChart>
        );
      
      case 'bar':
        return (
          <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
            <YAxis 
              tickFormatter={(value) => `$${value/1000}k`} 
              tick={{ fill: '#6b7280' }}
              domain={[0, 'dataMax + 10000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey={currentYear} 
              name={`Revenue ${currentYear}`}
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
            />
            {showLastYear && (
              <Bar 
                dataKey={lastYear} 
                name={`Revenue ${lastYear}`}
                fill="#94a3b8" 
                radius={[4, 4, 0, 0]}
              />
            )}
            {showProfit && (
              <Bar 
                dataKey="Profit" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
            <YAxis 
              tickFormatter={(value) => `$${value/1000}k`} 
              tick={{ fill: '#6b7280' }}
              domain={[0, 'dataMax + 10000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={currentYear} 
              name={`Revenue ${currentYear}`}
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
            {showLastYear && (
              <Area 
                type="monotone" 
                dataKey={lastYear} 
                name={`Revenue ${lastYear}`}
                stroke="#94a3b8" 
                fillOpacity={1} 
                fill="url(#colorLastYear)" 
              />
            )}
            {showTarget && (
              <Line 
                type="monotone" 
                dataKey="Target" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={false}
              />
            )}
            {showProfit && (
              <Area 
                type="monotone" 
                dataKey="Profit" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorProfit)" 
              />
            )}
          </AreaChart>
        );
      
      case 'composed':
        return (
          <ComposedChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280' }} />
            <YAxis 
              yAxisId="left"
              tickFormatter={(value) => `$${value/1000}k`} 
              tick={{ fill: '#6b7280' }}
              domain={[0, 'dataMax + 10000']}
            />
            {showCustomers && (
              <YAxis 
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => value} 
                tick={{ fill: '#6b7280' }}
                domain={[0, 'dataMax + 10']}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey={currentYear} 
              name={`Revenue ${currentYear}`}
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              fillOpacity={0.8}
              barSize={20}
            />
            {showLastYear && (
              <Bar 
                yAxisId="left"
                dataKey={lastYear} 
                name={`Revenue ${lastYear}`}
                fill="#94a3b8" 
                radius={[4, 4, 0, 0]}
                fillOpacity={0.8}
                barSize={20}
              />
            )}
            {showProfit && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="Profit" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            )}
            {showTarget && (
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="Target" 
                stroke="#f97316" 
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            )}
            {showCustomers && (
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="Customers" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            )}
          </ComposedChart>
        );
      
      default:
        return (
          <LineChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={currentYear} stroke="#3b82f6" />
          </LineChart>
        );
    }
  };
  
  return (
    <div className="h-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChartType('area')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              chartType === 'area' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Area
          </button>
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              chartType === 'line' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              chartType === 'bar' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Bar
          </button>
          <button
            onClick={() => setChartType('composed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              chartType === 'composed' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Composed
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowLastYear(!showLastYear)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              showLastYear 
                ? 'bg-gray-600 text-white dark:bg-gray-700 dark:text-gray-100' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Last Year
          </button>
          <button
            onClick={() => setShowTarget(!showTarget)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              showTarget 
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Target
          </button>
          <button
            onClick={() => setShowProfit(!showProfit)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              showProfit 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            Profit
          </button>
          <button
            onClick={() => setShowCustomers(!showCustomers)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md ${
              showCustomers 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
            disabled={chartType !== 'composed'}
          >
            Customers
          </button>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
