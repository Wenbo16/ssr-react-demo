import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import App from './app-web'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'

// const store = createStoreInstance(window?.__INITIAL_DATA__);
const data = window?.__INITIAL_DATA__

loadableReady(() => {
  hydrateRoot(
    document.getElementById('root'),
    <BrowserRouter>
      {/* <Routes data={data} /> */}
      <App />
    </BrowserRouter>
  );
})


// loadableReady(() => {
//   const root = document.getElementById('root')
//   hydrate(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>,
//     root,
//   )
// })
