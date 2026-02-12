import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

/**
 * Enterprise Application Entry Point
 * Initialized with strict version syncing via importmap
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Critical Failure: Root element '#root' not found in DOM.");
} else {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("CorpVision App Initialized Successfully.");
}