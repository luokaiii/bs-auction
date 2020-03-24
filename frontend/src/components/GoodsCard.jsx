import React from "react";
import { Icon, Badge } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import "./GoodsCard.less";

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

export default ({ isMore = false }) => {
  const gotoDetails = () => {
    window.location.href = "/#/f/details/0";
  };

  const gotoList = () => {
    window.location.href = "/#/f/list";
  };

  if (isMore) {
    return (
      <div className="goods-card2" onClick={gotoList}>
        查看更多...
      </div>
    );
  }

  return (
    <div className="goods-card" onClick={gotoDetails}>
      <div className="picture">
        <Badge count="未开始">
          <img
            alt=""
            src="http://imgs.qudiandi.com/20200320/87429fa2ae2d55ad77c950c0cbfa9351.jpg!210w_210h_4e"
          />
        </Badge>
      </div>
      <div className="title">
        （乙4262）原田由己编辑《标笺正、续文章轨范》和刻本 线装6册全
        正、续各七卷3册 一部古文选评集
      </div>
      <div className="price-view">
        <div className="left">
          <div>
            起拍价：<span className="red">￥40000000</span>
          </div>
          <div>
            当前价：<span className="red">￥400</span>
          </div>
        </div>

        <div className="right">
          {/* 竞拍次数：
          <Icon type="fire" theme="twoTone" />
          15 */}
          <Countdown value={deadline} format="距开始：D 天 H 时 m 分 s 秒" />
        </div>
      </div>
    </div>
  );
};
