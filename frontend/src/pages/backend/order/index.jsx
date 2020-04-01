import React, { useState, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";

import { getByPage } from "../../../service/AuctionApi";
import { formatDate } from "../../../components/constants";
import "./index.less";
import { useCallback } from "react";

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
    title: "封面",
    key: "goodsCover",
    dataIndex: "goodsCover",
    render: (t, r) => (
      <Link to={`/b/auction/details/${r.goodsId}`}>
        <img alt="" height="70px" src={t} />
      </Link>
    )
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

export default ({ match }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { status } = match.params;

  const loadData = useCallback(
    (params = { page: 0, size: 10, sort: "createTime,desc" }) => {
      const p = status === "all" ? params : Object.assign({ status }, params);
      setLoading(true);
      getByPage(p)
        .then(res => {
          setData(res.data);
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [status]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

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
