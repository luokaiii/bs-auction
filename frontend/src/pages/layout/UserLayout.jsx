import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Switch, Route } from "react-router-dom";

import LOGO from "./static/logo.png";
import { frontRoutes } from "../../routerConfig";
import "./UserLayout.less";

export default () => {
  return (
    <Layout className="user-layout">
      <Layout.Header className="header">
        <div className="top">
          <div className="width-content">点滴拍卖，欢迎您！登录 | 注册</div>
        </div>
        <div className="bottom">
          <div className="width-content bottom-content">
            <div>
              <img src={LOGO} alt="logo" />
            </div>
            <Menu mode="horizontal">
              <Menu.Item key="/home"><Icon type="home" />竞拍首页</Menu.Item>
              <Menu.Item key="/me"><Icon type="user" />我的竞拍</Menu.Item>
              <Menu.Item key="/help"><Icon type="question-circle" />竞拍帮助</Menu.Item>
            </Menu>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>
        <Switch>
          {frontRoutes.map((v, i) => (
            <Route key={i} path={v.path} component={v.component} exact />
          ))}
        </Switch>
      </Layout.Content>
    </Layout>
  );
};
