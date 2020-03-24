import React from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import { Link, Switch, Route } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";

import { backRoutes } from "../../routerConfig";
import "./BackLayout.less";

export default () => {
  return (
    <Layout className="back-layout">
      <Layout.Header className="header">
        <div className="width-content menu">
          <Menu theme="light" mode="horizontal">
            <Menu.Item key="sub1">
              <Link to="/b/home">首页</Link>
            </Menu.Item>
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
            <SubMenu title="订单管理" key="sub4">
              <Menu.Item>
                <Link to="/b/order/list/all">全部订单</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/order/list/BID">中标待确定订单</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/b/order/list/FINISHED">历史中标订单</Link>
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
            <Avatar
              shape="square"
              size="large"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <span>欢迎您，张三！</span>
            <Button size="small" type="primary">
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
