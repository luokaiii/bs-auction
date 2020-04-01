import React, { useState, useCallback, useEffect } from "react";
import { Table, Radio, Button, Icon } from "antd";
import { Link } from "react-router-dom";

import { getByPage } from "../../../service/AuctionApi";
import { formatDate } from "../../../components/constants";
import AuctionPro from "./static/auctionpro.png";
import "./index.less";

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
      <Link to={`/f/details/${r.goodsId}`}>
        <img alt="" height="70px" src={t} />
      </Link>
    )
  },
  {
    title: "竞拍商品",
    key: "goodsName",
    dataIndex: "goodsName",
    render: (t, r) => <Link to={`/f/details/${r.goodsId}`}>{t}</Link>
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
  }
];

export default () => {
  const [status, setStatus] = useState("CREATED");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    (params = { page: 0, size: 5, status, sort: "createTime,desc" }) => {
      setLoading(true);
      getByPage(params)
        .then(res => {
          setData(res.data);
        })
        .then(() => {
          setLoading(false);
        });
    },
    [status]
  );

  const handleChange = e => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const pagination = {
    current: data.number + 1,
    total: data.totalElements,
    pageSize: data.size,
    onChange: (page, size) => {
      loadData({ page: page - 1, size, sort: "createTime,desc" });
    }
  };

  return (
    <div className="width-content me">
      <div className="title">
        <h1>我的竞拍</h1>
        <div>
          <img src={AuctionPro} alt="" />
        </div>
      </div>
      <Radio.Group size="large" value={status} onChange={handleChange}>
        <Radio.Button value="CREATED">正在竞拍</Radio.Button>
        <Radio.Button value="BID">中标竞拍</Radio.Button>
        <Radio.Button value="UN_BID">未中标竞拍</Radio.Button>
        <Radio.Button value="FINISHED">历史已完成</Radio.Button>
      </Radio.Group>
      <Table
        bordered
        loading={loading}
        size="small"
        dataSource={data.content}
        columns={columns}
        pagination={pagination}
        rowKey={r => r.id}
        title={() => (
          <div style={{ textAlign: "center" }}>
            正在竞拍列表
            <Button
              size="small"
              type="link"
              onClick={() =>
                loadData({ page: 0, size: 5, status, sort: "createTime,desc" })
              }
            >
              <Icon type="redo" />
              刷新
            </Button>
          </div>
        )}
      />
    </div>
  );
};
