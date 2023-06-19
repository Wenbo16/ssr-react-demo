import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchHomeData } from '../store/actions/home';

const Home = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state) => state.home);
  console.log(homeData);

  useEffect(() => {
    dispatch(fetchHomeData);
  }, []);

  const renderHead = () => {
    return (
      <Helmet>
        <title>首页</title>
      </Helmet>
    );
  };

  const handleClick = () => {
    console.log('我被点击了！');
  };

  return (
    <div>
      {renderHead()}
      <h1>首页</h1>
      <ul>
        {homeData?.articles?.map((article) => (
          <li key={article?.id}>
            <p>文章标题：{article?.title}</p>
            <p>文章内容：{article?.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>点我</button>
    </div>
  );
};

Home.getInitialData = async (store) => {
  return store.dispatch(fetchHomeData);
};

export default Home;