import 'babel-polyfill';
import React, { useEffect } from 'react';
import Index from "@src/index/routes";
import { Route, IndexRedirect } from "react-router";
import { MonitorJS } from "monitorjs_horse_fpp";
new MonitorJS().init({
  url:"http://localhost:8083/a", //错误上报地址
  consoleError: false, //配置是否需要记录console.error错误信息
  ajaxError: true,
  // resourceError: false
  // extendsInfo:{ //自定义扩展信息，一般用于数据持久化区分
  //     a:"", //自定义信息a（名称可自定义）可参考测试栗子 module
  //     b:"", //自定义信息b（名称可自定义）
  //     getDynamic:()=>{  //获取动态传参  1.4.5版本及以后支持该方式
          
  //     }
  // }
});

const container = (props) => {
  useEffect(() => {
      // window.onerror = (msg, url, row, col, error) => {
      //   console.log(11111);
      //   console.log('msg===', msg, 'url===', url, row, col, error);
      //   return true;
      // }
  }, [])

    return (
        <div className="container">
            {props.children}
        </div>
    )
}

export default (function (...routes) {
  return (
    <Route path='/' key="root" component={container}>
        <IndexRedirect to='/index' />
        {routes}
        {Index}
    </Route>
  );
})();
