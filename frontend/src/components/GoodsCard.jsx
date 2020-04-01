import React from "react";
import { Badge } from "antd";
import Countdown from "antd/lib/statistic/Countdown";

import { formatDate } from "./constants";
import "./GoodsCard.less";

const GoodsStatus = {
  CREATED: "未开始",
  STARTED: "进行中",
  END: "已结束"
};

const StatusColor = {
  CREATED: "#ffc069",
  STARTED: "#a0d911",
  END: "#a8071a"
};

const StatusCountdownRender = ({ data }) => {
  if (data.status === "CREATED") {
    return (
      <Countdown value={data.startTime} format="距开始：D 天 H 时 m 分 s 秒" />
    );
  } else if (data.status === "STARTED") {
    return (
      <Countdown value={data.endTime} format="距结束：D 天 H 时 m 分 s 秒" />
    );
  } else {
    return <span>结束时间：{formatDate(data.endTime)}</span>;
  }
};

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
        <Badge
          count={GoodsStatus[data.status]}
          style={{ backgroundColor: StatusColor[data.status] }}
        >
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
            当前价：
            <span className="red">
              ￥{data.currentPrice || data.startPrice}
            </span>
          </div>
        </div>
        <div className="right">
          <StatusCountdownRender data={data} />
        </div>
      </div>
    </div>
  );
};
