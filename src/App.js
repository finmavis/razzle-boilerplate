import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import './global.css';

const Home = loadable(() => import('./Home'));
const About = loadable(() => import('./About/About'));

export default function App() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
    </Switch>
  );
}
