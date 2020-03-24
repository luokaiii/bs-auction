import React, { useState, useCallback, useEffect } from "react";
import { Table, Radio, Button, Icon } from "antd";

import MockCover from "./static/mock.webp";
import AuctionPro from "./static/auctionpro.png";
import "./index.less";

const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "竞拍商品图",
    key: "cover",
    render: () => <img src={MockCover} alt="" height="60px" />
  },
  {
    title: "起拍价",
    key: "startPrice",
    render: () => "￥1200"
  },
  {
    title: "竞拍价",
    key: "price",
    render: () => "￥1300"
  },
  {
    title: "竞价时间",
    key: "createTime",
    render: () => "2020年03月24日 15时30分22秒"
  }
];

export default ({ match }) => {
  const { role } = match.params;
  const [data, setData] = useState({ content: [] });
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    (params = { page: 0, size: 10, role }) => {
      setLoading(true);
      setTimeout(() => {
        setData({
          content: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
          number: 0,
          totalElements: 11,
          size: 10
        });
        setLoading(false);
      }, 1500);
    },
    [role]
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
    <div className="width-content me">
      <div className="title">
        <h1>我的竞拍</h1>
        <div>
          <img src={AuctionPro} alt="" />
        </div>
      </div>
      <Radio.Group size="large">
        <Radio.Button value="large">正在竞拍</Radio.Button>
        <Radio.Button value="default">竞拍结束</Radio.Button>
        <Radio.Button value="small">竞拍中标</Radio.Button>
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
            <Button size="small" type="link" onClick={loadData}>
              <Icon type="redo" />
              刷新
            </Button>
          </div>
        )}
      />
    </div>
  );
};
