import React from "react";
import "./index.styl";
import Swiper from "swiper";
import { LBL } from "@src/common/image";
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      const self = this;
    setTimeout(() => {
        self.swiper = new Swiper(".swiper-container", {
            initialSlide: 0,
            speed: 3000,
            autoplay: {
              delay: 3000,
            },
            loop: true,
            pagination: {
              el: ".swiper-pagination",
            },
          });
    }, 300)
  }

  render() {
    return (
      <div className="index">
        <h1>
          hello, <span>LBL</span>
        </h1>
        <div className="swiper-container" id="swiper-container">
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
        </div>
      </div>
    );
  }
}
