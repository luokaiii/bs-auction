import React from "react";
import { Breadcrumb, Row, Col, Icon, Menu } from "antd";
import { Link } from "react-router-dom";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";

import About from "./about";
import Flow from "./flow";
import Rule from "./rule";
import "./index.less";

const RenderPage = {
  about: <About />,
  flow: <Flow />,
  rule: <Rule />
};
export default ({ match }) => {
  const { page } = match.params;
  return (
    <div className="width-content help">
      <Breadcrumb>
        <BreadcrumbItem href="/#/f/home">
          <Icon type="home" /> 首页
        </BreadcrumbItem>
        <BreadcrumbItem href="/#/f/help">
          <Icon type="table" /> 帮助中心
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="paper-clip" /> 具体规则
        </BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span={6} style={{ paddingRight: "20px" }}>
          <Menu selectedKeys={[page]}>
            <Menu.Item key="about">
              <Link to="/f/help/about">关于我们</Link>
            </Menu.Item>
            <Menu.Item key="rule">
              <Link to="/f/help/rule">拍卖规则</Link>
            </Menu.Item>
            <Menu.Item key="flow">
              <Link to="/f/help/flow">支付流程</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={18} style={{ backgroundColor: "#ffffff" }}>
          {RenderPage[page]}
        </Col>
      </Row>
    </div>
  );
};
