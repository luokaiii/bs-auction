import React from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { Switch, Route, Link } from "react-router-dom";

import LOGO from "./static/logo.png";
import { frontRoutes } from "../../routerConfig";
import "./UserLayout.less";

export default () => {
  return (
    <Layout className="user-layout">
      <Layout.Header className="header">
        <div className="top">
          <div className="width-content">
            亚伟拍卖，欢迎您！登录 | 注册{" "}
            <Button type="link" size="small" href="/#/b/home">
              进入后台
            </Button>
          </div>
        </div>
        <div className="bottom">
          <div className="width-content bottom-content">
            <div>
              <img src={LOGO} alt="logo" className="logo" />
            </div>
            <Menu mode="horizontal">
              <Menu.Item>
                <Link to="/f/home">
                  <Icon type="home" />
                  竞拍首页
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/f/me">
                  <Icon type="user" />
                  我的竞拍
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/f/help/about">
                  <Icon type="question-circle" />
                  竞拍帮助
                </Link>
              </Menu.Item>
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
