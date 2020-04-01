import React, { useState, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";

import { formatDate } from "../../../components/constants";
import "./index.less";

const StatusRender = {
  CREATED: <Tag color="lime">进行中</Tag>,
  BID: <Tag color="f50">中标</Tag>,
  UN_BID: <Tag>未中标</Tag>,
  FINISHED: <Tag color="geekblue">已完成</Tag>
};

const OperateRender = {
  CREATED: "竞拍进行中...",
  BID: <Button>发货并确认完成</Button>,
  UN_BID: "未中标",
  FINISHED: "订单已完成"
};

const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "竞拍商品",
    key: "goodsName",
    dataIndex: "goodsName",
    render: (t, r) => <Link to={`/b/auction/details/${r.goodsId}`}>{t}</Link>
  },
  {
    title: "起拍价",
    key: "goodsStartPrice",
    dataIndex: "goodsStartPrice"
  },
  {
    title: "出价",
    key: "price",
    dataIndex: "price"
  },
  {
    title: "出价时间",
    key: "createTime",
    dataIndex: "createTime",
    render: t => formatDate(t)
  },
  {
    title: "竞拍开始时间",
    key: "goodsStartTime",
    dataIndex: "goodsStartTime"
  },
  {
    title: "竞拍结束时间",
    key: "goodsEndTime",
    dataIndex: "goodsEndTime"
  },
  {
    title: "状态",
    key: "status",
    dataIndex: "status",
    render: t => StatusRender[t]
  },
  {
    title: "操作",
    key: "operate",
    dataIndex: "status",
    render: t => OperateRender[t]
  }
];

export default () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setData({
        content: [
          { id: 0 },
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
          { id: 7 },
          { id: 8 },
          { id: 9 }
        ],
        number: 0,
        totalElements: 11,
        size: 10
      });
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadData();
  }, []);

  const pagination = {
    current: data.number + 1,
    total: data.totalElements,
    pageSize: data.size,
    onChange: (page, size) => {
      loadData({ page: page - 1, size });
    }
  };

  return (
    <div>
      <h2>竞拍列表</h2>
      <Table
        bordered
        size="small"
        rowKey={r => r.id}
        columns={columns}
        dataSource={data.content}
        loading={loading}
        pagination={pagination}
      />
    </div>
  );
};
