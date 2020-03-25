import React, { useState, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";

import CoverImg from "../../../static/cover.jpg";
import "./index.less";

const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "竞拍商品",
    key: "name",
    render: () => <Link to="/b/auction/details/0">荣耀MagicBook 2019</Link>
  },
  {
    title: "起拍价",
    key: "startPrice",
    render: () => "￥4999元"
  },
  {
    title: "出价",
    key: "price",
    render: () => "￥5300元"
  },
  {
    title: "出价时间",
    key: "startTime",
    render: () => "2020-03-28 14:00:12"
  },
  {
    title: "结束时间",
    key: "startTime",
    render: () => "2020-03-30 14:00:12"
  },
  {
    title: "是否中标",
    key: "status",
    render: (...args) =>
    args[2] === 0 ? (
      <Tag color="#f50">中标</Tag>
    ) : (
      <Tag>未中标</Tag>
    )
  },
  {
    title: "操作",
    key: "operate",
    render: (...args) =>
      args[2] === 0 ? (
        <Button type="primary" size="small">
          确认并发货
        </Button>
      ) : (
        "拍卖进行中..."
      )
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
