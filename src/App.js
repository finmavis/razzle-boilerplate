import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import 'lazysizes';

import useFontLoader from './hooks/useFontLoader';

import images from './assets/images.jpg';
import images2 from './assets/image-2.jpg';
import images3 from './assets/image-3.jpg';
import images4 from './assets/image-4.jpg';

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
    <Fragment>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
      </Switch>
      <picture>
        <source
          type='image/webp'
          srcSet={images.srcSet.replace(/.(png|jpe?g)/gi, '.webp')}
        />
        <img src={images.src} srcSet={images.srcSet} alt='Bala tes' />
      </picture>
      <picture>
        <source
          type='image/webp'
          data-srcset={images2.srcSet.replace(/.(png|jpe?g)/gi, '.webp')}
        />
        <img
          src={images2.placeholder}
          data-src={images2.src}
          data-srcset={images2.srcSet}
          alt='Bala tes'
          className='lazyload'
        />
      </picture>
      <picture>
        <source
          type='image/webp'
          data-srcset={images3.srcSet.replace(/.(png|jpe?g)/gi, '.webp')}
        />
        <img
          src={images3.placeholder}
          data-src={images3.src}
          data-srcset={images3.srcSet}
          alt='Bala tes'
          className='lazyload'
        />
      </picture>
      <picture>
        <source
          type='image/webp'
          data-srcset={images4.srcSet.replace(/.(png|jpe?g)/gi, '.webp')}
        />
        <img
          src={images4.placeholder}
          data-src={images4.src}
          data-srcset={images4.srcSet}
          alt='Bala tes'
          className='lazyload'
        />
      </picture>
    </Fragment>
  );
}
