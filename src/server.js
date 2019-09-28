import express from 'express';
import path from 'path';
import expressStaticGzip from 'express-static-gzip';
import { html as htmlTemplate, oneLineTrim } from 'common-tags';

import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { Helmet } from 'react-helmet';

import App from './App';

const server = express();
server
  .disable('x-powered-by')
  .use(
    expressStaticGzip(process.env.RAZZLE_PUBLIC_DIR, {
      enableBrotli: true,
      orderPreference: ['br', 'gz'],
    }),
  )
  .get('/*', (req, res) => {
    const extractor = new ChunkExtractor({
      statsFile: path.resolve('build/loadable-stats.json'),
      entrypoints: ['client'],
    });
    const helmet = Helmet.renderStatic();
    const context = {};
    const markup = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </ChunkExtractorManager>,
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        oneLineTrim(
          htmlTemplate`
            <!doctype html>
            <html lang="en">
            <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              ${helmet.title.toString()}
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${helmet.meta.toString()}
              ${helmet.link.toString()}
              ${extractor.getLinkTags()}
              ${extractor.getStyleTags()}
            </head>
            <body ${helmet.bodyAttributes.toString()}>
              <div id="root">${markup}</div>
              ${extractor.getScriptTags()}
            </body>
            </html>`,
        ),
      );
    }
  });

export default server;
