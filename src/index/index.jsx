import React from "react";
import "./index.styl";
import Swiper from "swiper";
import { LBL } from "@src/common/image";
import Header from "./Header";
const axios = require('axios');
const data = {
  category: 'js_error',
  logType: 'Warning',
  logInfo: '错误类别: js_error\r\n' +
    '日志信息: Uncaught TypeError: _this.aaaaaaa is not a function\r\n' +
    'url: http%3A%2F%2Flocalhost%3A8082%2Fclient.js\r\n' +
    '错误行号: 66347\r\n' +
    '错误列号: 13\r\n' +
    '错误栈: TypeError: _this.aaaaaaa is not a function\n' +
    '    at Index._this.aaa (http://localhost:8082/client.js:66347:13)\n' +
    '    at HTMLUnknownElement.callCallback (http://localhost:8082/client.js:22738:14)\n' +
    '    at Object.invokeGuardedCallbackDev (http://localhost:8082/client.js:22787:16)\n' +
    '    at invokeGuardedCallback (http://localhost:8082/client.js:22849:31)\n' +
    '    at invokeGuardedCallbackAndCatchFirstError (http://localhost:8082/client.js:22863:25)\n' +
    '    at executeDispatch (http://localhost:8082/client.js:27036:3)\n' +
    '    at processDispatchQueueItemsInOrder (http://localhost:8082/client.js:27068:7)\n' +
    '    at processDispatchQueue (http://localhost:8082/client.js:27081:5)\n' +
    '    at dispatchEventsForPlugins (http://localhost:8082/client.js:27092:3)\n' +
    '    at http://localhost:8082/client.js:27301:12\r\n' +
    '设备信息: {"deviceType":"PC","OS":"Mac OS","OSVersion":"10.15.7","screenHeight":900,"screenWidth":1440,"language":"zh_CN","netWork":"4g","orientation":"横屏","browserInfo":"Chrome（版本: 92.0.4515.159&nbsp;&nbsp;内核: Blink）","fingerprint":"f1ba2e47","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"}',
  deviceInfo: '{"deviceType":"PC","OS":"Mac OS","OSVersion":"10.15.7","screenHeight":900,"screenWidth":1440,"language":"zh_CN","netWork":"4g","orientation":"横屏","browserInfo":"Chrome（版本: 92.0.4515.159&nbsp;&nbsp;内核: Blink）","fingerprint":"f1ba2e47","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"}'
};
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  // componentDidMount() {
  //   const self = this;
  //   setTimeout(() => {
  //     self.swiper = new Swiper(".swiper-container", {
  //       initialSlide: 0,
  //       speed: 3000,
  //       autoplay: {
  //         delay: 3000,
  //       },
  //       loop: true,
  //       pagination: {
  //         el: ".swiper-pagination",
  //       },
  //     });
  //   }, 300)
  // }


  componentDidMount() {
    const self = this;
    console.log('father componentDidMount');
    console.log('data', data);
    console.log('logInfo', data.logInfo, data.logInfo.split('\n'));
  }

  aaa = () => {
    // ddd = 1;
    // axios.get('http://localhost:8089/a/d').then(response => {
    //   console.log('data', response);
    // });
    this.aaaaaaa();
    // throw Error('cuole')
    this.setState({
      count: ++this.state.count
    })
  }

  addPeo = () => {
    const param = {
      id: 1,
      name: '名字',
      description: Math.random() + '个',
    };
    axios.post('http://localhost:8083/add', param).then(response => {
      console.log('data', response);
    });
  }

  getPeo = () => {
    const params = {
      pageNum: 2,
      pageSize: 5,
    };
    axios.get('http://localhost:8083/get', {params}).then(response => {
      console.log('data', response);
    });
  }

  render() {
    return (
      <div className="index">
        <Header count={this.state.count} />
        {/* <div className="swiper-container" id="swiper-container">
          <div className="swiper-wrapper">
            {LBL.map((image, index) => {
              return (
                <div key={image.key} className="swiper-slide">
                  <img className="swiper-slide-img" src={image.src} />
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination" />
        </div> */}
        {/* <div className="father"> 
          <div className="child1">1111</div>
          <div className="child2">2222</div>
        </div> */}
        {/* <div className="box">
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
          <div className="box1">年年后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后年年后后后</div>
          <div className="box1">2222</div>
        </div> */}
        <div onClick={this.aaa}>点击</div>
        <div onClick={this.addPeo}>加入一个人</div>
        <div onClick={this.getPeo}>获取一个人</div>
      </div>
    );
  }
}
