import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
console.log('[renderer] main.jsx loaded');
createRoot(document.getElementById('root')).render(<App />);

const rootEl = document.getElementById('root');
createRoot(rootEl).render(<App />);

if (!app.isPackaged) {
  win.loadURL('http://localhost:5180');  // <-- match the port
  win.webContents.openDevTools();
} else {
  win.loadFile(path.join(__dirname, '../dist/index.html'));
}
