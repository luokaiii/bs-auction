import React, { useState, useEffect, useCallback } from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

import {
  formatDate,
  GoodsType,
  GoodsStatus
} from "../../../components/constants";
import { getByPage, deleteById } from "../../../service/GoodsApi";
import "./index.less";

const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "封面",
    key: "cover",
    dataIndex: "cover",
    render: (t, r) => (
      <Link to={`/b/auction/details/${r.id}`}>
        <img alt="" height="70px" src={t} />
      </Link>
    )
  },
  {
    title: "名称",
    key: "name",
    dataIndex: "name",
    render: (t, r) => <Link to={`/b/auction/details/${r.id}`}>{t}</Link>
  },
  {
    title: "类型",
    key: "type",
    dataIndex: "type",
    render: t => GoodsType[t]
  },
  {
    title: "起拍价",
    key: "startPrice",
    dataIndex: "startPrice"
  },
  {
    title: "创建人(管理员)",
    key: "username",
    dataIndex: "username",
    render: (t, r) => <Link to={`/#/b/user/details/${r.userId}`}>{t}</Link>
  },
  {
    title: "开拍时间",
    key: "startTime",
    dataIndex: "startTime",
    render: t => formatDate(t)
  },
  {
    title: "当前状态",
    key: "status",
    dataIndex: "status",
    render: t => GoodsStatus[t]
  },
  {
    title: "中标人(用户)",
    key: "auctionUsername",
    dataIndex: "auctionUsername",
    render: (t, r) => <Link to={`/#/b/user/details/${r.userId}`}>{t}</Link>
  },
  {
    title: "出价记录",
    key: "records",
    render: (t, r) => <Link to={`/b/order/${r.id}`}>查看出价记录</Link>
  },
  {
    title: "操作",
    key: "operate",
    render: (t, r) => (
      <Button onClick={() => deleteById(r.id)} type="danger" size="small">
        删除
      </Button>
    )
  }
];

export default ({ match }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { status } = match.params;

  const loadData = useCallback(
    (params = { page: 0, size: 10, sort: "createTime,desc" }) => {
      setLoading(true);
      const data =
        status === "all" ? params : Object.assign({ status }, params);
      getByPage(data)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(err => {
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
      <div className="top-div">
        <h2>拍品管理</h2>
        <Button href="/?#/b/auction/edit/0/create">创建</Button>
      </div>
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
