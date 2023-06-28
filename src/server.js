import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Routes, { routesConfig } from './routes';
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

import { ChunkExtractor } from '@loadable/server'

app.use(express.static('dist/public'));


app.get('*', async (req, res) => {
  // This is the stats file generated by webpack loadable plugin
const webStats = path.resolve(
  __dirname,
  '../dist/public/loadable-stats.json',
)

const webExtractor = new ChunkExtractor({ statsFile: webStats })

  const promises = routesConfig.map((route) => {
    const {path, component} = route;
    // return route?.getInitialData();
    if (path === req?.url && route?.getInitialData) {
      return route?.getInitialData();
    } else {
      return null;
    }
  });

  Promise.all(promises).then(data => {
    const dataObj = data.reduce((acc, cur) => {
      if(cur) {
        const key = Object.keys(cur)[0];
        acc[key] = cur[key];
      }
      return acc;
    }, {})

    const jsx = webExtractor.collectChunks(
    <StaticRouter location={req.url}>
      <Routes data={dataObj}/>
    </StaticRouter>)


    const content = ReactDOMServer.renderToString(
      jsx
    );

    const html = `
      <html>
        <head>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__INITIAL_DATA__=${JSON.stringify(dataObj)}
          </script>
          ${webExtractor.getScriptTags()}
        </body>
      </html>`;
  
    res.writeHead(200, {
      'content-type': 'text/html;charset=utf8',
    });
    res.end(html)
  })

  
  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
