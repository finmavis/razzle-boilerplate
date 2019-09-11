import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Image from './assets/images/room.jpg';
import Icon from './assets/svg/bbq.svg';

import './Home.css';

export default function Home(props) {
  return (
    <div className='home'>
      <Helmet>
        <title>Razzle Boilerplate | Home</title>
      </Helmet>
      <div className='header'>
        <h1>Razzle Boilerplate</h1>
      </div>
      <div className='feature'>
        <ul>
          <li>
            Server Side Rendering (Thanks to{' '}
            <a
              href='https://github.com/jaredpalmer/razzle'
              rel='noopener noreferrer'
              target='_blank'
            >
              Razzle
            </a>{' '}
            )
          </li>
          <li>
            SEO Friendly (Thanks to{' '}
            <a
              href='https://github.com/nfl/react-helmet'
              rel='noopener noreferrer'
              target='_blank'
            >
              React Helmet
            </a>{' '}
            )
          </li>
          <li>
            Code Splitting (Thanks to{' '}
            <a
              href='https://github.com/smooth-code/loadable-components'
              rel='noopener noreferrer'
              target='_blank'
            >
              Loadable Component
            </a>{' '}
            )
          </li>
          <li>Gzip and Brotli compression</li>
          <li>
            Static type checking using{' '}
            <a
              href='https://github.com/facebook/create-react-app'
              rel='noopener noreferrer'
              target='_blank'
            >
              Eslint
            </a>{' '}
            and{' '}
            <a
              href='https://prettier.io/'
              rel='noopener noreferrer'
              target='_blank'
            >
              Prettier
            </a>
          </li>
          <li>
            Pre-commit hooks using{' '}
            <a
              href='https://github.com/typicode/husky'
              rel='noopener noreferrer'
              target='_blank'
            >
              Husky
            </a>{' '}
            and{' '}
            <a
              href='https://github.com/okonet/lint-staged'
              rel='noopener noreferrer'
              target='_blank'
            >
              Lint Staged
            </a>
          </li>
        </ul>
      </div>
      <div className='navigate'>
        <Link to='/about'>Go to About</Link>
      </div>
    </div>
  );
}
