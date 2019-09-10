import React from 'react';
import { Helmet } from 'react-helmet';

import './About.css';

export default function About(props) {
  return (
    <div className='about'>
      <Helmet>
        <title>Razzle Boilerplate | About</title>
      </Helmet>
      <h1>Hello From About</h1>
    </div>
  );
}
