import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

// const store = createStoreInstance(window?.__INITIAL_DATA__);
const data = window?.__INITIAL_DATA__

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <Routes data={data}/>
  </BrowserRouter>
);