import React, { useState, useCallback, useEffect } from "react";

import "./index.less";
import { Table, Button } from "antd";

const RoleText = {
    CUSTOMER: '前台用户',
    ADMIN: '后台账户'
}
const columns = [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "头像",
    key: "avatar",
    dataIndex: "avatar",
    render: t => (
      <img
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt=""
        height="40px"
      />
    )
  },
  {
    title: "昵称",
    key: "nickname",
    dataIndex: "nickname",
    render: t => "会飞的猪"
  },
  {
    title: "用户名",
    key: "username",
    dataIndex: "username",
    render: t => "flying_pig"
  },
  {
    title: "联系方式",
    key: "phone",
    dataIndex: "phone",
    render: t => "18812345678"
  },
  {
    title: "当前状态",
    key: "status",
    dataIndex: "disabled",
    render: t => (!!t ? "冻结" : "正常")
  },
  {
    title: "操作",
    key: "operate",
    dataIndex: "disabled",
    render: (t, r) => <Button size="small">启用</Button>
  }
];

export default ({ match }) => {
  const { role } = match.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    (params = { page: 0, size: 10, role }) => {
      setLoading(true);
      setTimeout(() => {
        setData({
          content: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
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
    <div>
      <h1>{RoleText[role]}管理</h1>
      <Table
        bordered
        loading={loading}
        size="small"
        dataSource={data.content}
        columns={columns}
        pagination={pagination}
      />
    </div>
  );
};
