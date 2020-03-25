import React, { useState } from "react";
import {
  Breadcrumb,
  Icon,
  Tag,
  Carousel,
  InputNumber,
  Button,
  List,
  Skeleton,
  Avatar
} from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

import AuctionRecord from '../../../components/AuctionRecord'
import "./index.less";
import Countdown from "antd/lib/statistic/Countdown";

const Pictures = [
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/110329/5/3697/324874/5e1436b0E000652a6/9b61f9e797fda9e0.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/82840/16/13454/51129/5daffac9Ea3cbc27d/ded1f23aad8eff8b.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/47376/7/14002/94252/5daffac9E02fde33a/6c275b4fc553332b.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/95742/20/545/113756/5daffac9E6495fea4/ddd97308809c75e3.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/90716/6/523/54582/5daffacaE732854b7/deb1ca5e49fb8095.jpg"
];

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const StatusTag = {
  STARTED: <Tag color="#87d068">拍卖中</Tag>,
  END: <Tag color="#f50">已结束</Tag>
};

export default () => {
  const [bidList, setBidList] = useState([{}, {}, {}, {}, {}]);
  let slider;
  const loadMore = () => {
    setBidList([...[{}, {}, {}], ...bidList]);
  };
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
          {StatusTag["STARTED"]}华为荣耀MagicBook拍卖专场
        </div>
        <div className="bg-white-div desc-div">
          <div className="left">
            <Carousel
              className="carousel"
              dots={false}
              ref={el => {
                slider = el;
              }}
            >
              {Pictures.map((v, i) => (
                <img
                  alt=""
                  src={v}
                  key={i}
                  style={{ backgroundSize: "cover" }}
                />
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
          <div className="right">
            <div className="title">
              <Tag color="#e5503c">推荐</Tag>荣耀MagicBook 2019 第三方Linux版
              14英寸轻薄窄边框笔记本电脑（AMD锐龙7 3700U 8G 512G FHD）冰河银
            </div>
            <div className="price-time">
              <div className="price">起拍价：￥1200</div>
              <div className="time">
                <Countdown
                  value={deadline}
                  format="距开始： D 天 H 时 m 分 s 秒"
                />
              </div>
            </div>
            <div className="bid">
              <div className="bid1">立即出价</div>
              <div className="bid2">
                <InputNumber
                  defaultValue="1000"
                  step="100"
                  formatter={v => `￥ ${v}`}
                />
                <Button>立即出价</Button>
              </div>
            </div>
            <div className="desc">
              <div className="line">
                <div>起拍价：￥1200</div>
                <div>加价幅度：阶梯出价</div>
              </div>
              <div className="line">
                <div>延时周期：30秒/次</div>
                <div>出品人：亚伟拍卖</div>
              </div>
              <div className="line">
                <div>买家佣金：5%</div>
                <div>顺丰速运：包邮</div>
              </div>
              <div className="line">
                <div>开始时间：即将开始</div>
                <div>出价次数：0次</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white-div record-div">
          <h1>出价记录</h1>
          <AuctionRecord />
        </div>
        <div className="bg-white-div details-div">
          <h1>拍品详情</h1>
          <div>
            功能要点 - 使用BraftEditor.createEditorState创建editorState -
            <br />
            使用editorState.toHTML()实时获取html 注意事项 -
            <br />
            编辑器的value属性必须是一个editorState对象 -
            <br />
            实际使用时请避免在onChange中直接toHTML，配合节流函数或者在合适的时机使用更恰当
            <br />
          </div>
          <div>
            <h3>详情图片</h3>
            {Pictures.map((v, i) => (
              <img alt="" src={v} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
