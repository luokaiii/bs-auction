import React, { useState, useCallback, useEffect } from "react";
import { Table, Button, message } from "antd";

import { useUser } from "../../../store/index";
import { showConfirm } from "../../../components/constants";
import { getByPage, updateDisabled } from "../../../service/UserApi";
import "./index.less";

const RoleText = {
  CUSTOMER: "前台用户",
  ADMIN: "后台账户"
};

const columns = (update, role, isAdmin, isSuperAdmin) => [
  {
    title: "序号",
    key: "number",
    render: (...args) => args[2] + 1
  },
  {
    title: "头像",
    key: "avatar",
    dataIndex: "avatar",
    render: t => <img src={t} alt="" height="40px" />
  },
  {
    title: "昵称",
    key: "nickname",
    dataIndex: "nickname"
  },
  {
    title: "用户名",
    key: "username",
    dataIndex: "username"
  },
  {
    title: "联系方式",
    key: "phone",
    dataIndex: "phone"
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
    render: (t, r) => {
      if (role === "ADMIN") {
        if (isSuperAdmin) {
          return !!t ? (
            <Button onClick={() => update(r.id, false)}>启用</Button>
          ) : (
            <Button onClick={() => update(r.id, true)}>禁用</Button>
          );
        } else {
          return <></>;
        }
      } else {
        if (isAdmin || isSuperAdmin) {
          return !!t ? (
            <Button onClick={() => update(r.id, false)}>启用</Button>
          ) : (
            <Button onClick={() => update(r.id, true)}>禁用</Button>
          );
        } else {
          return <></>;
        }
      }
    }
  }
];

export default ({ match }) => {
  const { role } = match.params;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { isAdmin, isSuperAdmin } = useUser().state;

  const update = (id, disabled) => {
    showConfirm(() => {
      updateDisabled(id, disabled)
        .then(() => {
          message.success("修改成功");
          loadData();
        })
        .catch(() => {
          message.error("修改失败");
        });
    });
  };

  const loadData = useCallback(
    (params = { page: 0, size: 10, role }) => {
      setLoading(true);
      getByPage(params)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(() => {
          message.error("加载失败");
          setLoading(false);
        });
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
      <div className="top-div">
        <h1>{RoleText[role]}管理</h1>
        <div>
          {role === "ADMIN" && isSuperAdmin && (
            <Button type="primary" href="/#/b/user/create">
              创建
            </Button>
          )}
        </div>
      </div>
      <Table
        bordered
        loading={loading}
        size="small"
        dataSource={data.content}
        columns={columns(update, role, isAdmin, isSuperAdmin)}
        pagination={pagination}
      />
    </div>
  );
};
