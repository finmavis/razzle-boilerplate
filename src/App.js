import React from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import './App.css';

const Home = loadable(() => import('./Home'));
const About = loadable(() => import('./About/About'));

const App = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/about' component={About} />
  </Switch>
);

export default App;
