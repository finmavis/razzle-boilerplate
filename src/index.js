import http from 'http';

let app = require('./server').default;

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.PORT || 3000, error => {
  if (error) {
    // eslint-disable-next-line
    console.log(error);
  }
  // eslint-disable-next-line
  console.log('🚀 started');
});

if (module.hot) {
  // eslint-disable-next-line
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./server', () => {
    // eslint-disable-next-line
    console.log('🔁  HMR Reloading `./server`...');

    try {
      app = require('./server').default;
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  });
}
