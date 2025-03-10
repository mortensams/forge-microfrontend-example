import './styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import RootComponent from './root.component';

// Define the single-spa lifecycle methods for the React application
const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: RootComponent,
  errorBoundary(err, info, props) {
    // Custom error boundary for when the application fails
    console.error("Error in Forge Microfrontend:", err, info);
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
        <h2 className="text-xl font-semibold text-red-700 dark:text-red-400">
          Something went wrong in the microfrontend
        </h2>
        <p className="mt-2 text-red-600 dark:text-red-300">{err.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Reload
        </button>
      </div>
    );
  }
});

// Export the single-spa lifecycle methods
export const { bootstrap, mount, unmount } = lifecycles;

// For single-spa dev tools
export const devtools = {
  overlays: {
    options: {
      color: '#4a90e2',
    },
  }
};
