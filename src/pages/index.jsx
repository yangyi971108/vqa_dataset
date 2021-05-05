import React from 'react';

import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import PDFPage from './pdf-page';
import HomePage from './home-page';

function App () {

  // 页面路由相关
  const history = useHistory(); // 创建历史对象
  const location = useLocation(); // 获取location对象

  return (

    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/pdf" component={PDFPage} />
      </Switch>
    </>
  );
}

export default App;

