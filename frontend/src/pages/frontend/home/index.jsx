import React, { useState } from "react";
import { Carousel, Tabs } from "antd";

import CardList from "./card_list";
import "./index.less";

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

const CarouselImgs = [
  "http://imgs.qudiandi.com/20190802/92ada4c1a4a6718b78c6e17ac6e100e7.jpg!800w_450h_2c",
  "http://imgs.qudiandi.com/20190801/fc59c59b3bc1e1c5839700a0344bea7a.JPG!800w_450h_2c",
  "http://imgs.qudiandi.com/20190801/fc59c59b3bc1e1c5839700a0344bea7a.JPG!800w_450h_2c"
];

export default () => {
  const [data] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  return (
    <div className="width-content home">
      <div className="home1">
        <div className="left">
          <div className="title">
            <div className="title1">最新拍卖</div>
            <div className="title2">查看更多 ></div>
          </div>
          <div className="list">
            <ul>
              {data.map((v, i) => (
                <li key={i}>
                  <div>
                    （VD4027）《论注庆卯录》 线装一册 油印本 佛教书 宗教书
                    《往生论注》又称《净土论注》
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
                <img src={v} alt={i} key={i} />
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
