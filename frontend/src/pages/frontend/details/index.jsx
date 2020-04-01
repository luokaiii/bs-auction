import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Icon,
  Tag,
  Carousel,
  Button,
  notification,
  Tooltip
} from "antd";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
import Countdown from "antd/lib/statistic/Countdown";

import { formatDate } from "../../../components/constants";
import { getById } from "../../../service/GoodsApi";
import { offer } from "../../../service/AuctionApi";
import AuctionRecord from "../../../components/AuctionRecord";
import "./index.less";

const Pictures = [
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/110329/5/3697/324874/5e1436b0E000652a6/9b61f9e797fda9e0.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/82840/16/13454/51129/5daffac9Ea3cbc27d/ded1f23aad8eff8b.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/47376/7/14002/94252/5daffac9E02fde33a/6c275b4fc553332b.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/95742/20/545/113756/5daffac9E6495fea4/ddd97308809c75e3.jpg",
  "https://img10.360buyimg.com/n1/s450x450_jfs/t1/90716/6/523/54582/5daffacaE732854b7/deb1ca5e49fb8095.jpg"
];

const Time = [1, 2, 3, 4, 5];

const StatusTag = {
  CREATED: <Tag color="#f50">竞拍尚未开始</Tag>,
  STARTED: <Tag color="#87d068">拍卖中</Tag>,
  END: <Tag color="#f50">已结束</Tag>
};

export default ({ match }) => {
  const [selected, setSelected] = useState(3);
  const [data, setData] = useState({});
  const { id } = match.params;

  const handleOffer = () => {
    const price = selected * data.range;
    offer(id, price)
      .then(() => {
        notification.success({
          message: "出价成功！"
        });
      })
      .catch(() => {
        notification.error({
          message: "出价失败！请刷新重试！"
        });
      });
  };

  useEffect(() => {
    getById(id)
      .then(res => setData(res.data))
      .catch(() => {
        notification.error("加载失败！");
      });
  }, [id]);

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
          {StatusTag[data.status || "CREATED"]}
          {data.introduce || "华为荣耀 MagicBook 专场"}
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
              <Tag color="#e5503c">推荐</Tag>
              {data.name ||
                "荣耀MagicBook 2019 第三方Linux版 14英寸轻薄窄边框笔记本电脑（AMD锐龙7 3700U 8G 512G FHD）冰河银"}
            </div>
            <div className="price-time">
              <div className="price">起拍价：￥{data.startPrice}</div>
              <div className="time">
                <Countdown
                  value={data.startTime}
                  format="距开始： D 天 H 时 m 分 s 秒"
                />
              </div>
            </div>
            <div className="bid">
              <div className="bid1">立即出价</div>
              <div className="bid2">
                {Time.map((v, i) => (
                  <Button
                    key={i}
                    className={`ant-btn1 ${selected === v && "selected"}`}
                    onClick={() => setSelected(v)}
                  >
                    +{v * data.range}
                  </Button>
                ))}
              </div>
              <div className="bid2">
                <Button
                  className="ant-btn2"
                  onClick={handleOffer}
                  disabled={data.status !== "STARTED"}
                >
                  {data.status !== "STARTED" && <Icon type="stop" />}立即出价
                </Button>
              </div>
            </div>
            <div className="desc">
              <div className="line">
                <div>起拍价：￥{data.startPrice}</div>
                <div>
                  加价幅度：
                  <Tooltip title="按照加价幅度的1-5倍出价">阶梯出价</Tooltip>
                </div>
              </div>
              <div className="line">
                <div>出价次数：{data.time}次</div>
                <div>
                  出品人：
                  <Tooltip title="所有商品均由平台出售">拍卖平台</Tooltip>
                </div>
              </div>
              <div className="line">
                <div>开始时间：{formatDate(data.startTime)}</div>
                <div>
                  顺丰速运：<Tooltip title="全平台顺丰包邮(mock)">包邮</Tooltip>
                </div>
              </div>
              <div className="line">
                <div>结束时间：{formatDate(data.endTime)}</div>
                <div>
                  买家佣金：
                  <Tooltip title="平台无佣金，全免费(mock)">0</Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white-div record-div">
          <h1>出价记录</h1>
          <AuctionRecord goodsId={id} />
        </div>
        <div className="bg-white-div details-div">
          <h1 style={{ textAlign: "center" }}>拍品详情</h1>
          <div>{data.description}</div>
          <div style={{ textAlign: "center" }}>
            <h1>详情图片</h1>
            {Pictures.map((v, i) => (
              <img alt="" src={v} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
