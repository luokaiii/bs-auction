import React, { useState, useEffect } from "react";
import { Table } from "antd";

import CoverImg from "../../../static/cover.jpg";
import "./index.less";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "封面",
    key: "cover",
    render: () => (
      <Link to="/b/auction/details/0">
        <img alt="" height="70px" src={CoverImg} />
      </Link>
    )
  },
  {
    title: "名称",
    key: "name",
    render: () => <Link to="/b/auction/details/0">荣耀MagicBook 2019</Link>
  },
  {
    title: "起拍价",
    key: "startPrice",
    render: () => "￥4999元"
  },
  {
    title: "开始时间",
    key: "startTime",
    render: () => "2020-03-25 14:00:12"
  },
  {
    title: "当前状态",
    key: "status",
    render: () => "拍卖中"
  },
  {
    title: "出价记录",
    key: "records",
    render: () => <Link to="/b/order/0">查看出价记录</Link>
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
      <h2>拍品管理</h2>
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
