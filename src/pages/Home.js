import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Home = ({ articles }) => {
  // const [articlesData, setArticleData] = useState(articles);
  // useEffect(() => {
  //     setArticleData(articlesData)  
  // }, [articlesData])

  // useEffect(() => {
  //   async function getInitialData() {
  //     const data = await Home.getInitialData()
  //     setArticleData(data)
  //   }
  //   getInitialData()
  // }, [])

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
        {articles?.map((article) => (
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

export async function getInitialDataHome() {
  const data = await new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({
        articles: [
          {
            id: 1,
            title: '文章标题1',
            content: '文章内容1',
          },
          {
            id: 2,
            title: '文章标题2',
            content: '文章内容2',
          },
        ],
      });
    }, 2000);
  });
  return {
    articles: data?.articles,
  }
};

export default Home;