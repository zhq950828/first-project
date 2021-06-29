import React from "react";
import "./index.styl";
import Swiper from "swiper";
import { LBL } from "@src/common/image";
console.log(LBL);
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.swiper = new Swiper(".swiper-container", {
      initialSlide: 0,
      autoplay: 3000,
      loop: true,
      observer: true,
      observeParents: true,
      pagination: ".swiper-pagination",
      autoplayDisableOnInteraction: false,
      // onTap: function (swiper, event) {
      //     const url = $(event.target).data('url');
      //     if (url) {
      //         Util.report('NEW_CLASS_ROOM_BANNER', CONFIG.REPORT_TYPE.CLICK, {
      //             classroomid: self.props.classroomId,
      //             current_time: +new Date()
      //         });
      //         location.href = url;
      //     }
      // },
    });
  }

  render() {
    return (
      <div className="index">
        <h1>
          hellow, <span>LBL</span>
        </h1>
        <div className="swiper-container" id="swiper-container">
          <div className="swiper-wrapper">
            {LBL.map((image, index) => {
              return (
                <div
                  key={image.key}
                >
                  <img
                    src={image.src}
                  />
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    );
  }
}
