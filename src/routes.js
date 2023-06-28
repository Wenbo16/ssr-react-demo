import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import { getInitialData as getInitialDataHome }  from './pages/Home';
// import { getInitialData as getInitialDataPersonal } from './pages/Personal';
import loadable from '@loadable/component'

const { getInitialDataHome } = loadable(() => import('./pages/Home'))
const { getInitialDataPersonal } = loadable(() => import('./pages/Personal'))

const Home = loadable(() => import('./pages/Home'))
const Personal = loadable(() => import('./pages/Personal'))

const RoutesList = (props) => {

  return (
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/personal">个人中心页</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Home {...props.data} />} />
        <Route path="/personal" element={<Personal {...props.data}/>} />
      </Routes>
    </div>
  );
};

export default RoutesList;

export const routesConfig = [
  {
    path: '/',
    component: Home,
    getInitialData: getInitialDataHome
  },
  {
    path: '/personal',
    component: Personal,
    getInitialData: getInitialDataPersonal
  },
];

export async function getStaticRoutes() {
    const staticRoutes = [];//存放新路由

    for (let i = 0; i < routesConfig.length; i++) {
        let item = routesConfig[i];
        //存放静态路由
        staticRoutes.push({
            ...item,
            ...{
                component: (await item.component().props.load()).default
            }
        });
    }
    return staticRoutes; //返回静态路由
}

