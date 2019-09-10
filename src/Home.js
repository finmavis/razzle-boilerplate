import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import logo from './react.svg';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className='Home'>
        <Helmet>
          <title>Razzle Boilerplate | Home</title>
          <meta name='description' content='Lorem ipsum dolor amet' />
        </Helmet>
        <div className='Home-header'>
          <img src={logo} className='Home-logo' alt='logo' />
          <h2>Welcome to Razzle</h2>
        </div>
        <p className='Home-intro'>
          To get started, edit <code>src/App.js</code> or{' '}
          <code>src/Home.js</code> and save to reload.
        </p>
        <ul className='Home-resources'>
          <li>
            <Link to='/about'>Go to Tes</Link>
          </li>
          <li>
            <a href='https://github.com/jaredpalmer/razzle'>Docs</a>
          </li>
          <li>
            <a href='https://github.com/jaredpalmer/razzle/issues'>Issues</a>
          </li>
          <li>
            <a href='https://palmer.chat'>Community Slack</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Home;
