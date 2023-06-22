import React from 'react';
import { Helmet } from 'react-helmet';

const Personal = (props) => {
  return (
    <div>
      <Helmet>
        <title>个人中心页</title>
      </Helmet>
      <h1>个人中心页</h1>
      <p>名称：{props.personalData?.userInfo?.username}</p>
      <p>职业：{props.personalData?.userInfo?.job}</p>
    </div>
  );
};

Personal.getInitialData = async () => {
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