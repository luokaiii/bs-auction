import React, { useState } from "react";
import { Carousel, Tabs } from "antd";

import MockPic from "./static/mock.jpg";
import CardList from "./card_list";
import "./index.less";
import { Link } from "react-router-dom";

const TagTypes = [
  "全部",
  "手机",
  "图书",
  "服装",
  "珠宝首饰",
  "3C数码",
  "汽车用品",
  "其它"
];

const CarouselImgs = [MockPic, MockPic, MockPic, MockPic];

export default () => {
  const [data] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  return (
    <div className="width-content home">
      <div className="home1">
        <div className="left">
          <div className="title">
            <div className="title1">最新拍卖</div>
            <div className="title2">
              <Link to="/f/list">查看更多 ></Link>
            </div>
          </div>
          <div className="list">
            <ul>
              {data.map((v, i) => (
                <li key={i}>
                  <div className="list-item">
                    <Link to="/f/details/0">
                      （VD4027）《论注庆卯录》 线装一册 油印本 佛教书 宗教书
                      《往生论注》又称《净土论注》
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <Carousel dotPosition="right" autoplay>
            {CarouselImgs.map((v, i) => (
              <div key={i}>
                <Link to="/f/details/0">
                  <img src={v} alt={i} key={i} className="carousel-image" />
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <h1 style={{ fontWeight: "600" }}>在线拍卖</h1>
      <div className="home2">
        <Tabs defaultActiveKey="1">
          {TagTypes.map((v, i) => (
            <Tabs.TabPane tab={v} key={i + 1} activeKey={i + 1}>
              <CardList />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
