import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import Routes, { routesConfig } from './routes';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist/public'));


app.get('*', (req, res) => {

  const promises = routesConfig?.map((route) => {
    const {path, component} = route;

    if (path === req?.url && component?.getInitialData) {
      return component?.getInitialData();
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

    // const preloadedState = store.getState();
    const content = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <Routes data={dataObj}/>
      </StaticRouter>
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
          <script src="bundle_client.js"></script>
        </body>
      </html>
    `;
  
    res.writeHead(200, {
      'content-type': 'text/html;charset=utf8',
    });
    res.end(html)
  })

  
  
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
