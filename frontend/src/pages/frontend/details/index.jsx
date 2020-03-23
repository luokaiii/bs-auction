import React from "react";
import { Breadcrumb, Icon, Tag, Carousel } from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

import "./index.less";

const Pictures = [
  "http://imgs.qudiandi.com/20190802/e3c0ef4d7444f49db9ad8e368b9e945e.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/7d52429ec4ce61fadd59dadc6e73247d.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/7d52429ec4ce61fadd59dadc6e73247d.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/671872dfd91a4091347da658e1a5eea3.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/2c11396e2f195b7182b8cced6328c5e4.jpg!800w_800h_4e"
];

const StatusTag = {
  STARTED: <Tag color="#87d068">拍卖中</Tag>,
  END: <Tag color="#f50">已结束</Tag>
};

export default () => {
  let slider;
  return (
    <div className="details">
      <div className="width-content">
        <Breadcrumb>
          <BreadcrumbItem href="/#/f/home">
            <Icon type="home" /> 首页
          </BreadcrumbItem>
          <BreadcrumbItem href="/#/f/list">
            <Icon type="table" /> 在线拍卖
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Icon type="paper-clip" /> 拍品详情
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="title-div">
          {StatusTag["STARTED"]}点滴第640届文学历史与艺术西文专场
        </div>
        <div className="bg-white-div desc-div">
          <div className="left">
            <Carousel
              dots={false}
              ref={el => {
                slider = el;
              }}
            >
              {Pictures.map((v, i) => (
                <img alt="" src={v} key={i} />
              ))}
            </Carousel>
            <div className="dots">
              {Pictures.map((v, i) => (
                <div
                  className="dot"
                  key={i}
                  onClick={() => {
                    slider.innerSlider.slickGoTo(i);
                  }}
                >
                  <img alt="" src={v} />
                </div>
              ))}
            </div>
          </div>
          <div className="right">右边的详细描述</div>
        </div>
      </div>
    </div>
  );
};
