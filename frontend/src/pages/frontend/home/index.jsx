import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Tabs } from "antd";

import { getByPage } from "../../../service/GoodsApi";
import MockPic from "./static/mock.jpg";
import CardList from "./card_list";
import "./index.less";

const TagTypes = [
  { title: "全部", type: null },
  { title: "手机", type: "PHONE" },
  { title: "图书", type: "BOOKS" },
  { title: "服装", type: "CLOTHING" },
  { title: "珠宝首饰", type: "JEWELRY" },
  { title: "3C数码", type: "DIGITAL" },
  { title: "汽车用品", type: "CAR" },
  { title: "其它", type: "OTHER" }
];

const CarouselImgs = [MockPic, MockPic, MockPic, MockPic];

export default () => {
  const [recommend, setRecommend] = useState([]);
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    Promise.all([
      getByPage({ size: 12, sort: "createTime,desc" }),
      getByPage({
        size: 5,
        status: "STARTED",
        sort: "createTime,desc"
      })
    ]).then(res => {
      setLatest(res[0].data.content);
      setRecommend(res[1].data.content);
    });
  }, []);

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
              {latest.map((v, i) => (
                <li key={i}>
                  <div className="list-item">
                    <Link to={`/f/details/${v.id}`}>{v.name}</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <Carousel dotPosition="right" autoplay>
            {recommend.map((v, i) => (
              <div key={i}>
                <Link to={`/f/details/${v.id}`}>
                  <img
                    src={v.cover}
                    alt={i}
                    key={i}
                    className="carousel-image"
                  />
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
            <Tabs.TabPane tab={v.title} key={i + 1} activeKey={i + 1}>
              <CardList type={v.type} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
