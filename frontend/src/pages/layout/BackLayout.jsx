import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import { Link, Switch, Route } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

import { ping, logout } from "../../service/UserApi";
import {
  useUser,
  STORE_CURRENT_USER,
  REMOVE_CURRENT_USER
} from "../../store/index";
import { backRoutes } from "../../routerConfig";
import "./BackLayout.less";

export default () => {
  const [user, setUser] = useState({});
  const { dispatch } = useUser();

  const quit = () => {
    logout()
      .then(() => {
        dispatch({
          type: REMOVE_CURRENT_USER
        });
      })
      .then(() => {
        window.location.href = "/#/f/login";
      });
  };

  useEffect(() => {
    ping()
      .then(res => {
        dispatch({
          type: STORE_CURRENT_USER,
          payload: {
            user: res.data,
            isLogin: true,
            isAdmin: res.data.role === "ADMIN",
            isSuperAdmin: res.data.role === "SUPER_ADMIN"
          }
        });
        return res.data;
      })
      .then(res => {
        setUser(res);
      });
  }, [dispatch]);

  return (
    <Layout className="back-layout">
      <Layout.Header className="header">
        <div className="width-content menu">
          <Menu theme="light" mode="horizontal">
            <Menu.Item>
              <Link to="/b/user/list/CUSTOMER">用户管理</Link>
            </Menu.Item>
            <SubMenu title="拍品管理" key="sub3">
              <Menu.Item>
                <Link to="/b/auction/list/all">全部拍品</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/auction/list/STARTED">竞拍中拍品</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/auction/list/CREATED">待竞拍商品</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/auction/list/END">竞拍结束拍品</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu title="竞拍管理" key="sub4">
              <Menu.Item>
                <Link to="/b/order/list/all">全部竞拍</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/order/list/CREATED">进行中的竞拍</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/order/list/UN_BID">未中标竞拍</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/order/list/BID">中标待确定竞拍</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/order/list/FINISHED">历史中标竞拍</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu title="系统管理" key="sub5">
              <Menu.Item>
                <Link to="/b/user/list/ADMIN">后台账户管理</Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item>
              <Link to="/f/home">去前台</Link>
            </Menu.Item>
          </Menu>
          <div className="profile">
            <Avatar shape="square" size="large" src={user.avatar} />
            <span>欢迎您，{user.nickname}！</span>
            <Button size="small" type="primary" onClick={quit}>
              退出
            </Button>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content className="width-content content">
        <Switch>
          {backRoutes.map((v, i) => (
            <Route key={i} path={v.path} component={v.component} exact />
          ))}
        </Switch>
      </Layout.Content>
    </Layout>
  );
};
