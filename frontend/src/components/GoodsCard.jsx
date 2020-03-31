import React from "react";
import { Badge } from "antd";
import Countdown from "antd/lib/statistic/Countdown";

import "./GoodsCard.less";

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

export default ({ data = {}, isMore = false }) => {
  const gotoDetails = () => {
    window.location.href = `/#/f/details/${data.id || 0}`;
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
          <img alt="" src={data.cover} width="220px" />
        </Badge>
      </div>
      <div className="title">{data.name}</div>
      <div className="price-view">
        <div className="left">
          <div>
            起拍价：<span className="red">￥{data.startPrice}</span>
          </div>
          <div>
            当前价：<span className="red">￥{data.currentPrice}</span>
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
