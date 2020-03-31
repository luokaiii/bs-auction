import React, { useState, useEffect } from "react";
import { Descriptions, Divider, Button } from "antd";

import { getById } from "../../../service/GoodsApi";
import { formatDate } from "../../../components/constants";
import AuctionRecord from "../../../components/AuctionRecord";

export default ({ match }) => {
  const [data, setData] = useState({});
  const { id } = match.params;

  useEffect(() => {
    getById(id).then(res => {
      setData(res.data);
    });
  }, [id]);
  return (
    <div>
      <Descriptions
        title={
          <div style={{ display: "flex" }}>
            <h3 style={{ marginRight: "20px" }}>拍品详情</h3>
            <Button
              size="small"
              type="primary"
              href={`/?#/b/auction/edit/${id}/edit`}
              style={{ marginRight: "10px" }}
            >
              编辑
            </Button>
            <Button size="small" href="/#/b/auction/list/all">
              返回
            </Button>
          </div>
        }
      >
        <Descriptions.Item label="名称" span={3}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="封面" span={3}>
          <img src={data.cover} alt="" height="70px" />
        </Descriptions.Item>
        <Descriptions.Item label="详情图" span={3}></Descriptions.Item>
        <Descriptions.Item label="简介" span={3}>
          {data.introduce}
        </Descriptions.Item>
        <Descriptions.Item label="详细描述" span={3}>
          {data.description}
        </Descriptions.Item>
        <Descriptions.Item label="起拍价">
          ￥${data.startPrice}元
        </Descriptions.Item>
        <Descriptions.Item label="加价幅度">
          ${data.range}元/次
        </Descriptions.Item>
        <Descriptions.Item label="当前最高价">
          ${data.currentPrice || data.startPrice}元/${data.time}次
        </Descriptions.Item>
        <Descriptions.Item label="物流方式">
          顺丰包邮(全平台支持)
        </Descriptions.Item>
        <Descriptions.Item label="佣金" span={2}>
          无(全平台无佣金)
        </Descriptions.Item>
        <Descriptions.Item label="开始时间">
          {formatDate(data.startTime)}
        </Descriptions.Item>
        <Descriptions.Item label="结束时间" span={2}>
          {formatDate(data.endTime)}
        </Descriptions.Item>
      </Descriptions>
      <Divider children="出价记录" />
      <AuctionRecord />
      <Divider children="详情图" />
      <div style={{ textAlign: "center" }}>
        {data.pictures &&
          data.pictures
            .split(",")
            .map((v, i) => <img src={v} key={i} alt="" />)}
      </div>
    </div>
  );
};
