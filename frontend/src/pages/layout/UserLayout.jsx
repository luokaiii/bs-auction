import React from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { Switch, Route, Link } from "react-router-dom";

import LOGO from "../../static/logo.png";
import { frontRoutes } from "../../routerConfig";
import "./UserLayout.less";

export default () => {
  return (
    <Layout className="user-layout">
      <Layout.Header className="header">
        <div className="top">
          <div className="width-content">
            亚伟拍卖，欢迎您！<Link to="/f/login">登录</Link> |{" "}
            <Link to="/f/registry">注册</Link>
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
      <Layout.Footer className="footer">
        <div className="width-content footer-div">
          <div>
            <img src={LOGO} alt="" className="logo" />
          </div>
          <div className="copy">
            <div>
              <Link to="/f/help/about">关于我们</Link> |{" "}
              <Link to="/f/help/rule">拍卖规则</Link> |{" "}
              <Link to="/f/help/flow">支付流程</Link>
            </div>
            <div>
              没公司没版权没备案号 ©备ICP1111111111号 All Rights Reserved
            </div>
          </div>
        </div>
      </Layout.Footer>
    </Layout>
  );
};
