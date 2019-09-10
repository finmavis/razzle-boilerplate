import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

// Load all components needed before rendering
loadableReady(() => {
  hydrate(
    <Router>
      <App />
    </Router>,
    document.getElementById('root'),
  );
});

if (module.hot) {
  module.hot.accept();
}
