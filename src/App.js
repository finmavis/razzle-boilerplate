import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import useFontLoader from './hooks/useFontLoader';

import './global.css';

const Home = loadable(() => import('./Home'));
const About = loadable(() => import('./About/About'));

export default function App() {
  useFontLoader({
    google: {
      families: ['Mansalva&display=swap'],
    },
  });

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
    </Switch>
  );
}
