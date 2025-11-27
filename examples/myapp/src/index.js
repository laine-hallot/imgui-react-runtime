import React from 'react';
import { createRoot, render } from 'react-imgui-reconciler/reconciler.js';
import { App } from './app.jsx';

// Configure window (optional)
globalThis.sappConfig.title = 'My App';
globalThis.sappConfig.width = 800;
globalThis.sappConfig.height = 600;

// Create React root
const root = createRoot();

// Expose to ImGui unit
globalThis.reactApp = {
  rootChildren: [],
  render() {
    render(React.createElement(App), root);
  },
};

// Initial render
globalThis.reactApp.render();
