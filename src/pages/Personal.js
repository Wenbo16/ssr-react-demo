import React from 'react';
import { Helmet } from 'react-helmet';

const Personal = ({ personalData }) => {
  return (
    <div>
      <Helmet>
        <title>个人中心页</title>
      </Helmet>
      <h1>个人中心页</h1>
      <p>名称：{personalData?.userInfo?.username}</p>
      <p>职业：{personalData?.userInfo?.job}</p>
    </div>
  );
};

export async function getInitialDataPersonal () {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        userInfo: {
          username: 'Tomas',
          job: '前端工程师',
        },
      });
    }, 2000);
  });
  return { personalData: data }
};

export default Personal;