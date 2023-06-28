import React, { FunctionComponent } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

const Home = loadable(() => import('./pages2/home'))
const About = loadable(() => import('./pages2/about'))

const App = () => {
  return (
    <div>
      <nav>
        <h2>Navigation</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* <Routes>
        <Route path="/about">
          
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes> */}
    </div>
  )
}

export default App
