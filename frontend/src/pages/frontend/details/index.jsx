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

import "./index.less";
import Countdown from "antd/lib/statistic/Countdown";

const Pictures = [
  "http://imgs.qudiandi.com/20190802/e3c0ef4d7444f49db9ad8e368b9e945e.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/7d52429ec4ce61fadd59dadc6e73247d.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/7d52429ec4ce61fadd59dadc6e73247d.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/671872dfd91a4091347da658e1a5eea3.jpg!800w_800h_4e",
  "http://imgs.qudiandi.com/20190802/2c11396e2f195b7182b8cced6328c5e4.jpg!800w_800h_4e"
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
          {StatusTag["STARTED"]}点滴第640届文学历史与艺术西文专场
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
                <img alt="" src={v} key={i} height="500px" width="600px" />
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
              <Tag color="#e5503c">推荐</Tag>LOT09
              书口三面烫金轧花！1861年牛津出版社《效法基督》1册全，内有藏书票，皮装烫金，精致袖珍本
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
                <div>出品人：点滴拍卖</div>
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
          <List
            itemLayout="horizontal"
            loadMore={
              <Button block style={{ border: "none" }} onClick={loadMore}>
                查看更多
              </Button>
            }
            dataSource={bidList}
            renderItem={item => (
              <List.Item>
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="张三"
                    description="出价 11000 元"
                  />
                  <div>2020年03月24日 10时14分33秒</div>
                </Skeleton>
              </List.Item>
            )}
          />
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
              <img alt="" src={v} key={i}  />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
